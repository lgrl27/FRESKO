const pantallas = {
  login: document.getElementById("pantallaLogin"),
  registro: document.getElementById("pantallaRegistro"),
  recuperacion: document.getElementById("pantallaRecuperacion"),
  inicio: document.getElementById("pantallaInicio")
};

function mostrarPantalla(nombre) {
  Object.entries(pantallas).forEach(([clave, pantalla]) => {
    pantalla.hidden = clave !== nombre;
  });
}

// Navegación entre pantallas
document.getElementById("crearCuenta").addEventListener("click", () => {
  mostrarPantalla("registro");
});

document.getElementById("recuperarContrasena").addEventListener("click", (e) => {
  e.preventDefault();
  mostrarPantalla("recuperacion");
});

document.getElementById("volverLoginRegistro").addEventListener("click", (e) => {
  e.preventDefault();
  mostrarPantalla("login");
});

document.getElementById("volverLoginRecuperacion").addEventListener("click", (e) => {
  e.preventDefault();
  mostrarPantalla("login");
});

// Inicio de sesión: demostración


/* INICIO DE SESIÓN TEMPORAL */

/* INICIO DE SESIÓN CON CUENTAS REGISTRADAS */

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const correo = document.getElementById("correo").value.trim().toLowerCase();
  const clave = document.getElementById("contrasena").value;
  const mensaje = document.getElementById("mensajeError");

  const cuentas = JSON.parse(
    localStorage.getItem("fresko_cuentas") || "{}"
  );

  const usuario = cuentas[correo];

  if (!usuario || usuario.clave !== clave) {
    mensaje.textContent = "Correo o contraseña incorrectos.";
    return;
  }

  mensaje.textContent = "";

  // Identificar al usuario que inició sesión
  localStorage.setItem("fresko_sesion_actual", correo);

  // Actualizar el perfil
  localStorage.setItem("fresko_usuario", JSON.stringify({
    nombre: usuario.nombre,
    correo: usuario.correo
  }));

  // Mostrar el nombre correspondiente
document.getElementById("saludoUsuario").textContent =
  `¡Hola, ${usuario.nombre}! Bienvenida a FresKo`;

// Actualizar el perfil con los datos de la cuenta actual
actualizarDatosPerfil();

// Cargar los alimentos de la cuenta que inició sesión
alimentos = JSON.parse(
  localStorage.getItem(obtenerClaveAlimentos()) || "[]"
);

// Actualizar la lista de alimentos
mostrarAlimentos();

// Cargar las compras de la cuenta actual
cargarListaCompras();

// Cargar las preferencias alimentarias de la cuenta actual
cargarPreferenciasUsuario();

// Cargar las notificaciones de la cuenta actual
cargarNotificacionesUsuario();

// Cargar las recetas del planificador de la cuenta actual
cargarPlanificadorUsuario();
cargarFavoritosUsuario();

mostrarPantalla("inicio");
});


// Registro: validar los datos ingresados
  document.getElementById("registroForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const clave = document.getElementById("claveRegistro").value;
  const confirmar = document.getElementById("confirmarClave").value;
  const mensaje = document.getElementById("mensajeRegistro");
  // Validar que la contraseña tenga letras y números
  const claveValida = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  if (!claveValida.test(clave)) {
    mensaje.style.color = "#d64545";
    mensaje.textContent =
      "La contraseña debe tener mínimo 8 caracteres, incluyendo letras y números.";
    return;
  }

  if (clave !== confirmar) {
    mensaje.textContent = "Las contraseñas no coinciden.";
    return;
  }

  // Obtener los datos del usuario
  const nombre = document.getElementById("nombreRegistro").value.trim();
  const correo = document.getElementById("correoRegistro").value.trim();
  // Validar el formato del correo electrónico
  const correoValido = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;

  if (!correoValido.test(correo)) {
    mensaje.style.color = "#d64545";
    mensaje.textContent =
      "Ingresa un correo electrónico válido, por ejemplo: usuario@gmail.com";
    return;
}
  
  // Validar que el nombre contenga únicamente letras y espacios
  const nombreValido = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?: [A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;

  if (!nombreValido.test(nombre)) {
    mensaje.style.color = "#d64545";
    mensaje.textContent =
      "El nombre completo solo puede contener letras y espacios, sin números ni símbolos.";
    return;
  }
  // Guardar varias cuentas para la demostración
  const cuentas = JSON.parse(
  localStorage.getItem("fresko_cuentas") || "{}"
);

const correoNormalizado = correo.toLowerCase();

if (cuentas[correoNormalizado]) {
  mensaje.style.color = "#d64545";
  mensaje.textContent = "Este correo ya está registrado.";
  return;
}

cuentas[correoNormalizado] = {
  nombre: nombre,
  correo: correoNormalizado,
  clave: clave
};

localStorage.setItem("fresko_cuentas", JSON.stringify(cuentas));

  // Mostrar mensaje de confirmación
  mensaje.style.color = "#246B45";
  mensaje.textContent = "¡Cuenta creada correctamente!";
});

// Recuperación de contraseña: prototipo
document.getElementById("recuperacionForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const mensaje = document.getElementById("mensajeRecuperacion");

  mensaje.textContent =
    "Esta función estará disponible próximamente. Por ahora, no se enviará ningún correo de recuperación.";
});
// Cerrar sesión
document.getElementById("cerrarSesion").addEventListener("click", () => {
  localStorage.removeItem("fresko_sesion_actual");
  localStorage.removeItem("fresko_usuario");

  document.getElementById("loginForm").reset();
  document.getElementById("mensajeError").textContent = "";

  mostrarPantalla("login");
});

const contenidoInicio = document.getElementById("contenidoInicio");
const seccionAlimentos = document.getElementById("seccionAlimentos");
const botonesMenu = document.querySelectorAll(".sidebar .nav-item");
const seccionAlertas = document.getElementById("seccionAlertas");
const seccionCompras = document.getElementById("seccionCompras");
const seccionPreparacion = document.getElementById("seccionPreparacion");
const seccionPerfil = document.getElementById("seccionPerfil");

document.getElementById("verTodosAlimentos").addEventListener("click", () => {
  botonesMenu[1].click();
  volverListaAlimentos();
});


botonesMenu[0].addEventListener("click", () => {
  contenidoInicio.hidden = false;
  seccionAlimentos.hidden = true;
  seccionAlertas.hidden = true;
  seccionCompras.hidden = true;
  seccionPreparacion.hidden = true;
  seccionPerfil.hidden = true;

  botonesMenu.forEach(boton => boton.classList.remove("active"));
  botonesMenu[0].classList.add("active");
});

botonesMenu[1].addEventListener("click", () => {
  contenidoInicio.hidden = true;
  seccionAlimentos.hidden = false;
  seccionAlertas.hidden = true;
  seccionCompras.hidden = true;
  seccionPreparacion.hidden = true;
  seccionPerfil.hidden = true;

  botonesMenu.forEach(boton => boton.classList.remove("active"));
  botonesMenu[1].classList.add("active");
});

/* ABRIR PANTALLA ALERTAS */

botonesMenu[2].addEventListener("click", () => {
  contenidoInicio.hidden = true;
  seccionAlimentos.hidden = true;
  seccionAlertas.hidden = false;
  seccionCompras.hidden = true;
  seccionPreparacion.hidden = true;
  seccionPerfil.hidden = true;

  botonesMenu.forEach((boton) => {
    boton.classList.remove("active");
  });

  botonesMenu[2].classList.add("active");

  mostrarAlertas();
});

/* ABRIR PANTALLA COMPRAS */

botonesMenu[3].addEventListener("click", () => {
  contenidoInicio.hidden = true;
  seccionAlimentos.hidden = true;
  seccionAlertas.hidden = true;
  seccionCompras.hidden = false;
  seccionPreparacion.hidden = true;
  seccionPerfil.hidden = true;
  vistaAgregarCompra.hidden = true;
  vistaListaCompras.hidden = false;

  botonesMenu.forEach((boton) => {
    boton.classList.remove("active");
  });

  botonesMenu[3].classList.add("active");
});

/* ABRIR PANTALLA PREPARACIÓN */

botonesMenu[4].addEventListener("click", () => {
  contenidoInicio.hidden = true;
  seccionAlimentos.hidden = true;
  seccionAlertas.hidden = true;
  seccionCompras.hidden = true;
  seccionPreparacion.hidden = false;
  seccionPerfil.hidden = true;
  document.getElementById("vistaRecetas").hidden = false;
  document.getElementById("vistaDetalleReceta").hidden = true;
  document.getElementById("vistaPlanificador").hidden = true;
  recetaSeleccionada = null;
  aplicarFiltroRecetas();

  botonesMenu.forEach((boton) => {
    boton.classList.remove("active");
  });

  botonesMenu[4].classList.add("active");
});


