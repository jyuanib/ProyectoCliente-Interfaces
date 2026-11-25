const estadosPorCategoria = {
  "#en-prestamo": "En prestamo",
  "#deseados": "Deseado",
  "#en-posesion": "En posesión",
  "#prestados": "Prestado"
};

function mostrarLibros(librosFiltrados, mensaje) {
  console.log(mensaje);
  console.table(
    librosFiltrados.map(({ id, titulo, autor, estado }) => ({
      id,
      titulo,
      autor,
      estado
    }))
  );

  librosFiltrados.forEach((libro) => {
    console.groupCollapsed(`Libro ${libro.id}: ${libro.titulo}`);
    console.log(libro);
    console.groupEnd();
  });
}

const { banner: estanteria, botonesCategoria } = window.UI.elementos;

estanteria.addEventListener("click", () => {
  mostrarLibros(window.Almacen.obtenerTodos("libros"), "Todos los libros:");
});

estanteria.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter" || evento.key === " ") {
    evento.preventDefault();
    mostrarLibros(window.Almacen.obtenerTodos("libros"), "Todos los libros:");
  }
});

botonesCategoria.forEach((boton) => {
  boton.addEventListener("click", (evento) => {
    evento.preventDefault();

    const estado = estadosPorCategoria[boton.getAttribute("href")];
    const librosFiltrados = window.Almacen.obtenerTodos("libros").filter((libro) => libro.estado === estado);

    mostrarLibros(librosFiltrados, `Libros con estado "${estado}":`);
  });
});