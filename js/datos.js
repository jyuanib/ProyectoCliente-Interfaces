const usuario = {
  id: 1,
  nombre: "Elena",
  apellidos: "Martínez Gómez",
  username: "elena_lectora",
  email: "elena.martinez@ejemplo.com",
  avatar: "https://ejemplo.com/avatars/elena.jpg",
  fechaRegistro: "2025-03-14",
  rol: "lector", // "lector" | "autor" | "admin"
  preferencias: {
    generosFavoritos: ["Ciencia ficción", "Realismo mágico", "Misterio"],
    idiomaPreferido: "Español",
    metaAnualLibros: 24
  },
  biblioteca: {
    leidos: [
      { libroId: 1, fechaFinalizacion: "2025-05-20", valoracion: 5 },
      { libroId: 3, fechaFinalizacion: "2025-08-11", valoracion: 5 }
    ],
    leyendoActualmente: [
      { libroId: 5, paginaActual: 312 }
    ],
    pendientes: [2, 6, 8],
    favoritos: [1, 3]
  },
  activo: true
};

const libros = [
  {
    id: 1,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    isbn: "978-0307474728",
    genero: ["Realismo mágico", "Ficción literaria"],
    anioPublicacion: 1967,
    editorial: "Editorial Sudamericana",
    paginas: 471,
    estado: "En posesión", // "En posesión" | "Prestado" | "Deseado" | "En prestamo"
    idioma: "Español",
    sinopsis:
      "Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar " +
      "aquella tarde remota en que su padre lo llevó a conocer el hielo. Con esta célebre frase comienza la saga " +
      "de la familia Buendía a lo largo de siete generaciones en el mítico y aislado pueblo de Macondo, fundado " +
      "por José Arcadio Buendía y Úrsula Iguarán. A través de guerras civiles, amores imposibles, milagros " +
      "cotidianos y tragedias cíclicas, la novela retrata el auge, esplendor y decadencia de un linaje condenado a la soledad."
  },
  {
    id: 2,
    titulo: "1984",
    autor: "George Orwell",
    isbn: "978-0451524935",
    genero: ["Ciencia ficción", "Distopía"],
    anioPublicacion: 1949,
    editorial: "Secker & Warburg",
    paginas: 328,
    estado: "En posesión",
    idioma: "Español",
    sinopsis:
      "En un Londres sombrío perteneciente al superestado de Oceanía, el Partido único liderado por el omnipresente " +
      "Gran Hermano controla cada aspecto de la vida, el pensamiento y el lenguaje mediante la neolengua y la policía " +
      "del pensamiento. Winston Smith, un funcionario del Ministerio de la Verdad encargado de reescribir la historia " +
      "según los intereses del régimen, comienza a albergar dudas y a escribir un diario prohibido. Su encuentro " +
      "clandestino con Julia despierta en él un deseo de rebelión que lo llevará a enfrentarse a la maquinaria más " +
      "implacable de tortura y control mental."
  },
  {
    id: 3,
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    isbn: "978-0156012195",
    genero: ["Fábula", "Literatura infantil", "Filosofía"],
    anioPublicacion: 1943,
    editorial: "Reynal & Hitchcock",
    paginas: 96,
    estado: "Prestado",
    idioma: "Español",
    sinopsis:
      "Un aviador sufre una avería en pleno desierto del Sahara y, al amanecer, es despertado por un misterioso niño " +
      "de cabellos dorados que le pide que le dibuje un cordero. A lo largo de los días mientras intenta reparar su " +
      "avión, el piloto escucha el relato de este pequeño príncipe proveniente del asteroide B 612, donde dejó al " +
      "cuidado de una rosa vanidosa pero única. A través de su viaje por distintos planetas habitados por adultos " +
      "absurdos y su encuentro con un zorro en la Tierra, la obra reflexiona sobre la amistad, el amor, la " +
      "responsabilidad y lo que realmente es esencial e invisible a los ojos."
  },
  {
    id: 4,
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    isbn: "978-8420412146",
    genero: ["Novela de aventuras", "Sátira", "Clásico"],
    anioPublicacion: 1605,
    editorial: "Francisco de Robles",
    paginas: 1032,
    estado: "Prestado",
    idioma: "Español",
    sinopsis:
      "Alonso Quijano, un hidalgo manchego de mediana edad, pierde el juicio tras leer sin descanso libros de " +
      "caballerías y decide convertirse en el caballero andante Don Quijote de la Mancha. Acompañado de su fiel y " +
      "pragmático escudero Sancho Panza, y en honor a su idealizada dama Dulcinea del Toboso, emprende tres salidas " +
      "por tierras de España para deshacer entuertos y proteger a los desvalidos. A lo largo de sus desventuras " +
      "—como su célebre batalla contra los molinos de viento—, la obra contrapone el idealismo desbordado frente " +
      "al realismo cotidiano en una profunda reflexión sobre la condición humana."
  },
  {
    id: 5,
    titulo: "Dune",
    autor: "Frank Herbert",
    isbn: "978-0441172719",
    genero: ["Ciencia ficción", "Aventura"],
    anioPublicacion: 1965,
    editorial: "Chilton Books",
    paginas: 688,
    estado: "En prestamo",
    idioma: "Español",
    sinopsis:
      "En un futuro lejano donde las grandes casas nobles compiten bajo el dominio del Emperador Padishah, la Casa " +
      "Atreides recibe el feudo de Arrakis, un inhóspito planeta desértico habitado por gigantescos gusanos de arena " +
      "y los misteriosos guerreros Fremen. Arrakis es el único lugar del universo donde se produce la melange, una " +
      "especia indispensable para los viajes espaciales y la longevidad. Tras una traición devastadora orquestada " +
      "por sus rivales, los Harkonnen, el joven heredero Paul Atreides debe huir al desierto profundo, donde " +
      "descubrirá que su destino está ligado a una antigua profecía mesiánica que cambiará el equilibrio del imperio."
  },
  {
    id: 6,
    titulo: "La sombra del viento",
    autor: "Carlos Ruiz Zafón",
    isbn: "978-8408163381",
    genero: ["Misterio", "Ficción histórica", "Gótico"],
    anioPublicacion: 2001,
    editorial: "Editorial Planeta",
    paginas: 576,
    estado: "En prestamo",
    idioma: "Español",
    sinopsis:
      "Un amanecer de 1945, un muchacho llamado Daniel Sempere es conducido por su padre a un misterioso lugar oculto " +
      "en el corazón de la ciudad vieja de Barcelona: el Cementerio de los Libros Olvidados. Allí, Daniel adopta un " +
      "ejemplar titulado 'La sombra del viento', escrito por un tal Julián Carax. Fascinado por la historia, pronto " +
      "descubre que alguien ha estado quemando sistemáticamente todos los libros del autor y que el suyo podría ser " +
      "el último ejemplar existente. Lo que empieza como una inocente curiosidad literaria se convierte en una " +
      "peligrosa investigación llena de secretos familiares, amores trágicos y personajes siniestros en la Barcelona de la posguerra."
  },
  {
    id: 7,
    titulo: "El código Da Vinci",
    autor: "Dan Brown",
    isbn: "978-0307474278",
    genero: ["Thriller", "Misterio", "Ficción conspirativa"],
    anioPublicacion: 2003,
    editorial: "Doubleday",
    paginas: 489,
    estado: "Deseado",
    idioma: "Español",
    sinopsis:
      "Antes de morir asesinado en la Gran Galería del Museo del Louvre de París, el veterano conservador Jacques " +
      "Saunière deja una serie de mensajes cifrados junto a su cuerpo dispuesto en la postura del Hombre de Vitruvio. " +
      "El catedrático de simbología religiosa Robert Langdon y la criptógrafa policial Sophie Neveu unen fuerzas para " +
      "descifrar el enigma, convirtiéndose en fugitivos mientras siguen un rastro de pistas ocultas en las pinturas " +
      "de Leonardo da Vinci. Su búsqueda los enfrentará a una sociedad secreta católica y los llevará a desvelar uno " +
      "de los mayores misterios históricos relacionados con el Santo Grial."
  },
  {
    id: 8,
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    isbn: "978-8437604572",
    genero: ["Ficción experimental", "Novela"],
    anioPublicacion: 1963,
    editorial: "Editorial Sudamericana",
    paginas: 736,
    estado: "En posesión",
    idioma: "Español",
    sinopsis:
      "Concebida como una 'contranovela' que invita al lector a elegir entre una lectura lineal o un tablero de " +
      "dirección que salta entre capítulos, la obra sigue la búsqueda existencial de Horacio Oliveira, un intelectual " +
      "argentino exiliado en París. Allí vive una intensa y compleja relación con la Maga mientras participa en las " +
      "tertulias filosóficas y artísticas del Club de la Serpiente. Tras una tragedia y su posterior regreso a Buenos " +
      "Aires, Horacio intenta encontrar sentido a su vida junto a su amigo Traveler y Talita, en una historia cargada " +
      "de humor, surrealismo, jazz y reflexión sobre el lenguaje y el absurdo."
  },
  {
    id: 9,
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    isbn: "978-0132350884",
    genero: ["Tecnología", "Programación", "Ingeniería de Software"],
    anioPublicacion: 2008,
    editorial: "Prentice Hall",
    paginas: 464,
    estado: "Deseado",
    idioma: "Inglés",
    sinopsis:
      "Incluso un código que funciona puede llevar a una empresa a la ruina si es ilegible y difícil de mantener. " +
      "En esta obra de referencia para desarrolladores de software, Robert C. Martin ('Uncle Bob') expone los " +
      "principios, patrones y prácticas esenciales para distinguir entre un código deficiente y uno limpio. Dividido " +
      "en tres partes —principios y patrones, casos prácticos de refactorización y una recopilación de heurísticas " +
      "y 'olores del código'—, el libro enseña cómo nombrar variables, estructurar funciones, manejar errores y " +
      "escribir pruebas unitarias efectivas."
  },
  {
    id: 10,
    titulo: "Sapiens: De animales a dioses",
    autor: "Yuval Noah Harari",
    isbn: "978-8499926223",
    genero: ["Historia", "Antropología", "Divulgación científica"],
    anioPublicacion: 2011,
    editorial: "Debate",
    paginas: 496,
    estado: "En posesión",
    idioma: "Español",
    sinopsis:
      "Hace cien mil años, al menos seis especies de humanos habitaban la Tierra; hoy solo queda una: nosotros, los " +
      "Homo sapiens. A través de un enfoque interdisciplinario que combina historia, biología, economía y antropología, " +
      "Yuval Noah Harari analiza cómo nuestra especie logró dominar el planeta gracias a tres grandes revoluciones: " +
      "la Cognitiva (que nos permitió crear mitos colectivos, dinero y religiones), la Agrícola y la Científica. " +
      "El libro cuestiona las estructuras del mundo moderno y plantea hacia dónde nos dirigimos con los avances en " +
      "biotecnología e inteligencia artificial."
  }
];