/* ABRIR PANTALLA PERFIL */

botonesMenu[5].addEventListener("click", () => {
  contenidoInicio.hidden = true;
  seccionAlimentos.hidden = true;
  seccionAlertas.hidden = true;
  seccionCompras.hidden = true;
  seccionPreparacion.hidden = true;
  seccionPerfil.hidden = false;
  vistaPerfil.hidden = false;
  vistaPreferencias.hidden = true;
  vistaInformacion.hidden = true;
  vistaNotificaciones.hidden = true;
  vistaConfiguracion.hidden = true;
  vistaAyuda.hidden = true;

  botonesMenu.forEach((boton) => {
    boton.classList.remove("active");
  });

  botonesMenu[5].classList.add("active");
});

/* CAMBIAR ENTRE LAS VISTAS DE COMPRAS */
const vistaListaCompras = document.getElementById("vistaListaCompras");
const vistaAgregarCompra = document.getElementById("vistaAgregarCompra");

const btnAgregarCompra = document.getElementById("btnAgregarCompra");
const volverListaCompras = document.getElementById("volverListaCompras");

// Abrir la pantalla Agregar a la lista
btnAgregarCompra.addEventListener("click", () => {
  vistaListaCompras.hidden = true;
  vistaAgregarCompra.hidden = false;
});

// Regresar a la lista de compras
volverListaCompras.addEventListener("click", () => {
  vistaAgregarCompra.hidden = true;
  vistaListaCompras.hidden = false;
});

/* CATÁLOGO DE PRODUCTOS PARA COMPRAS */
const productosCatalogo = [
  "Leche",
  "Huevos",
  "Pan",
  "Tomates",
  "Arroz"
];

const imagenesCatalogo = {
  "Leche": "img/leche.png",
  "Huevos": "img/huevos.png",
  "Pan": "img/pan.png",
  "Tomates": "img/tomate.png",
  "Arroz": "img/arroz.png"
};

const catalogoCompras = document.getElementById("catalogoCompras");

function mostrarCatalogoCompras() {
  catalogoCompras.innerHTML = "";

  productosCatalogo.forEach((producto) => {
    const fila = document.createElement("div");
    fila.classList.add("catalogo-item");

    const imagen = document.createElement("img");
    imagen.src = imagenesCatalogo[producto];
    imagen.alt = producto;
    
    const nombre = document.createElement("span");
    nombre.classList.add("catalogo-nombre");
    nombre.textContent = producto;


    const flecha = document.createElement("span");
    flecha.classList.add("catalogo-flecha");
    flecha.textContent = "›";

    fila.addEventListener("click", () => {
    
    const productosAgregados = document.querySelectorAll("#listaCompras .compra-nombre");

    const yaExiste = Array.from(productosAgregados).some(
    (elemento) => elemento.textContent === producto
    );

    if (yaExiste) {
    alert("Este producto ya está en tu lista de compras.");
    return;
    }

    const nuevaCompra = document.createElement("div");
    nuevaCompra.classList.add("compra-item");

    const casilla = document.createElement("input");
    casilla.type = "checkbox";

    const nombreCompra = document.createElement("span");
    nombreCompra.classList.add("compra-nombre");
    nombreCompra.textContent = producto;

    casilla.addEventListener("change", () => {
    nuevaCompra.classList.toggle("comprado", casilla.checked);
    guardarListaCompras();
});

  nuevaCompra.appendChild(casilla);
  nuevaCompra.appendChild(nombreCompra);
  agregarBotonEliminarCompra(nuevaCompra);

  document.getElementById("listaCompras").appendChild(nuevaCompra);
  guardarListaCompras();

  vistaAgregarCompra.hidden = true;
  vistaListaCompras.hidden = false;
});
    

fila.appendChild(imagen);
fila.appendChild(nombre);
fila.appendChild(flecha);
catalogoCompras.appendChild(fila);


  });
}

mostrarCatalogoCompras();

/* GUARDAR Y RECUPERAR LISTA DE COMPRAS */
// Obtener la clave de compras del usuario actual
function obtenerClaveCompras() {
  const correo = localStorage.getItem("fresko_sesion_actual");

  if (!correo) {
    return "fresko_lista_compras";
  }

  return "fresko_lista_compras_" + correo;
}

// Conservar la lista antigua en la cuenta de Oriana
const usuarioCompras = JSON.parse(
  localStorage.getItem("fresko_usuario") || "{}"
);

const claveComprasActual = obtenerClaveCompras();

if (
  localStorage.getItem("fresko_sesion_actual") &&
  usuarioCompras.nombre?.trim().toLowerCase().startsWith("oriana") &&
  localStorage.getItem(claveComprasActual) === null &&
  localStorage.getItem("fresko_lista_compras") !== null
) {
  localStorage.setItem(
    claveComprasActual,
    localStorage.getItem("fresko_lista_compras")
  );
}
function guardarListaCompras() {
  const productos = [];

  document.querySelectorAll("#listaCompras .compra-item").forEach((fila) => {
    productos.push({
      nombre: fila.querySelector(".compra-nombre").textContent,
      comprado: fila.querySelector('input[type="checkbox"]').checked
    });
  });

  localStorage.setItem(obtenerClaveCompras(), JSON.stringify(productos));
}

/* BOTÓN PARA ELIMINAR PRODUCTOS DE COMPRAS */
function agregarBotonEliminarCompra(fila) {
  const contenedor = document.createElement("div");
  contenedor.classList.add("compra-menu");

  const boton = document.createElement("button");
  boton.type = "button";
  boton.classList.add("compra-opciones");
  boton.textContent = "⋮";
  boton.title = "Opciones del producto";

  const menu = document.createElement("div");
  menu.classList.add("compra-menu-desplegable");
  menu.hidden = true;

  const eliminar = document.createElement("button");
  eliminar.type = "button";
  eliminar.textContent = "Eliminar";

  boton.addEventListener("click", (evento) => {
    evento.stopPropagation();

    document.querySelectorAll(".compra-menu-desplegable").forEach((otroMenu) => {
      if (otroMenu !== menu) otroMenu.hidden = true;
    });

    menu.hidden = !menu.hidden;
  });

  eliminar.addEventListener("click", () => {
    menu.hidden = true;

    const confirmar = confirm("¿Deseas eliminar este producto de tu lista?");

    if (confirmar) {
      fila.remove();
      guardarListaCompras();
    }
  });

  contenedor.appendChild(boton);
  contenedor.appendChild(menu);
  menu.appendChild(eliminar);
  fila.appendChild(contenedor);
}

document.addEventListener("click", (evento) => {
  if (!evento.target.closest(".compra-menu")) {
    document.querySelectorAll(".compra-menu-desplegable").forEach((menu) => {
      menu.hidden = true;
    });
  }
});


function cargarListaCompras() {
  const productos = JSON.parse(
  localStorage.getItem(obtenerClaveCompras()) || "[]"
);

  const lista = document.getElementById("listaCompras");
  lista.innerHTML = "";

  productos.forEach((producto) => {
    const fila = document.createElement("div");
    fila.classList.add("compra-item");

    const casilla = document.createElement("input");
    casilla.type = "checkbox";
    casilla.checked = producto.comprado;

    const nombre = document.createElement("span");
    nombre.classList.add("compra-nombre");
    nombre.textContent = producto.nombre;

    fila.classList.toggle("comprado", casilla.checked);

    casilla.addEventListener("change", () => {
      fila.classList.toggle("comprado", casilla.checked);
      guardarListaCompras();
    });

    fila.appendChild(casilla);
    fila.appendChild(nombre);
    agregarBotonEliminarCompra(fila);
    lista.appendChild(fila);
  });
}

cargarListaCompras();

/* AGREGAR PRODUCTO PERSONALIZADO */

const btnProductoPersonalizado = document.getElementById("agregarProductoPersonalizado");

btnProductoPersonalizado.addEventListener("click", () => {
  const producto = prompt("¿Qué producto deseas agregar?");

  if (!producto || !producto.trim()) return;

  const nombreProducto = producto.trim();

  const productosAgregados = document.querySelectorAll("#listaCompras .compra-nombre");

  const yaExiste = Array.from(productosAgregados).some(
    (elemento) => elemento.textContent.toLowerCase() === nombreProducto.toLowerCase()
  );

  if (yaExiste) {
    alert("Este producto ya está en tu lista de compras.");
    return;
  }

  const fila = document.createElement("div");
  fila.classList.add("compra-item");

  const casilla = document.createElement("input");
  casilla.type = "checkbox";

  const nombre = document.createElement("span");
  nombre.classList.add("compra-nombre");
  nombre.textContent = nombreProducto;

  casilla.addEventListener("change", () => {
    fila.classList.toggle("comprado", casilla.checked);
    guardarListaCompras();
  });

  fila.appendChild(casilla);
  fila.appendChild(nombre);
  agregarBotonEliminarCompra(fila);

  document.getElementById("listaCompras").appendChild(fila);

  guardarListaCompras();

  vistaAgregarCompra.hidden = true;
  vistaListaCompras.hidden = false;
});


