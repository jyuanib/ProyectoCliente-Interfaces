(() => {
  const elementos = Object.freeze({
    banner: document.querySelector(".banner"),
    botonesCategoria: document.querySelectorAll(".btn-categoria"),
    botonMenu: document.querySelector("#boton-menu"),
    menuPrincipal: document.querySelector("#menu-principal"),
    enlaceContacto: document.querySelector("#enlace-contacto"),
    panelContacto: document.querySelector("#panel-contacto"),
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
    errores: Object.freeze({
      nombre: document.querySelector("#error-nombre"),
      email: document.querySelector("#error-email"),
      telefono: document.querySelector("#error-telefono"),
      motivo: document.querySelector("#error-motivo"),
      mensaje: document.querySelector("#error-mensaje")
    })
  });

  function cerrarMenu() {
    elementos.menuPrincipal.hidden = true;
    elementos.botonMenu.setAttribute("aria-expanded", "false");
    elementos.botonMenu.setAttribute("aria-label", "Abrir menú");
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

  elementos.botonMenu.addEventListener("click", () => {
    if (!elementos.menuPrincipal.hidden) {
      cerrarMenu();
      return;
    }

    elementos.panelContacto.hidden = true;
    elementos.menuPrincipal.hidden = false;
    elementos.botonMenu.setAttribute("aria-expanded", "true");
    elementos.botonMenu.setAttribute("aria-label", "Cerrar menú");
    elementos.enlaceContacto.focus();
  });

  elementos.enlaceContacto.addEventListener("click", (evento) => {
    evento.preventDefault();
    cerrarMenu();
    elementos.panelContacto.hidden = false;
    elementos.campoNombre.focus();
  });

  document.addEventListener("click", (evento) => {
    if (
      !elementos.menuPrincipal.hidden &&
      !elementos.menuPrincipal.contains(evento.target) &&
      !elementos.botonMenu.contains(evento.target)
    ) {
      cerrarMenu();
    }

    if (
      !elementos.panelContacto.hidden &&
      !elementos.panelContacto.contains(evento.target) &&
      !elementos.botonMenu.contains(evento.target) &&
      !elementos.enlaceContacto.contains(evento.target)
    ) {
      elementos.panelContacto.hidden = true;
    }
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && (!elementos.menuPrincipal.hidden || !elementos.panelContacto.hidden)) {
      cerrarMenu();
      elementos.panelContacto.hidden = true;
      elementos.botonMenu.focus();
    }
  });

  window.UI = Object.freeze({
    elementos,

    mostrarError,

    actualizarContadorMensaje() {
      elementos.contadorMensaje.textContent =
        `${elementos.campoMensaje.value.length} / ${elementos.campoMensaje.maxLength} caracteres`;
    },

    actualizarRequisitoTelefono(esObligatorio, mensajeError) {
      elementos.campoTelefono.required = esObligatorio;
      elementos.estadoTelefono.textContent = esObligatorio ? "(obligatorio)" : "(opcional)";
      mostrarError(elementos.campoTelefono, mensajeError);
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

    renderizarMensajes
  });
})();
