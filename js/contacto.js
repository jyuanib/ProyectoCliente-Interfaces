(function () {
  const NOMBRE_COLECCION = "mensajesContacto";
  const CLAVE_CONTACTO_RECORDADO = "contactoRecordado";
  const UI = window.UI;
  const { elementos } = UI;
  const { campoNombre, campoEmail, campoTelefono, campoMotivo, campoMensaje, preferirLlamada } = elementos;
  const campos = [campoNombre, campoEmail, campoTelefono, campoMotivo, campoMensaje];
  const camposTocados = new Set();

  function obtenerError(campo) {
    const errorNativo = window.Validacion.validarCampo(campo);
    if (errorNativo) {
      return errorNativo;
    }

    if (campo === campoTelefono) {
      return window.Validacion.validarTelefono(campo.value);
    }

    return null;
  }

  function validarYMostrarCampo(campo) {
    const mensaje = obtenerError(campo);
    UI.mostrarError(campo, mensaje);
    return mensaje;
  }

  function validarFormulario() {
    const errores = campos.map((campo) => {
      camposTocados.add(campo);
      return { campo, mensaje: validarYMostrarCampo(campo) };
    });
    const primerError = errores.find(({ mensaje }) => mensaje);

    if (primerError) {
      primerError.campo.focus();
      return false;
    }

    return true;
  }

  function actualizarRequisitoTelefono() {
    UI.actualizarRequisitoTelefono(preferirLlamada.checked);
    if (camposTocados.has(campoTelefono)) {
      validarYMostrarCampo(campoTelefono);
    } else {
      UI.mostrarError(campoTelefono, null);
    }
  }

  function mostrarMensajes() {
    UI.renderizarMensajes(window.Almacen.obtenerTodos(NOMBRE_COLECCION));
  }

  function guardarContactoRecordado(nombre, email) {
    localStorage.setItem(CLAVE_CONTACTO_RECORDADO, JSON.stringify({ nombre, email }));
  }

  function rellenarContactoRecordado() {
    const datosGuardados = localStorage.getItem(CLAVE_CONTACTO_RECORDADO);

    if (datosGuardados === null) {
      return;
    }

    let datos;
    try {
      datos = JSON.parse(datosGuardados);
    } catch (error) {
      console.warn("No se pudieron recuperar los datos de contacto guardados.", error);
      localStorage.removeItem(CLAVE_CONTACTO_RECORDADO);
      return;
    }

    if (
      datos === null ||
      typeof datos !== "object" ||
      Array.isArray(datos) ||
      typeof datos.nombre !== "string" ||
      typeof datos.email !== "string"
    ) {
      console.warn("Los datos de contacto guardados no tienen un formato válido.");
      localStorage.removeItem(CLAVE_CONTACTO_RECORDADO);
      return;
    }

    UI.rellenarContactoRecordado(datos.nombre, datos.email);
  }

  elementos.formularioContacto.addEventListener("submit", (evento) => {
    evento.preventDefault();
    UI.limpiarEstadoEnvio();

    if (!validarFormulario()) {
      return;
    }

    const datosFormulario = UI.leerFormularioContacto();
    const mensaje = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      nombre: datosFormulario.nombre.trim(),
      email: datosFormulario.email.trim(),
      telefono: datosFormulario.telefono.trim(),
      prefieroLlamada: datosFormulario.prefieroLlamada,
      motivo: datosFormulario.motivo,
      texto: datosFormulario.texto.trim(),
      fecha: new Date().toISOString()
    };

    window.Almacen.crear(NOMBRE_COLECCION, mensaje);
    guardarContactoRecordado(mensaje.nombre, mensaje.email);
    UI.limpiarFormularioContacto();
    camposTocados.clear();
    rellenarContactoRecordado();
    UI.actualizarContadorMensaje();
    actualizarRequisitoTelefono();
    campos.forEach((campo) => UI.mostrarError(campo, null));
    mostrarMensajes();
    UI.mostrarEstadoEnvio("Tu mensaje se ha enviado correctamente.");
  });

  campos.forEach((campo) => {
    campo.addEventListener("blur", () => {
      camposTocados.add(campo);
      validarYMostrarCampo(campo);
    });
    campo.addEventListener("input", () => {
      if (camposTocados.has(campo)) {
        validarYMostrarCampo(campo);
      }
    });
    UI.mostrarError(campo, null);
  });

  preferirLlamada.addEventListener("change", actualizarRequisitoTelefono);
  campoMensaje.addEventListener("input", () => {
    UI.actualizarContadorMensaje();
    if (camposTocados.has(campoMensaje)) {
      validarYMostrarCampo(campoMensaje);
    }
  });

  elementos.listaMensajes.addEventListener("click", (evento) => {
    const boton = evento.target.closest("button[data-id]");
    if (!boton) {
      return;
    }

    window.Almacen.borrar(NOMBRE_COLECCION, boton.dataset.id);
    mostrarMensajes();
  });

  rellenarContactoRecordado();
  UI.actualizarContadorMensaje();
  actualizarRequisitoTelefono();
  mostrarMensajes();
})();