/* BUSCADORES DE COMPRAS */

// Buscar productos en mi lista de compras
const buscarCompra = document.getElementById("buscarCompra");

buscarCompra.addEventListener("input", () => {
  const busqueda = buscarCompra.value.toLowerCase().trim();

  document.querySelectorAll("#listaCompras .compra-item").forEach((fila) => {
    const nombre = fila.querySelector(".compra-nombre").textContent.toLowerCase();

    fila.hidden = !nombre.includes(busqueda);
  });
});

// Buscar alimentos en el catálogo
const buscarProductoCompra = document.getElementById("buscarProductoCompra");

buscarProductoCompra.addEventListener("input", () => {
  const busqueda = buscarProductoCompra.value.toLowerCase().trim();

  document.querySelectorAll("#catalogoCompras .catalogo-item").forEach((fila) => {
    const nombre = fila.querySelector(".catalogo-nombre").textContent.toLowerCase();

    fila.hidden = !nombre.includes(busqueda);
  });
});




/* ABRIR Y CERRAR FORMULARIO DE ALIMENTOS */

const btnAgregarAlimento = document.getElementById("btnAgregarAlimento");
const formularioAlimento = document.getElementById("formularioAlimento");
const herramientasAlimentos = document.querySelector(".alimentos-herramientas");
const filtrosAlimentos = document.querySelector(".filtros-alimentos");
const tablaContenedor = document.querySelector(".tabla-contenedor");
const encabezadoAlimentos = document.querySelector(".alimentos-header");

function cambiarVistaAlimentos(mostrarFormulario) {
  formularioAlimento.hidden = !mostrarFormulario;

  herramientasAlimentos.hidden = mostrarFormulario;
  filtrosAlimentos.hidden = mostrarFormulario;
  tablaContenedor.hidden = mostrarFormulario;
  encabezadoAlimentos.hidden = mostrarFormulario;
}
const cancelarAlimento = document.getElementById("cancelarAlimento");
const formAgregarAlimento = document.getElementById("formAgregarAlimento");

// Abrir formulario

btnAgregarAlimento.addEventListener("click", () => {
  alimentoEnEdicion = null;
  formAgregarAlimento.reset();
  // Limpiar la fotografía anterior
    imagenAlimento.value = "";
    vistaPreviaAlimento.hidden = true;
    vistaPreviaAlimento.removeAttribute("src");

  formularioAlimento.querySelector("h2").textContent = "Agregar alimento";
  formAgregarAlimento.querySelector('button[type="submit"]').textContent =
    "Guardar alimento";

  cambiarVistaAlimentos(true);
  document.getElementById("nombreAlimento").focus();
});


// Cancelar registro

cancelarAlimento.addEventListener("click", () => {
  alimentoEnEdicion = null;
  cambiarVistaAlimentos(false);
  formAgregarAlimento.reset();

  formularioAlimento.querySelector("h2").textContent = "Agregar alimento";
  formAgregarAlimento.querySelector('button[type="submit"]').textContent =
    "Guardar alimento";
});

/* GUARDAR Y MOSTRAR ALIMENTOS */

// Obtener la clave de alimentos del usuario actual
function obtenerClaveAlimentos() {
  const correo = localStorage.getItem("fresko_sesion_actual");

  if (!correo) {
    return "freskoAlimentos";
  }

  return "freskoAlimentos_" + correo;
}
// Migrar los alimentos antiguos a la cuenta de Oriana
const claveAlimentosActual = obtenerClaveAlimentos();

if (
  localStorage.getItem("fresko_sesion_actual") &&
  localStorage.getItem(claveAlimentosActual) === null &&
  localStorage.getItem("freskoAlimentos") !== null
) {
  const usuarioActual = JSON.parse(
    localStorage.getItem("fresko_usuario") || "{}"
  );

  // Solo migrar si es la cuenta de Oriana
  if (usuarioActual.nombre?.trim().toLowerCase().startsWith("oriana")) {
    localStorage.setItem(
      claveAlimentosActual,
      localStorage.getItem("freskoAlimentos")
    );
  }
}
// Recuperar alimentos guardados anteriormente
let alimentos = JSON.parse(
  localStorage.getItem(obtenerClaveAlimentos()) || "[]"
);

const tablaAlimentos = document.getElementById("tablaAlimentos");

/* DETALLE DE ALIMENTO */

const detalleAlimento = document.getElementById("detalleAlimento");
let alimentoSeleccionado = null;

function abrirDetalleAlimento(id) {
  const alimento = alimentos.find((item) => item.id === id);

  if (!alimento) return;

  alimentoSeleccionado = id;

  document.getElementById("detalleNombre").textContent = alimento.nombre;
  document.getElementById("detalleCategoria").textContent = alimento.categoria;
  document.getElementById("detalleCantidad").textContent = alimento.cantidad;
  document.getElementById("detalleFecha").textContent = alimento.fecha;
  document.getElementById("detalleAlmacenamiento").textContent =
    alimento.almacenamiento;

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const vencimiento = new Date(alimento.fecha + "T00:00:00");
  const diasRestantes = Math.round(
    (vencimiento - hoy) / (1000 * 60 * 60 * 24)
  );

  let estado = "Fresco";

if (alimento.consumido) {
  estado = "Consumido";
} else if (diasRestantes < 0) {
  estado = "Vencido";
} else if (diasRestantes <= 3) {
  estado = "Por vencer";
}

document.getElementById("detalleEstado").textContent = estado;


const botonConsumido = document.getElementById("detalleConsumido");

if (alimento.consumido) {
  botonConsumido.textContent = "Desmarcar como consumido";
} else {
  botonConsumido.textContent = "Marcar como consumido";
}

botonConsumido.disabled = false;
botonConsumido.classList.toggle("consumido", Boolean(alimento.consumido));


  const foto = document.getElementById("detalleFoto");

  if (alimento.imagen) {
    foto.src = alimento.imagen;
    foto.alt = "Fotografía de " + alimento.nombre;
    foto.hidden = false;
  } else {
    foto.hidden = true;
    foto.removeAttribute("src");
  }

  cambiarVistaAlimentos(false);

  herramientasAlimentos.hidden = true;
  filtrosAlimentos.hidden = true;
  tablaContenedor.hidden = true;
  encabezadoAlimentos.hidden = true;

  detalleAlimento.hidden = false;
}

function volverListaAlimentos() {
  detalleAlimento.hidden = true;
  alimentoSeleccionado = null;
  cambiarVistaAlimentos(false);
}

/* EDITAR DESDE DETALLE DE ALIMENTO */

document.getElementById("detalleEditar").addEventListener("click", () => {
  const alimento = alimentos.find(
    (item) => item.id === alimentoSeleccionado
  );

  if (!alimento) return;

  // Buscar el botón Editar de ese alimento en la tabla
  const filas = Array.from(tablaAlimentos.querySelectorAll("tr"));
  const fila = filas.find((fila) => {
    const nombre = fila.querySelector(".nombre-alimento-boton");
    return nombre && nombre.textContent === alimento.nombre;
  });

  if (fila) {
    detalleAlimento.hidden = true;
    fila.querySelector(".btn-editar").click();
  }
});


document.getElementById("detalleVolver").addEventListener("click", () => {
  volverListaAlimentos();
});

/* ELIMINAR DESDE DETALLE DE ALIMENTO */

document.getElementById("detalleEliminar").addEventListener("click", () => {
  const alimento = alimentos.find(
    (item) => item.id === alimentoSeleccionado
  );

  if (!alimento) return;

  const confirmar = confirm(
    "¿Estás segura de que deseas eliminar " + alimento.nombre + "?"
  );

  if (!confirmar) return;

  const alimentosActualizados = alimentos.filter(
    (item) => item.id !== alimentoSeleccionado
  );

  try {
    localStorage.setItem(
      "freskoAlimentos",
      JSON.stringify(alimentosActualizados)
    );
  } catch (error) {
    alert("No se pudo eliminar el alimento. Inténtalo nuevamente.");
    return;
  }

  alimentos = alimentosActualizados;

  mostrarAlimentos();
  volverListaAlimentos();
});

