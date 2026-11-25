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
    validarContrasena
  });
})();
