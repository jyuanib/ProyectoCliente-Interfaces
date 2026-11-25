(function () {
  const MENSAJES_REQUERIDOS = {
    nombre: "El nombre es obligatorio.",
    email: "El correo electrónico es obligatorio.",
    telefono: "El teléfono es obligatorio si prefieres que te llamemos.",
    motivo: "Selecciona un motivo para el mensaje.",
    mensaje: "El mensaje es obligatorio.",
    usuario: "El nombre de usuario es obligatorio.",
    contrasena: "La contraseña es obligatoria.",
    repetirContrasena: "Repite la contraseña.",
    fechaNacimiento: "La fecha de nacimiento es obligatoria.",
    aceptaCondiciones: "Debes aceptar las condiciones."
  };

  const validarEmail = (valor) => {
    if (valor.trim() === "") {
      return null;
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim())
      ? null
      : "Introduce un correo electrónico válido.";
  };

  const validarCampo = (campo) => {
    const valor = campo.value;
    const validez = campo.validity;

    if (campo.required && (valor.trim() === "" || validez.valueMissing)) {
      return MENSAJES_REQUERIDOS[campo.name] || "Este campo es obligatorio.";
    }

    if (validez.typeMismatch) {
      return campo.type === "email"
        ? validarEmail(valor)
        : "El valor introducido no tiene un formato válido.";
    }

    if (campo.type === "email") {
      const errorEmail = validarEmail(valor);
      if (errorEmail) {
        return errorEmail;
      }
    }

    if (campo.minLength >= 0 && valor.length < campo.minLength) {
      return campo.name === "mensaje"
        ? `El mensaje debe tener al menos ${campo.minLength} caracteres.`
        : `Introduce al menos ${campo.minLength} caracteres.`;
    }

    if (campo.maxLength >= 0 && valor.length > campo.maxLength) {
      return campo.name === "mensaje"
        ? `El mensaje no puede superar los ${campo.maxLength} caracteres.`
        : `No introduzcas más de ${campo.maxLength} caracteres.`;
    }

    if (validez.rangeUnderflow) {
      return `El valor debe ser igual o superior a ${campo.min}.`;
    }

    if (validez.rangeOverflow) {
      if (campo.name === "fechaNacimiento") {
        return "La fecha de nacimiento no puede ser futura.";
      }

      return `El valor debe ser igual o inferior a ${campo.max}.`;
    }

    if (validez.patternMismatch) {
      return "El formato introducido no es válido.";
    }

    if (validez.stepMismatch) {
      return "Introduce un valor permitido.";
    }

    return null;
  };

  const validarTelefono = (valor) => {
    if (typeof valor !== "string" || valor.trim() === "") {
      return null;
    }

    return /^(?:\+34[\s-]?)?[6789]\d{2}(?:[\s-]?\d{3}){2}$/.test(valor.trim())
      ? null
      : "Introduce un teléfono español válido (por ejemplo, 612 345 678).";
  };

  const validarContrasena = (valor) => {
    if (!/[A-ZÁÉÍÓÚÜÑ]/.test(valor)) {
      return "La contraseña debe incluir al menos una mayúscula.";
    }

    if (!/\d/.test(valor)) {
      return "La contraseña debe incluir al menos un número.";
    }

    return null;
  };

  const validarEdadMinima = (valor, edadMinima, fechaActual = new Date()) => {
    if (!valor) {
      return null;
    }

    const fechaNacimiento = new Date(`${valor}T00:00:00Z`);
    if (Number.isNaN(fechaNacimiento.getTime())) {
      return "Introduce una fecha de nacimiento válida.";
    }

    const anioActual = fechaActual.getFullYear();
    const mesActual = fechaActual.getMonth();
    const diaActual = fechaActual.getDate();

    let edad = anioActual - fechaNacimiento.getUTCFullYear();
    if (
      mesActual < fechaNacimiento.getUTCMonth() ||
      (mesActual === fechaNacimiento.getUTCMonth() && diaActual < fechaNacimiento.getUTCDate())
    ) {
      edad -= 1;
    }

    return edad >= edadMinima
      ? null
      : `Debes tener al menos ${edadMinima} años para registrarte.`;
  };

  window.Validacion = Object.freeze({
    validarCampo,
    validarEmail,
    validarTelefono,
    validarContrasena,
    validarEdadMinima
  });
})();