/* MARCAR O DESMARCAR ALIMENTO COMO CONSUMIDO */
document.getElementById("detalleConsumido").addEventListener("click", () => {
  const alimento = alimentos.find(
    (item) => item.id === alimentoSeleccionado
  );

  if (!alimento) return;

  const estabaConsumido = Boolean(alimento.consumido);

  const mensaje = estabaConsumido
    ? "¿Deseas desmarcar " + alimento.nombre + " como consumido?"
    : "¿Deseas marcar " + alimento.nombre + " como consumido?";

  if (!confirm(mensaje)) return;

  alimento.consumido = !estabaConsumido;

  try {
    localStorage.setItem(obtenerClaveAlimentos(), JSON.stringify(alimentos));
  } catch (error) {
    alimento.consumido = estabaConsumido;
    alert("No se pudo guardar el cambio.");
    return;
  }

  mostrarAlimentos();
  abrirDetalleAlimento(alimento.id);
});

// Identifica si estamos editando un alimento
let alimentoEnEdicion = null;

// Búsqueda y filtros de alimentos
const buscarAlimento = document.getElementById("buscarAlimento");
const botonesFiltro = document.querySelectorAll(".filtros-alimentos .filtro");

let categoriaSeleccionada = "Todos";

// Buscar alimentos por nombre
buscarAlimento.addEventListener("input", () => {
  mostrarAlimentos();
});

// Filtrar por categoría
botonesFiltro.forEach((boton) => {
  boton.addEventListener("click", () => {
    categoriaSeleccionada = boton.dataset.categoria;

    botonesFiltro.forEach((filtro) => {
      filtro.classList.remove("activo");
    });

    boton.classList.add("activo");

    mostrarAlimentos();
  });
});

// Mostrar alimentos en la tabla

/* LISTA Y FILTROS DE ALERTAS */

let filtroAlertaSeleccionado = "Todas";

const botonesFiltroAlertas =
  document.querySelectorAll(".alerta-filtro");

botonesFiltroAlertas.forEach((boton) => {
  boton.addEventListener("click", () => {
    filtroAlertaSeleccionado = boton.dataset.filtro;

    botonesFiltroAlertas.forEach((filtro) => {
      filtro.classList.remove("activo");
    });

    boton.classList.add("activo");
    mostrarAlertas();
  });
});

function mostrarAlertas() {
  const lista = document.getElementById("listaAlertas");
  lista.innerHTML = "";

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const alertas = alimentos
    .filter((alimento) => !alimento.consumido)
    .map((alimento) => {
      const vencimiento = new Date(alimento.fecha + "T00:00:00");
      const dias = Math.round(
        (vencimiento - hoy) / (1000 * 60 * 60 * 24)
      );

      return { alimento, dias };
    })
    .filter(({ dias }) => {
      if (filtroAlertaSeleccionado === "Por vencer") {
        return dias >= 0 && dias <= 3;
      }

      if (filtroAlertaSeleccionado === "Vencido") {
        return dias < 0;
      }

      return dias <= 3;
    })
    
    .sort((a, b) => {
    const prioridadA = a.dias < 0 ? 1 : 0;
    const prioridadB = b.dias < 0 ? 1 : 0;

    if (prioridadA !== prioridadB) {
        return prioridadA - prioridadB;
    }

    return a.dias - b.dias;
    });


  if (alertas.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.textContent = "No tienes alertas en esta categoría.";
    lista.appendChild(mensaje);
    return;
  }

  alertas.forEach(({ alimento, dias }) => {
    const fila = document.createElement("div");
    fila.classList.add("alerta-item");

    if (alimento.imagen) {
      const imagen = document.createElement("img");
      imagen.src = alimento.imagen;
      imagen.alt = alimento.nombre;
      fila.appendChild(imagen);
    }

    const informacion = document.createElement("div");
    informacion.classList.add("alerta-info");

    const nombre = document.createElement("strong");
    nombre.textContent = alimento.nombre;

    const descripcion = document.createElement("p");

    if (dias < 0) {
      const diasVencido = Math.abs(dias);
      descripcion.textContent =
        diasVencido === 1
          ? "Venció hace 1 día"
          : "Venció hace " + diasVencido + " días";
    } else if (dias === 0) {
      descripcion.textContent = "Vence hoy";
    } else {
      descripcion.textContent =
        dias === 1 ? "Vence en 1 día" : "Vence en " + dias + " días";
    }

    informacion.appendChild(nombre);
    informacion.appendChild(descripcion);
    fila.appendChild(informacion);

    const etiqueta = document.createElement("span");
    etiqueta.classList.add("alerta-estado");

    if (dias < 0) {
      etiqueta.textContent = "Vencido";
      etiqueta.classList.add("vencido");
    } else {
      etiqueta.textContent = "Pronto a vencer";
      etiqueta.classList.add("por-vencer");
    }

    fila.appendChild(etiqueta);

    // Abrir el detalle al hacer clic en una alerta
    fila.style.cursor = "pointer";

    fila.addEventListener("click", () => {
      seccionAlertas.hidden = true;
      contenidoInicio.hidden = true;
      seccionAlimentos.hidden = false;

      botonesMenu.forEach((boton) => {
        boton.classList.remove("active");
      });

      botonesMenu[1].classList.add("active");

      abrirDetalleAlimento(alimento.id);
    });

    lista.appendChild(fila);
  });
}

/* ACTUALIZAR RESUMEN DE INICIO */

function actualizarInicio() {

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  let total = 0;
  let porVencer = 0;
  let vencidos = 0;

  const proximos = [];

  alimentos.forEach((alimento) => {
    // Los alimentos consumidos no cuentan como disponibles
    if (alimento.consumido) return;

    total++;

    const fecha = new Date(alimento.fecha + "T00:00:00");
    const diasRestantes = Math.round(
      (fecha - hoy) / (1000 * 60 * 60 * 24)
    );

    if (diasRestantes < 0) {
      vencidos++;
    } else if (diasRestantes <= 3) {
      porVencer++;
      proximos.push(alimento);
    }
  });

  document.getElementById("totalAlimentos").textContent = total;
  document.getElementById("porVencer").textContent = porVencer;
  document.getElementById("vencidos").textContent = vencidos;

  const lista = document.getElementById("listaProximos");
  lista.innerHTML = "";

  if (proximos.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.textContent = "No tienes alimentos próximos a vencer.";
    lista.appendChild(mensaje);
    return;
  }

  proximos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  proximos.forEach((alimento) => {
    const fila = document.createElement("div");
    fila.classList.add("proximo-alimento");

    if (alimento.imagen) {
      const imagen = document.createElement("img");
      imagen.src = alimento.imagen;
      imagen.alt = alimento.nombre;
      fila.appendChild(imagen);
    }

    const informacion = document.createElement("div");

    const nombre = document.createElement("strong");
    nombre.textContent = alimento.nombre;

    const fecha = document.createElement("p");
    fecha.textContent = "Vence el " +
      alimento.fecha.split("-").reverse().join("/");

    informacion.appendChild(nombre);
    informacion.appendChild(fecha);

    
    
fila.appendChild(informacion);

// Flecha para abrir el detalle del alimento
const flecha = document.createElement("span");
flecha.textContent = "›";
flecha.classList.add("flecha-proximo");

fila.appendChild(flecha);

// Abrir el detalle al hacer clic en la fila
fila.addEventListener("click", () => {
  contenidoInicio.hidden = true;
  seccionAlimentos.hidden = false;

  botonesMenu.forEach((boton) => boton.classList.remove("active"));
  botonesMenu[1].classList.add("active");

  abrirDetalleAlimento(alimento.id);
});

fila.classList.add("proximo-clickeable");
lista.appendChild(fila);

  });
}

