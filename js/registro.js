(function () {
  const NOMBRE_COLECCION = "usuarios";
  const EDAD_MINIMA = 13;
  const UI = window.UI;
  const { elementos } = UI;
  const {
    campoUsuario,
    campoEmailRegistro,
    campoContrasenaRegistro,
    campoRepetirContrasena,
    campoFechaNacimiento,
    campoAceptaCondiciones
  } = elementos;
  const campos = [
    campoUsuario,
    campoEmailRegistro,
    campoContrasenaRegistro,
    campoRepetirContrasena,
    campoFechaNacimiento,
    campoAceptaCondiciones
  ];
  const camposTocados = new Set();
  let usuarioEnEdicion;

  function obtenerError(campo) {
    const errorCampo = window.Validacion.validarCampo(campo);
    if (errorCampo) {
      return errorCampo;
    }

    if (campo === campoFechaNacimiento && campo.value) {
      return window.Validacion.validarEdadMinima(campo.value, EDAD_MINIMA);
    }

    if (campo === campoContrasenaRegistro) {
      return window.Validacion.validarContrasena(campo.value);
    }

    if (
      campo === campoRepetirContrasena &&
      campo.value !== campoContrasenaRegistro.value
    ) {
      return "Las contraseñas no coinciden.";
    }

    return null;
  }

  function validarYMostrarCampo(campo) {
    const mensaje = obtenerError(campo);
    UI.mostrarErrorRegistro(campo, mensaje);
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

  function renderizarUsuarios() {
    UI.renderizarUsuarios(window.Almacen.obtenerTodos(NOMBRE_COLECCION));
  }

  function reiniciarFormulario() {
    usuarioEnEdicion = undefined;
    camposTocados.clear();
    UI.limpiarFormularioRegistro();
    UI.actualizarModoRegistro(false);
  }

  function iniciarEdicion(id) {
    const usuario = window.Almacen.obtenerPorId(NOMBRE_COLECCION, id);
    if (!usuario) {
      UI.mostrarEstadoRegistro("No se encontró el usuario que quieres editar.");
      return;
    }

    usuarioEnEdicion = id;
    camposTocados.clear();
    UI.limpiarFormularioRegistro();
    UI.rellenarFormularioRegistro(usuario);
    UI.actualizarModoRegistro(true);
    UI.limpiarEstadoRegistro();
    campoUsuario.focus();
  }

  function guardarUsuario(evento) {
    evento.preventDefault();
    UI.limpiarEstadoRegistro();

    if (!validarFormulario()) {
      return;
    }

    const datosFormulario = UI.leerFormularioRegistro();
    const estabaEditando = usuarioEnEdicion !== undefined;
    const datosUsuario = {
      nombreUsuario: datosFormulario.nombreUsuario.trim(),
      email: datosFormulario.email.trim(),
      fechaNacimiento: new Date(`${datosFormulario.fechaNacimiento}T00:00:00Z`).toISOString().slice(0, 10),
      aceptaCondiciones: Boolean(datosFormulario.aceptaCondiciones)
    };

    if (usuarioEnEdicion === undefined) {
      datosUsuario.id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      window.Almacen.crear(NOMBRE_COLECCION, datosUsuario);
    } else {
      const usuarioActualizado = window.Almacen.actualizar(
        NOMBRE_COLECCION,
        usuarioEnEdicion,
        datosUsuario
      );
      if (!usuarioActualizado) {
        UI.mostrarEstadoRegistro("No se encontró el usuario que quieres actualizar.");
        return;
      }
    }

    reiniciarFormulario();
    renderizarUsuarios();
    UI.mostrarEstadoRegistro(
      estabaEditando ? "Usuario actualizado correctamente." : "Usuario registrado correctamente."
    );
  }

  function gestionarAccionUsuario(evento) {
    const boton = evento.target.closest("button[data-accion][data-id]");
    if (!boton) {
      return;
    }

    if (boton.dataset.accion === "editar") {
      iniciarEdicion(boton.dataset.id);
      return;
    }

    if (boton.dataset.accion === "borrar") {
      if (!window.confirm("¿Seguro que quieres borrar este usuario?")) {
        return;
      }

      const eliminado = window.Almacen.borrar(NOMBRE_COLECCION, boton.dataset.id);
      if (!eliminado) {
        UI.mostrarEstadoRegistro("No se encontró el usuario que quieres borrar.");
        return;
      }

      if (usuarioEnEdicion === boton.dataset.id) {
        reiniciarFormulario();
      }
      renderizarUsuarios();
      UI.mostrarEstadoRegistro("Usuario borrado correctamente.");
    }
  }

  function fechaLocalActual() {
    const hoy = new Date();
    return `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;
  }

  campos.forEach((campo) => {
    campo.addEventListener("blur", () => {
      camposTocados.add(campo);
      validarYMostrarCampo(campo);
    });
    campo.addEventListener("input", () => {
      if (camposTocados.has(campo)) {
        validarYMostrarCampo(campo);
      }

      if (campo === campoContrasenaRegistro && camposTocados.has(campoRepetirContrasena)) {
        validarYMostrarCampo(campoRepetirContrasena);
      }
    });
    campo.addEventListener("change", () => {
      if (camposTocados.has(campo)) {
        validarYMostrarCampo(campo);
      }
    });
    UI.mostrarErrorRegistro(campo, null);
  });

  elementos.formularioRegistro.addEventListener("submit", guardarUsuario);
  elementos.botonCancelarEdicion.addEventListener("click", () => {
    reiniciarFormulario();
    UI.mostrarEstadoRegistro("Edición cancelada.");
  });
  elementos.listaUsuarios.addEventListener("click", gestionarAccionUsuario);

  UI.establecerFechaMaximaRegistro(fechaLocalActual());
  UI.mostrarEdadMinimaRegistro(EDAD_MINIMA);
  UI.actualizarModoRegistro(false);
  renderizarUsuarios();
})();
