(() => {
  const elementos = Object.freeze({
    banner: document.querySelector(".banner"),
    botonesCategoria: document.querySelectorAll(".btn-categoria"),
    botonMenu: document.querySelector("#boton-menu"),
    menuPrincipal: document.querySelector("#menu-principal"),
    enlacePerfil: document.querySelector("#enlace-perfil"),
    enlaceContacto: document.querySelector("#enlace-contacto"),
    panelContacto: document.querySelector("#panel-contacto"),
    panelUsuarios: document.querySelector("#panel-usuarios"),
    formularioContacto: document.querySelector("#formulario-contacto"),
    campoNombre: document.querySelector("#contacto-nombre"),
    campoEmail: document.querySelector("#contacto-email"),
    campoTelefono: document.querySelector("#contacto-telefono"),
    campoMotivo: document.querySelector("#contacto-motivo"),
    campoMensaje: document.querySelector("#contacto-mensaje"),
    preferirLlamada: document.querySelector("#prefiero-llamada"),
    estadoTelefono: document.querySelector("#estado-telefono"),
    contadorMensaje: document.querySelector("#contador-mensaje"),
    estadoEnvio: document.querySelector("#estado-envio"),
    listaMensajes: document.querySelector("#lista-mensajes"),
    formularioRegistro: document.querySelector("#formulario-registro"),
    campoUsuario: document.querySelector("#registro-usuario"),
    campoEmailRegistro: document.querySelector("#registro-email"),
    campoContrasenaRegistro: document.querySelector("#registro-contrasena"),
    campoRepetirContrasena: document.querySelector("#registro-repetir-contrasena"),
    campoFechaNacimiento: document.querySelector("#registro-fecha-nacimiento"),
    ayudaFechaNacimiento: document.querySelector("#ayuda-fecha-nacimiento"),
    campoAceptaCondiciones: document.querySelector("#registro-acepta-condiciones"),
    tituloFormularioRegistro: document.querySelector("#titulo-formulario-registro"),
    botonGuardarUsuario: document.querySelector("#boton-guardar-usuario"),
    botonCancelarEdicion: document.querySelector("#boton-cancelar-edicion"),
    estadoRegistro: document.querySelector("#estado-registro"),
    listaUsuarios: document.querySelector("#lista-usuarios"),
    errores: Object.freeze({
      nombre: document.querySelector("#error-nombre"),
      email: document.querySelector("#error-email"),
      telefono: document.querySelector("#error-telefono"),
      motivo: document.querySelector("#error-motivo"),
      mensaje: document.querySelector("#error-mensaje")
    }),
    erroresRegistro: Object.freeze({
      usuario: document.querySelector("#error-registro-usuario"),
      email: document.querySelector("#error-registro-email"),
      contrasena: document.querySelector("#error-registro-contrasena"),
      repetirContrasena: document.querySelector("#error-registro-repetir-contrasena"),
      fechaNacimiento: document.querySelector("#error-registro-fecha-nacimiento"),
      aceptaCondiciones: document.querySelector("#error-registro-acepta-condiciones")
    })
  });

  function cerrarMenu() {
    elementos.menuPrincipal.hidden = true;
    elementos.botonMenu.setAttribute("aria-expanded", "false");
    elementos.botonMenu.setAttribute("aria-label", "Abrir menú");
  }

  function mostrarPanelUsuarios() {
    cerrarMenu();
    elementos.panelContacto.hidden = true;
    elementos.panelUsuarios.hidden = false;
    elementos.campoUsuario.focus();
  }

  function mostrarError(campo, mensaje) {
    elementos.errores[campo.name].textContent = mensaje || "";
    campo.setAttribute("aria-invalid", mensaje ? "true" : "false");
  }

  function crearElemento(etiqueta, texto) {
    const elemento = document.createElement(etiqueta);
    elemento.textContent = texto;
    return elemento;
  }

  function renderizarMensajes(mensajes) {
    elementos.listaMensajes.textContent = "";

    if (mensajes.length === 0) {
      elementos.listaMensajes.append(crearElemento("p", "Todavía no has enviado mensajes."));
      return;
    }

    mensajes.slice().reverse().forEach((mensaje) => {
      const tarjeta = document.createElement("article");
      tarjeta.className = "mensaje-enviado";
      tarjeta.append(crearElemento("h3", mensaje.motivo));
      tarjeta.append(crearElemento("p", `Enviado: ${new Date(mensaje.fecha).toLocaleString("es-ES")}`));
      tarjeta.append(crearElemento("p", `De: ${mensaje.nombre} · ${mensaje.email}`));

      if (mensaje.telefono) {
        tarjeta.append(crearElemento("p", `Teléfono: ${mensaje.telefono}`));
      }

      tarjeta.append(crearElemento("p", mensaje.texto));

      const botonBorrar = document.createElement("button");
      botonBorrar.type = "button";
      botonBorrar.dataset.id = mensaje.id;
      botonBorrar.setAttribute("aria-label", `Borrar mensaje enviado por ${mensaje.nombre}`);
      botonBorrar.textContent = "Borrar mensaje";
      tarjeta.append(botonBorrar);
      elementos.listaMensajes.append(tarjeta);
    });
  }

  function renderizarUsuarios(usuarios) {
    elementos.listaUsuarios.textContent = "";

    if (usuarios.length === 0) {
      elementos.listaUsuarios.append(crearElemento("p", "Todavía no hay usuarios registrados."));
      return;
    }

    usuarios.forEach((usuario) => {
      const tarjeta = document.createElement("article");
      tarjeta.className = "mensaje-enviado usuario-registrado";
      tarjeta.append(crearElemento("h3", usuario.nombreUsuario));
      tarjeta.append(crearElemento("p", `Correo: ${usuario.email}`));
      tarjeta.append(
        crearElemento(
          "p",
          `Fecha de nacimiento: ${new Date(`${usuario.fechaNacimiento}T00:00:00`).toLocaleDateString("es-ES")}`
        )
      );
      tarjeta.append(crearElemento("p", "Condiciones aceptadas"));

      const botonEditar = document.createElement("button");
      botonEditar.type = "button";
      botonEditar.dataset.accion = "editar";
      botonEditar.dataset.id = usuario.id;
      botonEditar.setAttribute("aria-label", `Editar usuario ${usuario.nombreUsuario}`);
      botonEditar.textContent = "Editar";
      tarjeta.append(botonEditar);

      const botonBorrar = document.createElement("button");
      botonBorrar.type = "button";
      botonBorrar.dataset.accion = "borrar";
      botonBorrar.dataset.id = usuario.id;
      botonBorrar.setAttribute("aria-label", `Borrar usuario ${usuario.nombreUsuario}`);
      botonBorrar.textContent = "Borrar";
      tarjeta.append(botonBorrar);
      elementos.listaUsuarios.append(tarjeta);
    });
  }

  elementos.botonMenu.addEventListener("click", () => {
    if (!elementos.menuPrincipal.hidden) {
      cerrarMenu();
      return;
    }

    elementos.panelContacto.hidden = true;
    elementos.panelUsuarios.hidden = true;
    elementos.menuPrincipal.hidden = false;
    elementos.botonMenu.setAttribute("aria-expanded", "true");
    elementos.botonMenu.setAttribute("aria-label", "Cerrar menú");
    elementos.enlaceContacto.focus();
  });

  elementos.enlaceContacto.addEventListener("click", (evento) => {
    evento.preventDefault();
    cerrarMenu();
    elementos.panelUsuarios.hidden = true;
    elementos.panelContacto.hidden = false;
    elementos.campoNombre.focus();
  });

  elementos.enlacePerfil.addEventListener("click", (evento) => {
    evento.preventDefault();
    mostrarPanelUsuarios();
  });

  document.addEventListener("click", (evento) => {
    const rutaEvento = evento.composedPath();

    if (
      !elementos.menuPrincipal.hidden &&
      !rutaEvento.includes(elementos.menuPrincipal) &&
      !rutaEvento.includes(elementos.botonMenu)
    ) {
      cerrarMenu();
    }

    if (
      !elementos.panelContacto.hidden &&
      !rutaEvento.includes(elementos.panelContacto) &&
      !rutaEvento.includes(elementos.botonMenu) &&
      !rutaEvento.includes(elementos.enlaceContacto)
    ) {
      elementos.panelContacto.hidden = true;
    }

    if (
      !elementos.panelUsuarios.hidden &&
      !rutaEvento.includes(elementos.panelUsuarios) &&
      !rutaEvento.includes(elementos.botonMenu) &&
      !rutaEvento.includes(elementos.enlacePerfil)
    ) {
      elementos.panelUsuarios.hidden = true;
    }
  });

  document.addEventListener("keydown", (evento) => {
    if (
      evento.key === "Escape" &&
      (!elementos.menuPrincipal.hidden || !elementos.panelContacto.hidden || !elementos.panelUsuarios.hidden)
    ) {
      cerrarMenu();
      elementos.panelContacto.hidden = true;
      elementos.panelUsuarios.hidden = true;
      elementos.botonMenu.focus();
    }
  });

  window.UI = Object.freeze({
    elementos,

    mostrarError,

    mostrarErrorRegistro(campo, mensaje) {
      elementos.erroresRegistro[campo.name].textContent = mensaje || "";
      campo.setAttribute("aria-invalid", mensaje ? "true" : "false");
    },

    actualizarContadorMensaje() {
      elementos.contadorMensaje.textContent =
        `${elementos.campoMensaje.value.length} / ${elementos.campoMensaje.maxLength} caracteres`;
    },

    actualizarRequisitoTelefono(esObligatorio) {
      elementos.campoTelefono.required = esObligatorio;
      elementos.estadoTelefono.textContent = esObligatorio ? "(obligatorio)" : "(opcional)";
    },

    leerFormularioContacto() {
      return {
        nombre: elementos.campoNombre.value,
        email: elementos.campoEmail.value,
        telefono: elementos.campoTelefono.value,
        prefieroLlamada: elementos.preferirLlamada.checked,
        motivo: elementos.campoMotivo.selectedOptions[0].textContent,
        texto: elementos.campoMensaje.value
      };
    },

    limpiarFormularioContacto() {
      elementos.formularioContacto.reset();
    },

    rellenarContactoRecordado(nombre, email) {
      elementos.campoNombre.value = nombre;
      elementos.campoEmail.value = email;
    },

    limpiarEstadoEnvio() {
      elementos.estadoEnvio.textContent = "";
    },

    mostrarEstadoEnvio(mensaje) {
      elementos.estadoEnvio.textContent = mensaje;
    },

    leerFormularioRegistro() {
      return {
        nombreUsuario: elementos.campoUsuario.value,
        email: elementos.campoEmailRegistro.value,
        contrasena: elementos.campoContrasenaRegistro.value,
        repetirContrasena: elementos.campoRepetirContrasena.value,
        fechaNacimiento: elementos.campoFechaNacimiento.value,
        aceptaCondiciones: elementos.campoAceptaCondiciones.checked
      };
    },

    rellenarFormularioRegistro(usuario) {
      elementos.campoUsuario.value = usuario.nombreUsuario;
      elementos.campoEmailRegistro.value = usuario.email;
      elementos.campoFechaNacimiento.value = usuario.fechaNacimiento;
      elementos.campoAceptaCondiciones.checked = usuario.aceptaCondiciones;
    },

    limpiarFormularioRegistro() {
      elementos.formularioRegistro.reset();
      Object.values(elementos.erroresRegistro).forEach((error) => {
        error.textContent = "";
      });
      [
        elementos.campoUsuario,
        elementos.campoEmailRegistro,
        elementos.campoContrasenaRegistro,
        elementos.campoRepetirContrasena,
        elementos.campoFechaNacimiento,
        elementos.campoAceptaCondiciones
      ].forEach((campo) => campo.setAttribute("aria-invalid", "false"));
    },

    actualizarModoRegistro(esEdicion) {
      elementos.tituloFormularioRegistro.textContent = esEdicion ? "Editar usuario" : "Crear usuario";
      elementos.botonGuardarUsuario.textContent = esEdicion ? "Guardar cambios" : "Crear usuario";
      elementos.botonCancelarEdicion.hidden = !esEdicion;
    },

    establecerFechaMaximaRegistro(fecha) {
      elementos.campoFechaNacimiento.max = fecha;
    },

    mostrarEdadMinimaRegistro(edadMinima) {
      elementos.ayudaFechaNacimiento.textContent = `Debes tener al menos ${edadMinima} años.`;
    },

    limpiarEstadoRegistro() {
      elementos.estadoRegistro.textContent = "";
    },

    mostrarEstadoRegistro(mensaje) {
      elementos.estadoRegistro.textContent = mensaje;
    },

    renderizarMensajes,
    renderizarUsuarios
  });
})();