/* MOSTRAR ALIMENTOS EN LA TABLA */
function mostrarAlimentos() {
  tablaAlimentos.innerHTML = "";

  actualizarInicio();


  
const textoBusqueda = buscarAlimento.value.trim().toLowerCase();

const alimentosFiltrados = alimentos.filter((alimento) => {
  const coincideNombre = alimento.nombre.toLowerCase().includes(textoBusqueda);

  const coincideCategoria =
    categoriaSeleccionada === "Todos" ||
    alimento.categoria === categoriaSeleccionada;

  return coincideNombre && coincideCategoria;
});

if (alimentosFiltrados.length === 0) {

    const fila = document.createElement("tr");
    const celda = document.createElement("td");

    celda.colSpan = 5;
    celda.textContent = "Aún no tienes alimentos registrados.";

    fila.appendChild(celda);
    tablaAlimentos.appendChild(fila);
    return;
  }

  alimentosFiltrados.forEach((alimento) => {
    const fila = document.createElement("tr");

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const vencimiento = new Date(alimento.fecha + "T00:00:00");
    const diasRestantes = Math.round(
      (vencimiento - hoy) / (1000 * 60 * 60 * 24)
    );

    let estado = "Fresco";

    
    
    if (alimento.consumido) {
    estado = "Consumido";
    } else if (diasRestantes < 0) {
    estado = "Vencido";
    } else if (diasRestantes <= 3) {
    estado = "Por vencer";
    }



    
// Primera columna: fotografía y nombre
const celdaNombre = document.createElement("td");
const contenidoNombre = document.createElement("div");
contenidoNombre.classList.add("alimento-con-imagen");

if (alimento.imagen) {
  const imagen = document.createElement("img");
  imagen.src = alimento.imagen;
  imagen.alt = "Fotografía de " + alimento.nombre;
  imagen.classList.add("miniatura-alimento");
  contenidoNombre.appendChild(imagen);
}


const nombre = document.createElement("button");
nombre.type = "button";
nombre.textContent = alimento.nombre;
nombre.classList.add("nombre-alimento-boton");

nombre.addEventListener("click", () => {
  abrirDetalleAlimento(alimento.id);
});

contenidoNombre.appendChild(nombre);

celdaNombre.appendChild(contenidoNombre);
fila.appendChild(celdaNombre);

/* COLUMNA CANTIDAD */
const celdaCantidad = document.createElement("td");
celdaCantidad.textContent = alimento.cantidad;
fila.appendChild(celdaCantidad);

/* COLUMNA VENCIMIENTO */
const celdaFecha = document.createElement("td");

celdaFecha.textContent = alimento.fecha
  .split("-")
  .reverse()
  .join("/");

fila.appendChild(celdaFecha);

/* COLUMNA ESTADO */
const celdaEstado = document.createElement("td");

const etiquetaEstado = document.createElement("span");
etiquetaEstado.textContent = estado;
etiquetaEstado.classList.add("etiqueta-estado");

if (estado === "Fresco") {
  etiquetaEstado.classList.add("estado-fresco");
} else if (estado === "Por vencer") {
  etiquetaEstado.classList.add("estado-por-vencer");
} else if (estado === "Vencido") {
  etiquetaEstado.classList.add("estado-vencido");
} else if (estado === "Consumido") {
  etiquetaEstado.classList.add("estado-consumido");
}

celdaEstado.appendChild(etiquetaEstado);
fila.appendChild(celdaEstado);



    
// Crear columna de acciones
const acciones = document.createElement("td");


// Crear botón Editar
const botonEditar = document.createElement("button");
botonEditar.type = "button";
botonEditar.textContent = "Editar";
botonEditar.classList.add("btn-editar");

botonEditar.addEventListener("click", () => {
  alimentoEnEdicion = alimento.id;
  // Mostrar la fotografía guardada del alimento
if (alimento.imagen) {
  vistaPreviaAlimento.src = alimento.imagen;
  vistaPreviaAlimento.hidden = false;
} else {
  vistaPreviaAlimento.hidden = true;
  vistaPreviaAlimento.removeAttribute("src");
}

// Limpiar el selector para permitir cambiar la fotografía
imagenAlimento.value = "";

  document.getElementById("nombreAlimento").value = alimento.nombre;
  document.getElementById("cantidadAlimento").value = alimento.cantidad;
  document.getElementById("fechaAlimento").value = alimento.fecha;
  document.getElementById("categoriaAlimento").value = alimento.categoria;
  document.getElementById("almacenamientoAlimento").value = alimento.almacenamiento;

  formularioAlimento.querySelector("h2").textContent = "Editar alimento";
  formAgregarAlimento.querySelector('button[type="submit"]').textContent =
    "Guardar cambios";

  cambiarVistaAlimentos(true);
  formularioAlimento.scrollIntoView({ behavior: "smooth" });
});

const botonEliminar = document.createElement("button");
botonEliminar.type = "button";
botonEliminar.textContent = "Eliminar";
botonEliminar.classList.add("btn-eliminar");

// Eliminar alimento al hacer clic
botonEliminar.addEventListener("click", () => {
  const confirmar = confirm(
    "¿Estás segura de que deseas eliminar " + alimento.nombre + "?"
  );

  if (confirmar) {
    alimentos = alimentos.filter((item) => item.id !== alimento.id);

    localStorage.setItem(obtenerClaveAlimentos(), JSON.stringify(alimentos));

    mostrarAlimentos();
  }
});

// Agregar los botones a la tabla
acciones.appendChild(botonEditar);
acciones.appendChild(botonEliminar);
fila.appendChild(acciones);


    tablaAlimentos.appendChild(fila);
  });
}


/* AGREGAR O EDITAR ALIMENTO */
formAgregarAlimento.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  
const datosAlimento = {
  nombre: document.getElementById("nombreAlimento").value.trim(),
  cantidad: document.getElementById("cantidadAlimento").value.trim(),
  fecha: document.getElementById("fechaAlimento").value,
  categoria: document.getElementById("categoriaAlimento").value,
  almacenamiento: document.getElementById("almacenamientoAlimento").value
};
// Validar el nombre del alimento
const nombreAlimentoValido = /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/;

if (!nombreAlimentoValido.test(datosAlimento.nombre)) {
  alert("El nombre del alimento debe contener letras.");
  return;
}
// Validar que la cantidad sea positiva y tenga una unidad
const cantidadValida = /^(\d+(?:[.,]\d+)?)\s*(unidades?|kg|g|litros?|ml)$/i;

const cantidadIngresada = datosAlimento.cantidad;
const coincidencia = cantidadIngresada.match(cantidadValida);

if (!coincidencia || Number(coincidencia[1].replace(",", ".")) <= 0) {
  alert(
    "Ingresa una cantidad válida mayor que cero. Ejemplo: 3 unidades, 1.5 kg o 500 g."
  );
  return;
}
// Guardar la imagen seleccionada
const archivoImagen = document.getElementById("imagenAlimento").files[0];

if (archivoImagen) {
  try {
    datosAlimento.imagen = await comprimirImagen(archivoImagen);
  } catch (error) {
    alert("No se pudo procesar la imagen. Intenta con otra fotografía.");
    return;
  }
}


  if (alimentoEnEdicion !== null) {
    // Actualizar el alimento existente
    alimentos = alimentos.map((alimento) => {
      if (alimento.id === alimentoEnEdicion) {
        return { ...alimento, ...datosAlimento };
      }

      return alimento;
    });
  } else {
    // Registrar un alimento nuevo
    alimentos.push({
      id: Date.now(),
      ...datosAlimento
    });
  }

  localStorage.setItem(obtenerClaveAlimentos(), JSON.stringify(alimentos));

  mostrarAlimentos();

  
  // Restaurar el formulario y volver a Mis alimentos
  alimentoEnEdicion = null;
  cambiarVistaAlimentos(false);
  formAgregarAlimento.reset();


  formularioAlimento.querySelector("h2").textContent = "Agregar alimento";
  formAgregarAlimento.querySelector('button[type="submit"]').textContent =
    "Guardar alimento";
});


// Mostrar los alimentos al cargar la página
mostrarAlimentos();

/* VISTA PREVIA DE LA IMAGEN DEL ALIMENTO */

const imagenAlimento = document.getElementById("imagenAlimento");
const vistaPreviaAlimento = document.getElementById("vistaPreviaAlimento");

let urlVistaPrevia = null;

imagenAlimento.addEventListener("change", () => {
  const archivo = imagenAlimento.files[0];

  // Liberar la imagen anterior, si existe
  if (urlVistaPrevia) {
    URL.revokeObjectURL(urlVistaPrevia);
    urlVistaPrevia = null;
  }

  if (!archivo) {
    vistaPreviaAlimento.hidden = true;
    vistaPreviaAlimento.removeAttribute("src");
    return;
  }

  if (!archivo.type.startsWith("image/")) {
    alert("Selecciona un archivo de imagen válido.");
    imagenAlimento.value = "";
    vistaPreviaAlimento.hidden = true;
    return;
  }

  urlVistaPrevia = URL.createObjectURL(archivo);

  vistaPreviaAlimento.src = urlVistaPrevia;
  vistaPreviaAlimento.hidden = false;
});

// Reducir el tamaño de una imagen antes de guardarla
function comprimirImagen(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();

    lector.onload = () => {
      const imagen = new Image();

      imagen.onload = () => {
        const canvas = document.createElement("canvas");
        const maximo = 500;

        const escala = Math.min(
          1,
          maximo / Math.max(imagen.width, imagen.height)
        );

        canvas.width = Math.round(imagen.width * escala);
        canvas.height = Math.round(imagen.height * escala);

        const contexto = canvas.getContext("2d");
        contexto.drawImage(imagen, 0, 0, canvas.width, canvas.height);

        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };

      imagen.onerror = () => reject(new Error("No se pudo procesar la imagen."));
      imagen.src = lector.result;
    };

    lector.onerror = () => reject(new Error("No se pudo leer el archivo."));
    lector.readAsDataURL(archivo);
  });
}

