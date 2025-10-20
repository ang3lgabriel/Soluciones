// ----------------------
// Productos de la tienda
// ----------------------
const productos = [
  // Computadoras y Laptops
  { id: 1, nombre: "Laptop HP", precio: 650, imagen: "img/producto1.jpeg", codigo: "P001", seccion: "laptops" },
  { id: 2, nombre: "Laptop Dell", precio: 700, imagen: "img/producto11.jpg", codigo: "P011", seccion: "laptops" },
  { id: 3, nombre: "PC Gamer", precio: 1200, imagen: "img/producto12.jpg", codigo: "P012", seccion: "laptops" },
  { id: 4, nombre: "Laptop Lenovo", precio: 600, imagen: "img/producto10.jpg", codigo: "P010", seccion: "laptops" },
  { id: 5, nombre: "Laptop ASUS", precio: 750, imagen: "img/producto13.jpg", codigo: "P013", seccion: "laptops" },

  // Celulares y Tablets
  { id: 6, nombre: "Smartphone Samsung", precio: 450, imagen: "img/producto2.jpg", codigo: "P002", seccion: "celulares" },
  { id: 7, nombre: "Smartphone iPhone", precio: 950, imagen: "img/producto14.jpg", codigo: "P014", seccion: "celulares" },
  { id: 8, nombre: "Tablet Lenovo", precio: 300, imagen: "img/producto15.jpg", codigo: "P015", seccion: "celulares" },
  { id: 9, nombre: "Tablet Samsung", precio: 350, imagen: "img/producto16.jpg", codigo: "P016", seccion: "celulares" },
  { id: 10, nombre: "Smartphone Xiaomi", precio: 400, imagen: "img/producto4.jpeg", codigo: "P004", seccion: "celulares" },

  // Accesorios (solo mouse y teclados)
  { id: 11, nombre: "Teclado Mecánico", precio: 60, imagen: "img/producto5.jpg", codigo: "P005", seccion: "accesorios" },
  { id: 12, nombre: "Mouse Gamer", precio: 40, imagen: "img/producto6.jpg", codigo: "P006", seccion: "accesorios" },
  { id: 13, nombre: "Mouse Básico", precio: 20, imagen: "img/producto17.jpg", codigo: "P017", seccion: "accesorios" },
  { id: 14, nombre: "Teclado USB", precio: 35, imagen: "img/producto18.jpg", codigo: "P018", seccion: "accesorios" },
  { id: 15, nombre: "Mouse Inalámbrico", precio: 50, imagen: "img/producto19.jpg", codigo: "P019", seccion: "accesorios" },

  // Monitores
  { id: 16, nombre: "Monitor LG 24''", precio: 200, imagen: "img/producto7.jpeg", codigo: "P007", seccion: "monitores" },
  { id: 17, nombre: "Monitor Samsung 27''", precio: 250, imagen: "img/producto20.jpg", codigo: "P020", seccion: "monitores" },
  { id: 18, nombre: "Monitor HP 27''", precio: 220, imagen: "img/producto23.jpg", codigo: "P023", seccion: "monitores" },
  { id: 19, nombre: "Monitor ASUS 24''", precio: 210, imagen: "img/producto21.jpg", codigo: "P021", seccion: "monitores" },
  { id: 20, nombre: "Monitor Acer 22''", precio: 180, imagen: "img/producto22.jpg", codigo: "P022", seccion: "monitores" },

  // Oficina (Impresoras y Escáneres)
  { id: 21, nombre: "Impresora Canon", precio: 150, imagen: "img/producto8.jpeg", codigo: "P008", seccion: "oficina" },
  { id: 22, nombre: "Cámara Web HD", precio: 70, imagen: "img/producto9.jpeg", codigo: "P009", seccion: "oficina" },
  { id: 23, nombre: "Impresora Epson", precio: 200, imagen: "img/producto24.jpg", codigo: "P024", seccion: "oficina" },
  { id: 24, nombre: "Escáner HP", precio: 100, imagen: "img/producto25.jpg", codigo: "P025", seccion: "oficina" },
  { id: 25, nombre: "Impresora HP", precio: 180, imagen: "img/producto26.jpg", codigo: "P026", seccion: "oficina" }
];

// ----------------------
// Variables del carrito
// ----------------------
let carrito = [];
let descuento = 0;

// ----------------------
// Mostrar productos por sección
// ----------------------
const secciones = ["laptops","celulares","accesorios","monitores","oficina"];

secciones.forEach(seccion => {
  const contenedor = document.getElementById(`productos-${seccion}`);
  if (!contenedor) return; // evita errores si no existe el div
  productos.filter(p => p.seccion === seccion).forEach(prod => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p><strong>Código:</strong> ${prod.codigo}</p>
      <p><strong>Precio:</strong> $${prod.precio}</p>
      <button onclick="agregarCarrito(${prod.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
  });
});

// ----------------------
// Funciones del carrito
// ----------------------
function agregarCarrito(id) {
  const prod = productos.find(p => p.id === id);
  carrito.push(prod);
  actualizarCarrito();
}

function actualizarCarrito() {
  const items = document.getElementById("items-carrito");
  items.innerHTML = "";
  let subtotal = 0;

  carrito.forEach((item, index) => {
    subtotal += item.precio;
    const div = document.createElement("div");
    div.innerHTML = `
      ${item.nombre} - $${item.precio}
      <button onclick="eliminarItem(${index})">❌</button>
    `;
    items.appendChild(div);
  });

  const registrado = localStorage.getItem("compradorRegistrado");
  descuento = registrado ? subtotal * 0.1 : 0;
  const total = subtotal - descuento;

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("descuento").textContent = descuento.toFixed(2);
  document.getElementById("total").textContent = total.toFixed(2);
}

function eliminarItem(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// ----------------------
// Generar ticket
// ----------------------
document.getElementById("btn-ticket").addEventListener("click", () => {
  if (carrito.length === 0) return alert("El carrito está vacío.");
  const ticketDiv = document.getElementById("ticket");
  ticketDiv.innerHTML = "<h4>Ticket de Compra</h4>";
  carrito.forEach(item => {
    const p = document.createElement("p");
    p.textContent = `${item.nombre} - $${item.precio}`;
    ticketDiv.appendChild(p);
  });
  const total = parseFloat(document.getElementById("total").textContent);
  const resumen = document.createElement("p");
  resumen.innerHTML = `<strong>Total a pagar:</strong> $${total.toFixed(2)}`;
  ticketDiv.appendChild(resumen);
});
