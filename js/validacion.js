(function () {
  const MENSAJES_REQUERIDOS = {
    nombre: "El nombre es obligatorio.",
    email: "El correo electrónico es obligatorio.",
    telefono: "El teléfono es obligatorio si prefieres que te llamemos.",
    motivo: "Selecciona un motivo para el mensaje.",
    mensaje: "El mensaje es obligatorio."
  };

  const validarCampo = (campo) => {
    const valor = campo.value;
    const validez = campo.validity;

    if (campo.required && (valor.trim() === "" || validez.valueMissing)) {
      return MENSAJES_REQUERIDOS[campo.name] || "Este campo es obligatorio.";
    }

    if (validez.typeMismatch) {
      return campo.type === "email"
        ? "Introduce un correo electrónico válido."
        : "El valor introducido no tiene un formato válido.";
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

  window.Validacion = Object.freeze({
    validarCampo,
    validarTelefono,
  });
})();