/* RECETAS DE PREPARACIÓN */


const recetasFresko = [
  {
    id: 1,
    nombre: "Ensalada de pollo",
    tiempo: "20 min",
    dificultad: "Fácil",
    imagen: "img/ensalada-pollo.png",
    
    ingredientes: ["pollo", "tomate", "lechuga", "aceite", "sal", "pimienta"],
    pasos: [
    "Cocina la pechuga de pollo y córtala en trozos.",
    "Lava y corta el tomate y la lechuga.",
    "Coloca todos los ingredientes en un recipiente.",
    "Agrega aceite de oliva, sal y pimienta al gusto.",
    "Mezcla bien y sirve la ensalada."
    ]

  },
  {
    id: 2,
    nombre: "Arroz con verduras",
    tiempo: "25 min",
    dificultad: "Fácil",
    imagen: "img/arroz-verduras.png",
    
    ingredientes: ["arroz", "zanahoria", "arvejas"],
    pasos: [
    "Lava el arroz y prepara las verduras.",
    "Corta la zanahoria en cubitos.",
    "Cocina las verduras en una olla con un poco de aceite.",
    "Agrega el arroz y el agua necesaria.",
    "Cocina hasta que el arroz esté listo y sirve."
    ]

  },
  {
    id: 3,
    nombre: "Pasta con tomate",
    tiempo: "30 min",
    dificultad: "Fácil",
    imagen: "img/pasta-tomate.png",
    
    ingredientes: ["pasta", "tomate", "ajo"],
    pasos: [
    "Hierve agua en una olla y cocina la pasta.",
    "Lava y corta los tomates.",
    "Pica el ajo y sofríelo con un poco de aceite.",
    "Agrega los tomates y cocina hasta formar una salsa.",
    "Mezcla la pasta con la salsa y sirve."
    ]

  },
  {
    id: 4,
    nombre: "Sopa de verduras",
    tiempo: "35 min",
    dificultad: "Fácil",
    imagen: "img/sopa-verduras.png",
    
    ingredientes: ["papa", "zanahoria", "apio"],
    pasos: [
    "Lava, pela y corta las verduras.",
    "Coloca agua en una olla y deja que hierva.",
    "Agrega las papas, zanahorias y el apio.",
    "Cocina hasta que las verduras estén suaves.",
    "Sazona al gusto y sirve caliente."
    ]

  }
];


const listaRecetas = document.getElementById("listaRecetas");
let recetaSeleccionada = null;

function mostrarRecetas() {
  listaRecetas.innerHTML = "";

  recetasFresko.forEach((receta) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta-receta");

    tarjeta.innerHTML = `
      <div class="receta-imagen-contenedor">
        <img src="${receta.imagen}" alt="${receta.nombre}">

        <button
          type="button"
          class="receta-favorito"
          aria-label="Agregar ${receta.nombre} a favoritos"
        >♡</button>
      </div>

      <div class="receta-informacion">
        <h3>${receta.nombre}</h3>
        <p>${receta.tiempo} · ${receta.dificultad}</p>
      </div>
    `;

    tarjeta.addEventListener("click", (evento) => {
    if (evento.target.closest(".receta-favorito")) {
        return;
    }
    recetaSeleccionada = receta;
    document.getElementById("vistaRecetas").hidden = true;
    document.getElementById("vistaDetalleReceta").hidden = false;

    document.getElementById("detalleRecetaImagen").src = receta.imagen;
    document.getElementById("detalleRecetaImagen").alt = receta.nombre;
    document.getElementById("detalleRecetaNombre").textContent = receta.nombre;
    document.getElementById("detalleRecetaTiempo").textContent =
        receta.tiempo + " · 2 porciones";

    
    const textoDetalle = document.getElementById("detalleRecetaTexto");
    const botonIngredientes = document.getElementById("pestanaIngredientes");
    const botonPreparacion = document.getElementById("pestanaPreparacion");

    function mostrarIngredientes() {
    textoDetalle.innerHTML = receta.ingredientes
        .map(ingrediente => `<p>• ${ingrediente}</p>`)
        .join("");

    botonIngredientes.classList.add("activo");
    botonPreparacion.classList.remove("activo");
    }

    function mostrarPreparacion() {
    textoDetalle.innerHTML = (receta.pasos || [])
        .map((paso, indice) => `<p>${indice + 1}. ${paso}</p>`)
        .join("") || "<p>Próximamente agregaremos los pasos de esta receta.</p>";

    botonPreparacion.classList.add("activo");
    botonIngredientes.classList.remove("activo");
    }

    botonIngredientes.onclick = mostrarIngredientes;
    botonPreparacion.onclick = mostrarPreparacion;

    mostrarIngredientes();

    });

    listaRecetas.appendChild(tarjeta);
  });
}

mostrarRecetas();

/* BUSCADOR DE RECETAS */

const buscarReceta = document.getElementById("buscarReceta");


buscarReceta.addEventListener("input", () => {
  aplicarFiltroRecetas();
});



/* FILTROS DE RECETAS */

const filtrosRecetas = document.querySelectorAll(".filtro-receta");

let filtroRecetasActual = "mis-alimentos";

function aplicarFiltroRecetas() {
  const alimentosGuardados = JSON.parse(
    localStorage.getItem(obtenerClaveAlimentos()) || "[]"
  );

  const nombresAlimentos = alimentosGuardados.map((alimento) =>
    alimento.nombre.toLowerCase().trim()
  );

  document.querySelectorAll(".tarjeta-receta").forEach((tarjeta, indice) => {
    const receta = recetasFresko[indice];

    const tieneIngredientes = receta.ingredientes.some((ingrediente) =>
      nombresAlimentos.some((nombre) => nombre.includes(ingrediente))
    );

    const coincideBusqueda = receta.nombre
      .toLowerCase()
      .includes(buscarReceta.value.toLowerCase().trim());

    tarjeta.hidden = !coincideBusqueda ||
      (filtroRecetasActual === "mis-alimentos" && !tieneIngredientes);
  });
}

filtrosRecetas.forEach((boton, indice) => {
  boton.addEventListener("click", () => {
    filtrosRecetas.forEach((filtro) => {
      filtro.classList.remove("activo");
    });

    boton.classList.add("activo");

    filtroRecetasActual = indice === 0
      ? "mis-alimentos"
      : "todas";

    aplicarFiltroRecetas();
  });
});


/* FAVORITOS DE RECETAS */

function obtenerClaveFavoritos() {
  const correo = localStorage.getItem("fresko_sesion_actual");
  return correo
    ? `fresko_recetas_favoritas_${correo}`
    : "fresko_recetas_favoritas";
}

let recetasFavoritas = [];

function cargarFavoritosUsuario() {
  const clave = obtenerClaveFavoritos();

  // Conservar los favoritos antiguos para la cuenta de Oriana
  const correo = localStorage.getItem("fresko_sesion_actual");

  if (
    correo === "orianamasielm@gmail.com" &&
    localStorage.getItem(clave) === null &&
    localStorage.getItem("fresko_recetas_favoritas") !== null
  ) {
    localStorage.setItem(
      clave,
      localStorage.getItem("fresko_recetas_favoritas")
    );
  }

  recetasFavoritas = JSON.parse(
    localStorage.getItem(clave) || "[]"
  );

  actualizarCorazonesVisuales();
}

function actualizarCorazones() {
  document.querySelectorAll(".tarjeta-receta").forEach((tarjeta, indice) => {
    const boton = tarjeta.querySelector(".receta-favorito");
    const receta = recetasFresko[indice];
    const esFavorita = recetasFavoritas.includes(receta.id);

    boton.textContent = esFavorita ? "♥" : "♡";
    boton.classList.toggle("seleccionado", esFavorita);
    boton.setAttribute(
      "aria-label",
      esFavorita
        ? `Quitar ${receta.nombre} de favoritos`
        : `Agregar ${receta.nombre} a favoritos`
    );

    boton.addEventListener("click", (evento) => {
      evento.stopPropagation();

      if (recetasFavoritas.includes(receta.id)) {
        recetasFavoritas = recetasFavoritas.filter(id => id !== receta.id);
      } else {
        recetasFavoritas.push(receta.id);
      }

      localStorage.setItem(
        obtenerClaveFavoritos(),
        JSON.stringify(recetasFavoritas)
    );

      actualizarCorazonesVisuales();
    });
  });
}

