(function () {
  const NOMBRE_COLECCION = "mensajesContacto";
  const CLAVE_CONTACTO_RECORDADO = "contactoRecordado";

  const botonMenu = document.querySelector("#boton-menu");
  const menuPrincipal = document.querySelector("#menu-principal");
  const enlaceContacto = document.querySelector("#enlace-contacto");
  const panelContacto = document.querySelector("#panel-contacto");
  const formulario = document.querySelector("#formulario-contacto");
  const campoNombre = document.querySelector("#contacto-nombre");
  const campoEmail = document.querySelector("#contacto-email");
  const campoTelefono = document.querySelector("#contacto-telefono");
  const campoMotivo = document.querySelector("#contacto-motivo");
  const campoMensaje = document.querySelector("#contacto-mensaje");
  const preferirLlamada = document.querySelector("#prefiero-llamada");
  const estadoTelefono = document.querySelector("#estado-telefono");
  const contadorMensaje = document.querySelector("#contador-mensaje");
  const estadoEnvio = document.querySelector("#estado-envio");
  const listaMensajes = document.querySelector("#lista-mensajes");

  function cerrarMenu() {
    menuPrincipal.hidden = true;
    botonMenu.setAttribute("aria-expanded", "false");
    botonMenu.setAttribute("aria-label", "Abrir menú");
  }

  botonMenu.addEventListener("click", () => {
    if (!menuPrincipal.hidden) {
      cerrarMenu();
      return;
    }

    panelContacto.hidden = true;
    menuPrincipal.hidden = false;
    botonMenu.setAttribute("aria-expanded", "true");
    botonMenu.setAttribute("aria-label", "Cerrar menú");
    enlaceContacto.focus();
  });

  enlaceContacto.addEventListener("click", (evento) => {
    evento.preventDefault();
    cerrarMenu();
    panelContacto.hidden = false;
    campoNombre.focus();
  });

  document.addEventListener("click", (evento) => {
    if (!menuPrincipal.hidden && !menuPrincipal.contains(evento.target) && !botonMenu.contains(evento.target)) {
      cerrarMenu();
    }

    if (
      !panelContacto.hidden &&
      !panelContacto.contains(evento.target) &&
      !botonMenu.contains(evento.target) &&
      !enlaceContacto.contains(evento.target)
    ) {
      panelContacto.hidden = true;
    }
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && (!menuPrincipal.hidden || !panelContacto.hidden)) {
      cerrarMenu();
      panelContacto.hidden = true;
      botonMenu.focus();
    }
  });

  function mostrarError(campo, mensaje) {
    document.querySelector(`#error-${campo.name}`).textContent = mensaje || "";
    campo.setAttribute("aria-invalid", mensaje ? "true" : "false");
  }

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
      mostrarError(campo, mensaje);
      if (mensaje) {
        valido = false;
      }
    });

    if (!valido) {
      errores.find(([, mensaje]) => mensaje)[0].focus();
    }

    return valido;
  }

  function actualizarContador() {
    contadorMensaje.textContent = `${campoMensaje.value.length} / ${campoMensaje.maxLength} caracteres`;
  }

  function actualizarRequisitoTelefono() {
    campoTelefono.required = preferirLlamada.checked;
    estadoTelefono.textContent = preferirLlamada.checked ? "(obligatorio)" : "(opcional)";

    if (preferirLlamada.checked && campoTelefono.value.trim() === "") {
      mostrarError(campoTelefono, "El teléfono es obligatorio si prefieres que te llamemos.");
    } else {
      mostrarError(campoTelefono, window.Validacion.validarTelefono(campoTelefono.value));
    }
  }

  function crearElemento(etiqueta, texto) {
    const elemento = document.createElement(etiqueta);
    elemento.textContent = texto;
    return elemento;
  }

  function mostrarMensajes() {
    const mensajes = window.Almacen.obtenerTodos(NOMBRE_COLECCION);
    listaMensajes.textContent = "";

    if (mensajes.length === 0) {
      listaMensajes.append(crearElemento("p", "Todavía no has enviado mensajes."));
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
      listaMensajes.append(tarjeta);
    });
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

    campoNombre.value = datos.nombre;
    campoEmail.value = datos.email;
  }

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    estadoEnvio.textContent = "";

    if (!validarFormulario()) {
      return;
    }

    const mensaje = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      nombre: campoNombre.value.trim(),
      email: campoEmail.value.trim(),
      telefono: campoTelefono.value.trim(),
      prefieroLlamada: preferirLlamada.checked,
      motivo: campoMotivo.selectedOptions[0].textContent,
      texto: campoMensaje.value.trim(),
      fecha: new Date().toISOString()
    };

    window.Almacen.crear(NOMBRE_COLECCION, mensaje);
    guardarContactoRecordado(mensaje.nombre, mensaje.email);
    formulario.reset();
    rellenarContactoRecordado();
    actualizarContador();
    actualizarRequisitoTelefono();
    mostrarMensajes();
    estadoEnvio.textContent = "Tu mensaje se ha enviado correctamente.";
  });

  preferirLlamada.addEventListener("change", actualizarRequisitoTelefono);
  campoMensaje.addEventListener("input", actualizarContador);

  listaMensajes.addEventListener("click", (evento) => {
    const boton = evento.target.closest("button[data-id]");
    if (!boton) {
      return;
    }

    window.Almacen.borrar(NOMBRE_COLECCION, boton.dataset.id);
    mostrarMensajes();
  });

  rellenarContactoRecordado();
  actualizarContador();
  actualizarRequisitoTelefono();
  mostrarMensajes();
})();
