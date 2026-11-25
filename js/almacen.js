(function () {
  const leerColeccion = (coleccion) => {
    const datosGuardados = localStorage.getItem(coleccion);

    if (datosGuardados !== null) {
      const datos = JSON.parse(datosGuardados);

      if (!Array.isArray(datos)) {
        throw new TypeError(`La colección "${coleccion}" no contiene una lista válida.`);
      }

      return datos;
    }

    const datosIniciales = window.datosIniciales[coleccion] || [];
    localStorage.setItem(coleccion, JSON.stringify(datosIniciales));
    return datosIniciales;
  };

  const guardarColeccion = (coleccion, datos) => {
    localStorage.setItem(coleccion, JSON.stringify(datos));
  };

  window.Almacen = Object.freeze({
    obtenerTodos(coleccion) {
      return leerColeccion(coleccion);
    },

    obtenerPorId(coleccion, id) {
      return leerColeccion(coleccion).find((dato) => dato.id === id);
    },

    crear(coleccion, dato) {
      const datos = leerColeccion(coleccion);
      datos.push(dato);
      guardarColeccion(coleccion, datos);
      return dato;
    },

    actualizar(coleccion, id, dato) {
      const datos = leerColeccion(coleccion);
      const indice = datos.findIndex((elemento) => elemento.id === id);

      if (indice === -1) {
        return undefined;
      }

      datos[indice] = { ...datos[indice], ...dato, id: datos[indice].id };
      guardarColeccion(coleccion, datos);
      return datos[indice];
    },

    borrar(coleccion, id) {
      const datos = leerColeccion(coleccion);
      const datosRestantes = datos.filter((dato) => dato.id !== id);

      if (datosRestantes.length === datos.length) {
        return false;
      }

      guardarColeccion(coleccion, datosRestantes);
      return true;
    }
  });
})();
