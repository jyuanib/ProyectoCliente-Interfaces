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
}

const estanteria = document.querySelector(".banner");

estanteria.addEventListener("click", () => {
  mostrarLibros(libros, "Todos los libros:");
});

estanteria.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter" || evento.key === " ") {
    evento.preventDefault();
    mostrarLibros(libros, "Todos los libros:");
  }
});

document.querySelectorAll(".btn-categoria").forEach((boton) => {
  boton.addEventListener("click", (evento) => {
    evento.preventDefault();

    const estado = estadosPorCategoria[boton.getAttribute("href")];
    const librosFiltrados = libros.filter((libro) => libro.estado === estado);

    mostrarLibros(librosFiltrados, `Libros con estado "${estado}":`);
  });
});