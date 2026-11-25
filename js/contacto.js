(function () {
  const NOMBRE_COLECCION = "mensajesContacto";
  const CLAVE_CONTACTO_RECORDADO = "contactoRecordado";
  const UI = window.UI;
  const { elementos } = UI;
  const { campoNombre, campoEmail, campoTelefono, campoMotivo, campoMensaje, preferirLlamada } = elementos;

  function validarFormulario() {
    let valido = true;
    const errores = [
      [campoNombre, window.Validacion.validarNombre(campoNombre.value)],
      [campoEmail, window.Validacion.validarEmail(campoEmail.value)],
      [
        campoTelefono,
        preferirLlamada.checked && campoTelefono.value.trim() === ""
          ? "El teléfono es obligatorio si prefieres que te llamemos."
          : window.Validacion.validarTelefono(campoTelefono.value)
      ],
      [
        campoMotivo,
        campoMotivo.value ? null : "Selecciona un motivo para el mensaje."
      ],
      [campoMensaje, window.Validacion.validarMensaje(campoMensaje.value)]
    ];

    errores.forEach(([campo, mensaje]) => {
      UI.mostrarError(campo, mensaje);
      if (mensaje) {
        valido = false;
      }
    });

    if (!valido) {
      errores.find(([, mensaje]) => mensaje)[0].focus();
    }

    return valido;
  }

  function actualizarRequisitoTelefono() {
    const mensajeError =
      preferirLlamada.checked && campoTelefono.value.trim() === ""
        ? "El teléfono es obligatorio si prefieres que te llamemos."
        : window.Validacion.validarTelefono(campoTelefono.value);
    UI.actualizarRequisitoTelefono(preferirLlamada.checked, mensajeError);
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
    rellenarContactoRecordado();
    UI.actualizarContadorMensaje();
    actualizarRequisitoTelefono();
    mostrarMensajes();
    UI.mostrarEstadoEnvio("Tu mensaje se ha enviado correctamente.");
  });

  preferirLlamada.addEventListener("change", actualizarRequisitoTelefono);
  campoMensaje.addEventListener("input", UI.actualizarContadorMensaje);

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