function actualizarCorazonesVisuales() {
  document.querySelectorAll(".tarjeta-receta").forEach((tarjeta, indice) => {
    const boton = tarjeta.querySelector(".receta-favorito");
    const esFavorita = recetasFavoritas.includes(recetasFresko[indice].id);

    boton.textContent = esFavorita ? "♥" : "♡";
    boton.classList.toggle("seleccionado", esFavorita);
  });
}

actualizarCorazones();


/* VOLVER DEL DETALLE A LAS RECETAS */

document.getElementById("volverRecetas").addEventListener("click", () => {
  document.getElementById("vistaDetalleReceta").hidden = true;
  document.getElementById("vistaRecetas").hidden = false;
});

/* ABRIR Y CERRAR PLANIFICADOR SEMANAL */

const vistaDetalleReceta = document.getElementById("vistaDetalleReceta");
const vistaPlanificador = document.getElementById("vistaPlanificador");

document.getElementById("agregarRecetaPlanificador").addEventListener("click", () => {
  vistaDetalleReceta.hidden = true;
  vistaPlanificador.hidden = false;
});

document.getElementById("volverDetalleReceta").addEventListener("click", () => {
  vistaPlanificador.hidden = true;
  vistaDetalleReceta.hidden = false;
});

/* DÍAS DEL PLANIFICADOR SEMANAL */

const diasPlanificador = document.getElementById("diasPlanificador");
const rangoSemana = document.getElementById("rangoSemana");

let fechaSemana = new Date();
/* RECETAS GUARDADAS EN EL PLANIFICADOR */

function obtenerClavePlanificador() {
  const correo = localStorage.getItem("fresko_sesion_actual");
  return correo ? `fresko_planificador_${correo}` : "fresko_planificador";
}

let recetasPlanificadas = {};

function cargarPlanificadorUsuario() {
  const clave = obtenerClavePlanificador();

  // Conservar los datos anteriores en la cuenta de Oriana
  if (
    !localStorage.getItem(clave) &&
    localStorage.getItem("fresko_planificador") &&
    localStorage.getItem("fresko_sesion_actual")?.toLowerCase().includes("oriana")
  ) {
    localStorage.setItem(
      clave,
      localStorage.getItem("fresko_planificador")
    );
  }

  recetasPlanificadas = JSON.parse(
    localStorage.getItem(clave) || "{}"
  );

  mostrarPlanificador();
}

function guardarPlanificador() {
  console.log("Usuario activo:", localStorage.getItem("fresko_sesion_actual"));
  console.log("Clave del planificador:", obtenerClavePlanificador());

  localStorage.setItem(
    obtenerClavePlanificador(),
    JSON.stringify(recetasPlanificadas)
  );
}

function mostrarPlanificador() {
  diasPlanificador.innerHTML = "";

  const lunes = new Date(fechaSemana);
  const diaActual = lunes.getDay();
  lunes.setDate(lunes.getDate() - ((diaActual + 6) % 7));

  const domingo = new Date(lunes);
  domingo.setDate(lunes.getDate() + 6);

  const formatoFecha = { day: "2-digit", month: "short" };

  rangoSemana.textContent =
    `${lunes.toLocaleDateString("es-PE", formatoFecha)} - ${domingo.toLocaleDateString("es-PE", formatoFecha)}`;

  const nombresDias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  nombresDias.forEach((nombre, indice) => {
    const fecha = new Date(lunes);
    fecha.setDate(lunes.getDate() + indice);

    const fila = document.createElement("div");
    fila.classList.add("dia-planificador");

    fila.innerHTML = `
      <div class="dia-planificador-fecha">
        <strong>${nombre}</strong>
        <span>${fecha.getDate()}</span>
      </div>

      <button type="button" class="agregar-receta-dia">
        + Agregar receta
      </button>
    `;

    /* AGREGAR RECETA A UN DÍA */

    const botonAgregar = fila.querySelector(".agregar-receta-dia");

    botonAgregar.addEventListener("click", () => {
    
    let recetaElegida = recetaSeleccionada;

    if (!recetaElegida) {
    const opciones = recetasFresko
        .map((receta) => `${receta.id}. ${receta.nombre}`)
        .join("\n");

    const seleccion = prompt(
        "¿Qué receta deseas agregar?\n\n" + opciones
    );

    if (seleccion === null) return;

    recetaElegida = recetasFresko.find(
        (receta) => receta.id === Number(seleccion.trim())
    );
    }


    if (!recetaElegida) {
        alert("Selecciona un número válido del 1 al 4.");
        return;
    }

    const claveFecha =
        fecha.getFullYear() + "-" +
        String(fecha.getMonth() + 1).padStart(2, "0") + "-" +
        String(fecha.getDate()).padStart(2, "0");

    recetasPlanificadas[claveFecha] = recetaElegida.id;

    guardarPlanificador();
    recetaSeleccionada = null;
    mostrarPlanificador();
    });

    /* MOSTRAR RECETA ASIGNADA AL DÍA */

    const claveDia =
    fecha.getFullYear() + "-" +
    String(fecha.getMonth() + 1).padStart(2, "0") + "-" +
    String(fecha.getDate()).padStart(2, "0");

    const idRecetaGuardada = recetasPlanificadas[claveDia];

    const recetaGuardada = recetasFresko.find(
    (receta) => receta.id === idRecetaGuardada
    );

    if (recetaGuardada) {
    const contenidoReceta = document.createElement("div");
    contenidoReceta.classList.add("receta-planificada");

    contenidoReceta.innerHTML = `
        <img src="${recetaGuardada.imagen}" alt="${recetaGuardada.nombre}">
        <div>
        <strong>${recetaGuardada.nombre}</strong>
        <p>Almuerzo</p>
        </div>
    `;

    fila.insertBefore(contenidoReceta, botonAgregar);
    botonAgregar.textContent = "Cambiar receta";

    const botonEliminar = document.createElement("button");
    botonEliminar.type = "button";
    botonEliminar.classList.add("eliminar-receta-planificada");
    botonEliminar.textContent = "Eliminar";

    botonEliminar.addEventListener("click", () => {
    const confirmar = confirm(
        "¿Deseas quitar esta receta del planificador?"
    );

    if (!confirmar) return;

    delete recetasPlanificadas[claveDia];
    guardarPlanificador();
    mostrarPlanificador();
    });

    fila.appendChild(botonEliminar);

    }

    diasPlanificador.appendChild(fila);
  });
}

document.getElementById("semanaAnterior").addEventListener("click", () => {
  fechaSemana.setDate(fechaSemana.getDate() - 7);
  mostrarPlanificador();
});

document.getElementById("semanaSiguiente").addEventListener("click", () => {
  fechaSemana.setDate(fechaSemana.getDate() + 7);
  mostrarPlanificador();
});

mostrarPlanificador();

/* NAVEGACIÓN DE PREFERENCIAS ALIMENTARIAS */

const vistaPerfil = document.getElementById("vistaPerfil");
const vistaPreferencias = document.getElementById("vistaPreferencias");

document.getElementById("perfilPreferencias").addEventListener("click", () => {
  vistaPerfil.hidden = true;
  vistaPreferencias.hidden = false;
});

document.getElementById("volverPerfil").addEventListener("click", () => {
  vistaPreferencias.hidden = true;
  vistaPerfil.hidden = false;
});

// Obtener la clave de preferencias del usuario actual
function obtenerClavePreferencias() {
  const correo = localStorage.getItem("fresko_sesion_actual");

  if (!correo) {
    return "fresko_preferencias";
  }

  return "fresko_preferencias_" + correo;
}

// Conservar las preferencias antiguas en la cuenta de Oriana
const usuarioPreferencias = JSON.parse(
  localStorage.getItem("fresko_usuario") || "{}"
);

const clavePreferenciasActual = obtenerClavePreferencias();

if (
  localStorage.getItem("fresko_sesion_actual") &&
  usuarioPreferencias.nombre?.trim().toLowerCase().startsWith("oriana") &&
  localStorage.getItem(clavePreferenciasActual) === null &&
  localStorage.getItem("fresko_preferencias") !== null
) {
  localStorage.setItem(
    clavePreferenciasActual,
    localStorage.getItem("fresko_preferencias")
  );
}

const preferenciasGuardadas = JSON.parse(
  localStorage.getItem(obtenerClavePreferencias()) || "[]"
);

