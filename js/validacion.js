(function () {
  const esTextoVacio = (valor) => typeof valor !== "string" || valor.trim() === "";

  const validarCampoObligatorio = (valor) =>
    esTextoVacio(valor) ? "Este campo es obligatorio." : null;

  const validarNombre = (valor) =>
    esTextoVacio(valor) ? "El nombre es obligatorio." : null;

  const validarEmail = (valor) => {
    if (esTextoVacio(valor)) {
      return "El correo electrónico es obligatorio.";
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim())
      ? null
      : "Introduce un correo electrónico válido.";
  };

  const validarTelefono = (valor) => {
    if (typeof valor !== "string" || valor.trim() === "") {
      return null;
    }

    return /^(?:\+34[\s-]?)?[6789]\d{2}(?:[\s-]?\d{3}){2}$/.test(valor.trim())
      ? null
      : "Introduce un teléfono español válido (por ejemplo, 612 345 678).";
  };

  const validarMensaje = (valor) => {
    if (esTextoVacio(valor)) {
      return "El mensaje es obligatorio.";
    }

    const longitud = valor.trim().length;

    if (longitud < 20) {
      return "El mensaje debe tener al menos 20 caracteres.";
    }

    return longitud <= 500 ? null : "El mensaje no puede superar los 500 caracteres.";
  };

  const validarContrasena = (valor) => {
    if (esTextoVacio(valor)) {
      return "La contraseña es obligatoria.";
    }

    return valor.length >= 8 ? null : "La contraseña debe tener al menos 8 caracteres.";
  };

  window.Validacion = Object.freeze({
    validarCampoObligatorio,
    validarNombre,
    validarEmail,
    validarContrasena,
    validarTelefono,
    validarMensaje
  });
})();
