// ----------------------
// Productos de la tienda con URLs de imagen en internet
// ----------------------
const productos = [
  // Computadoras y Laptops
  { id: 1, nombre: "Laptop HP", precio: 650, imagen: "https://via.placeholder.com/250x200?text=Laptop+HP", codigo: "P001", seccion: "laptops" },
  { id: 2, nombre: "Laptop Dell", precio: 700, imagen: "https://via.placeholder.com/250x200?text=Laptop+Dell", codigo: "P011", seccion: "laptops" },
  { id: 3, nombre: "PC Gamer", precio: 1200, imagen: "https://via.placeholder.com/250x200?text=PC+Gamer", codigo: "P012", seccion: "laptops" },
  { id: 4, nombre: "Laptop Lenovo", precio: 600, imagen: "https://via.placeholder.com/250x200?text=Laptop+Lenovo", codigo: "P010", seccion: "laptops" },
  { id: 5, nombre: "Laptop ASUS", precio: 750, imagen: "https://via.placeholder.com/250x200?text=Laptop+ASUS", codigo: "P013", seccion: "laptops" },

  // Celulares y Tablets
  { id: 6, nombre: "Smartphone Samsung", precio: 450, imagen: "https://via.placeholder.com/250x200?text=Samsung", codigo: "P002", seccion: "celulares" },
  { id: 7, nombre: "Smartphone iPhone", precio: 950, imagen: "https://via.placeholder.com/250x200?text=iPhone", codigo: "P014", seccion: "celulares" },
  { id: 8, nombre: "Tablet Lenovo", precio: 300, imagen: "https://via.placeholder.com/250x200?text=Tablet+Lenovo", codigo: "P015", seccion: "celulares" },
  { id: 9, nombre: "Tablet Samsung", precio: 350, imagen: "https://via.placeholder.com/250x200?text=Tablet+Samsung", codigo: "P016", seccion: "celulares" },
  { id: 10, nombre: "Smartphone Xiaomi", precio: 400, imagen: "https://via.placeholder.com/250x200?text=Xiaomi", codigo: "P004", seccion: "celulares" },

  // Accesorios
  { id: 11, nombre: "Auriculares Bluetooth", precio: 80, imagen: "https://via.placeholder.com/250x200?text=Auriculares+BT", codigo: "P003", seccion: "accesorios" },
  { id: 12, nombre: "Teclado Mecánico", precio: 60, imagen: "https://via.placeholder.com/250x200?text=Teclado+Mecanico", codigo: "P005", seccion: "accesorios" },
  { id: 13, nombre: "Mouse Gamer", precio: 40, imagen: "https://via.placeholder.com/250x200?text=Mouse+Gamer", codigo: "P006", seccion: "accesorios" },
  { id: 14, nombre: "Audífonos Gamer", precio: 90, imagen: "https://via.placeholder.com/250x200?text=Audifonos+Gamer", codigo: "P017", seccion: "accesorios" },
  { id: 15, nombre: "Cargador USB-C", precio: 25, imagen: "https://via.placeholder.com/250x200?text=Cargador+USB-C", codigo: "P018", seccion: "accesorios" },

  // Gaming
  { id: 16, nombre: "Monitor LG 24''", precio: 200, imagen: "https://via.placeholder.com/250x200?text=Monitor+LG", codigo: "P007", seccion: "gaming" },
  { id: 17, nombre: "Mouse Gaming Razer", precio: 70, imagen: "https://via.placeholder.com/250x200?text=Mouse+Razer", codigo: "P019", seccion: "gaming" },
  { id: 18, nombre: "Teclado RGB", precio: 100, imagen: "https://via.placeholder.com/250x200?text=Teclado+RGB", codigo: "P020", seccion: "gaming" },
  { id: 19, nombre: "Silla Gamer", precio: 250, imagen: "https://via.placeholder.com/250x200?text=Silla+Gamer", codigo: "P021", seccion: "gaming" },
  { id: 20, nombre: "Auriculares Gamer", precio: 120, imagen: "https://via.placeholder.com/250x200?text=Auriculares+Gamer", codigo: "P022", seccion: "gaming" },

  // Oficina y Hogar
  { id: 21, nombre: "Impresora Canon", precio: 150, imagen: "https://via.placeholder.com/250x200?text=Impresora+Canon", codigo: "P008", seccion: "oficina" },
  { id: 22, nombre: "Cámara Web HD", precio: 70, imagen: "https://via.placeholder.com/250x200?text=Camara+Web", codigo: "P009", seccion: "oficina" },
  { id: 23, nombre: "Monitor HP 27''", precio: 220, imagen: "https://via.placeholder.com/250x200?text=Monitor+HP", codigo: "P023", seccion: "oficina" },
  { id: 24, nombre: "Router WiFi", precio: 60, imagen: "https://via.placeholder.com/250x200?text=Router+WiFi", codigo: "P024", seccion: "oficina" },
  { id: 25, nombre: "Proyector Mini", precio: 180, imagen: "https://via.placeholder.com/250x200?text=Proyector+Mini", codigo: "P025", seccion: "oficina" }
];

// ----------------------
// Variables del carrito
// ----------------------
let carrito = [];
let descuento = 0;

// ----------------------
// Mostrar productos por sección
// ----------------------
const secciones = ["laptops","celulares","accesorios","gaming","oficina"];

secciones.forEach(seccion => {
  const contenedor = document.getElementById(`productos-${seccion}`);
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
// Funciones de carrito
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