const casillasPreferencias = formPreferencias.querySelectorAll(
  'input[type="checkbox"]'
);
function cargarPreferenciasUsuario() {
  const preferencias = JSON.parse(
    localStorage.getItem(obtenerClavePreferencias()) || "[]"
  );

  casillasPreferencias.forEach((casilla) => {
    casilla.checked = preferencias.includes(casilla.value);
  });
}
/* EVITAR PREFERENCIAS CONTRADICTORIAS */

casillasPreferencias.forEach((casilla) => {
  casilla.addEventListener("change", () => {
    if (casilla.value === "Sin restricciones" && casilla.checked) {
      casillasPreferencias.forEach((otra) => {
        if (otra !== casilla) otra.checked = false;
      });
    }

    if (casilla.value !== "Sin restricciones" && casilla.checked) {
      const sinRestricciones = formPreferencias.querySelector(
        'input[value="Sin restricciones"]'
      );

      sinRestricciones.checked = false;
    }
  });
});

// Recuperar las preferencias guardadas
casillasPreferencias.forEach((casilla) => {
  casilla.checked = preferenciasGuardadas.includes(casilla.value);
});

// Guardar las preferencias seleccionadas
formPreferencias.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const seleccionadas = Array.from(casillasPreferencias)
    .filter((casilla) => casilla.checked)
    .map((casilla) => casilla.value);

  localStorage.setItem(
  obtenerClavePreferencias(),
  JSON.stringify(seleccionadas)
);

  alert("Tus preferencias alimentarias se guardaron correctamente.");
});
// MOSTRAR LOS DATOS DEL USUARIO EN PERFIL
function actualizarDatosPerfil() {
  const usuarioGuardado = localStorage.getItem("fresko_usuario");

  if (usuarioGuardado) {
    const usuario = JSON.parse(usuarioGuardado);

    document.getElementById("perfilNombre").textContent = usuario.nombre;
    document.getElementById("perfilCorreo").textContent = usuario.correo;

    // Mostrar la inicial del nombre en el avatar
    document.querySelector(".perfil-avatar").textContent =
      usuario.nombre.charAt(0).toUpperCase();
  }
}

// Cargar los datos al abrir FresKo
actualizarDatosPerfil();
// NAVEGACIÓN DE INFORMACIÓN PERSONAL
const vistaInformacion = document.getElementById("vistaInformacion");

// Abrir Información personal
document.getElementById("perfilInformacion").addEventListener("click", () => {
  vistaPerfil.hidden = true;
  vistaPreferencias.hidden = true;
  vistaInformacion.hidden = false;

  // Recuperar los datos del usuario registrado
  const usuarioGuardado = localStorage.getItem("fresko_usuario");

  if (usuarioGuardado) {
    const usuario = JSON.parse(usuarioGuardado);

    document.getElementById("editarNombre").value = usuario.nombre;
    document.getElementById("editarCorreo").value = usuario.correo;
  }
});

// Volver a la pantalla principal de Perfil
document.getElementById("volverPerfilInformacion").addEventListener("click", () => {
  vistaInformacion.hidden = true;
  vistaPerfil.hidden = false;
});
// GUARDAR CAMBIOS DE INFORMACIÓN PERSONAL
document.getElementById("formInformacion").addEventListener("submit", (e) => {
  e.preventDefault();

  // Obtener los datos actualizados
  const nombre = document.getElementById("editarNombre").value.trim();
  const correo = document.getElementById("editarCorreo").value.trim();

  if (!nombre || !correo) {
    alert("Completa todos los campos.");
    return;
  }

  // Guardar los nuevos datos
  const usuario = {
    nombre: nombre,
    correo: correo
  };

  localStorage.setItem("fresko_usuario", JSON.stringify(usuario));

  // Actualizar los datos visibles en Perfil
  actualizarDatosPerfil();

  alert("¡Información personal actualizada correctamente!");
});

// NAVEGACIÓN DE NOTIFICACIONES
const vistaNotificaciones = document.getElementById("vistaNotificaciones");

// Abrir Notificaciones
document.getElementById("perfilNotificaciones").addEventListener("click", () => {
  vistaPerfil.hidden = true;
  vistaInformacion.hidden = true;
  vistaPreferencias.hidden = true;
  vistaNotificaciones.hidden = false;
});

// Volver a Perfil
document.getElementById("volverPerfilNotificaciones").addEventListener("click", () => {
  vistaNotificaciones.hidden = true;
  vistaPerfil.hidden = false;
});
// GUARDAR Y RECUPERAR PREFERENCIAS DE NOTIFICACIONES
// Obtener la clave de notificaciones del usuario actual
function obtenerClaveNotificaciones() {
  const correo = localStorage.getItem("fresko_sesion_actual");

  if (!correo) {
    return "fresko_notificaciones";
  }

  return "fresko_notificaciones_" + correo;
}

// Conservar las notificaciones antiguas 
const usuarioNotificaciones = JSON.parse(
  localStorage.getItem("fresko_usuario") || "{}"
);

const claveNotificacionesActual = obtenerClaveNotificaciones();

if (
  localStorage.getItem("fresko_sesion_actual") &&
  usuarioNotificaciones.nombre?.trim().toLowerCase().startsWith("oriana") &&
  localStorage.getItem(claveNotificacionesActual) === null &&
  localStorage.getItem("fresko_notificaciones") !== null
) {
  localStorage.setItem(
    claveNotificacionesActual,
    localStorage.getItem("fresko_notificaciones")
  );
}
const formNotificaciones = document.getElementById("formNotificaciones");

const opcionesNotificaciones = [
  "notifVencimiento",
  "notifCompras",
  "notifRecetas"
];

// Cargar las notificaciones del usuario actual
function cargarNotificacionesUsuario() {
  const notificacionesGuardadas = JSON.parse(
    localStorage.getItem(obtenerClaveNotificaciones()) || "null"
  );

  opcionesNotificaciones.forEach((id) => {
    document.getElementById(id).checked =
      notificacionesGuardadas?.[id] ?? true;
  });
}

// Cargar las notificaciones al abrir FresKo
cargarNotificacionesUsuario();
cargarPlanificadorUsuario();

// Guardar las preferencias seleccionadas
formNotificaciones.addEventListener("submit", (e) => {
  e.preventDefault();

  const preferencias = {};

  opcionesNotificaciones.forEach((id) => {
    preferencias[id] = document.getElementById(id).checked;
  });

  localStorage.setItem(
  obtenerClaveNotificaciones(),
  JSON.stringify(preferencias)
);

  alert("¡Preferencias de notificaciones guardadas correctamente!");
});
// NAVEGACIÓN DE CONFIGURACIÓN
const vistaConfiguracion = document.getElementById("vistaConfiguracion");

// Abrir Configuración
document.getElementById("perfilConfiguracion").addEventListener("click", () => {
  vistaPerfil.hidden = true;
  vistaInformacion.hidden = true;
  vistaPreferencias.hidden = true;
  vistaNotificaciones.hidden = true;
  vistaConfiguracion.hidden = false;
});

// Volver a Perfil
document.getElementById("volverPerfilConfiguracion").addEventListener("click", () => {
  vistaConfiguracion.hidden = true;
  vistaPerfil.hidden = false;
});

  // CONFIGURACIÓN DEL MODO OSCURO
const configModoOscuro = document.getElementById("configModoOscuro");

// Recuperar la preferencia guardada
const modoOscuroGuardado =
  localStorage.getItem("fresko_modo_oscuro") === "true";

configModoOscuro.checked = modoOscuroGuardado;
document.body.classList.toggle("modo-oscuro", modoOscuroGuardado);

// Activar o desactivar el modo oscuro
configModoOscuro.addEventListener("change", () => {
  const activado = configModoOscuro.checked;

  document.body.classList.toggle("modo-oscuro", activado);

  localStorage.setItem("fresko_modo_oscuro", activado);
});

// NAVEGACIÓN DE AYUDA Y SOPORTE
const vistaAyuda = document.getElementById("vistaAyuda");

// Abrir Ayuda y soporte
document.getElementById("perfilAyuda").addEventListener("click", () => {
  vistaPerfil.hidden = true;
  vistaInformacion.hidden = true;
  vistaPreferencias.hidden = true;
  vistaNotificaciones.hidden = true;
  vistaConfiguracion.hidden = true;
  vistaAyuda.hidden = false;
});

// Volver a Perfil
document.getElementById("volverPerfilAyuda").addEventListener("click", () => {
  vistaAyuda.hidden = true;
  vistaPerfil.hidden = false;
});
// ICONOS SUPERIORES DE FRESKO

// Campana: abrir Alertas
document.getElementById("iconoNotificaciones").addEventListener("click", () => {
  botonesMenu[2].click();
});

// Usuario: abrir Perfil
document.getElementById("iconoPerfil").addEventListener("click", () => {
  botonesMenu[5].click();
});
