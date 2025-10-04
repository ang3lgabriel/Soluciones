// ----------------------
// Productos de la tienda
// ----------------------
const productos = [
  { id: 1, nombre: "Laptop HP", precio: 650, imagen: "img/producto1.jpeg", codigo: "P001" },
  { id: 2, nombre: "Smartphone Samsung", precio: 450, imagen: "img/producto2.jpg", codigo: "P002" },
  { id: 3, nombre: "Auriculares Bluetooth", precio: 80, imagen: "img/producto3.jpeg", codigo: "P003" },
  { id: 4, nombre: "Smartwatch Xiaomi", precio: 120, imagen: "img/producto4.jpeg", codigo: "P004" },
  { id: 5, nombre: "Teclado Mecánico", precio: 60, imagen: "img/producto5.jpg", codigo: "P005" },
  { id: 6, nombre: "Mouse Gamer", precio: 40, imagen: "img/producto6.jpg", codigo: "P006" },
  { id: 7, nombre: "Monitor LG 24''", precio: 200, imagen: "img/producto7.jpeg", codigo: "P007" },
  { id: 8, nombre: "Impresora Canon", precio: 150, imagen: "img/producto8.jpeg", codigo: "P008" },
  { id: 9, nombre: "Cámara Web HD", precio: 70, imagen: "img/producto9.jpeg", codigo: "P009" },
  { id: 10, nombre: "Tablet Lenovo", precio: 300, imagen: "img/producto10.jpg", codigo: "P010" }
];

// ----------------------
// Variables del carrito
// ----------------------
let carrito = [];
let descuento = 0;

// ----------------------
// Mostrar productos
// ----------------------
const listaProductos = document.getElementById("lista-productos");
productos.forEach(prod => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <img src="${prod.imagen}" alt="${prod.nombre}">
    <h3>${prod.nombre}</h3>
    <p><strong>Código:</strong> ${prod.codigo}</p>
    <p><strong>Precio:</strong> $${prod.precio}</p>
    <button onclick="agregarCarrito(${prod.id})">Agregar al carrito</button>
  `;
  listaProductos.appendChild(card);
});

// ----------------------
// Agregar al carrito
// ----------------------
function agregarCarrito(id) {
  const prod = productos.find(p => p.id === id);
  carrito.push(prod);
  actualizarCarrito();
}

// ----------------------
// Actualizar carrito
// ----------------------
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

  // Verificar si el comprador está registrado
  const registrado = localStorage.getItem("compradorRegistrado");
  if (registrado) {
    descuento = subtotal * 0.1; // 10% de descuento
  } else {
    descuento = 0;
  }

  const total = subtotal - descuento;

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("descuento").textContent = descuento.toFixed(2);
  document.getElementById("total").textContent = total.toFixed(2);
}

// ----------------------
// Eliminar del carrito
// ----------------------
function eliminarItem(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// ----------------------
// Generar ticket
// ----------------------
document.getElementById("btn-ticket").addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

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