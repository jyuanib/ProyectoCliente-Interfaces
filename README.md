# Backlog

| Prioridad | Historia / Funcionalidad | Descripción breve y criterio de prueba | 
| ----- | ----- | ----- | 
| **1 (Alta)** | **Modelo de datos y alta básica de libro** | Formulario para añadir un libro con título, autor, formato (físico/electrónico) y categoría, con validación de campos obligatorios. | 
| **2 (Alta)** | **Listado y consulta de colección** | Vista inicial que muestra todos los libros en posesión registrados para consultarlos rápidamente. | 
| **3 (Alta)** | **Edición y eliminación de libros** | Posibilidad de modificar los datos de un libro existente o eliminarlo de la colección con confirmación. | 
| **4 (Alta)** | **Filtrado y ordenación de la biblioteca** | Ordenar y filtrar la colección por categoría, autor o formato (físico/digital). | 
| **5 (Media)** | **Lista de deseados (Wishlist)** | Apartado independiente para guardar libros, mangas o cómics que el usuario quiere comprar o leer en el futuro. | 
| **6 (Media)** | **Registro de tiendas online por libro** | Asociar enlaces o tiendas de venta online a los artículos de la lista de deseados. | 
| **7 (Media)** | **Sistema de alertas de ofertas** | Notificación al usuario cuando alguno de los libros guardados en deseados tenga una oferta en las tiendas vinculadas. | 
| **8 (Media)** | **Gestión de estados de lectura y préstamos** | Asignar y filtrar libros por estado: *en posesión*, *en proceso de lectura*, *en préstamo* o *prestado* (con opción de anotar a quién). | 
| **9 (Baja)** | **Vista visual de estantería** | Representación gráfica de los libros dispuestos en estanterías virtuales en lugar de una lista plana. | 
| **10 (Baja)** | **Interacción arrastrar y soltar (Drag & Drop)** | Permitir mover y reorganizar los libros visualmente en la estantería usando ratón o pantalla táctil. | 
| **11 (baja)** | **Personalización visual de la biblioteca** | Opciones para cambiar el aspecto de las estanterías, colores o disposición personalizada. | 

# Mapa de pantallas

| vista | Datos visibles | 
| ----- | ----- |
| **pantalla-principal** | muestra el total de libros y el último visto de cada categoría: En prestamo, Desedos, En posesión y prestados | 
| **libros-en-prestamo** | lista los libros que le prestaron al usuario con la fecha de devolución desde el prestamo, el nombre de la persona a devolver y una breve descripción del libro | 
| **libros-en-posesión** | lista los libros que posee el usuario con una breve descripción de cada uno |
| **libros-prestados** | lista los libros que el usuario a prestado con la fecha del prestamo y el contacto de la persona a la que se le prestó|
| **libros-deseados** | lista los libros que el usuario quiere comprar en algún momento, su precio, ediciones, tiendas donde se encuentra, y una breve descripción general | 
| **zona-lector** | muestra el contenido del libro seleccionado |
| **tienda-promociones** | lista libros recomendados según los libros anteriormente leídos que estén en oferta, dandole prioridad a los libros que se encuentren en "tienda-promociones"|
