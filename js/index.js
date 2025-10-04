// ---------------- Productos ----------------
let productos = [
  { id: 1, nombre: "Laptop HP", precio: 650, codigo: "P001" },
  { id: 2, nombre: "Smartphone Samsung", precio: 450, codigo: "P002" },
  { id: 3, nombre: "Auriculares Bluetooth", precio: 80, codigo: "P003" },
  { id: 4, nombre: "Mouse inalámbrico", precio: 25, codigo: "P004" },
  { id: 5, nombre: "Teclado Mecánico", precio: 70, codigo: "P005" },
  { id: 6, nombre: "Monitor LG 24''", precio: 180, codigo: "P006" },
  { id: 7, nombre: "Tablet Lenovo", precio: 220, codigo: "P007" },
  { id: 8, nombre: "Impresora Epson", precio: 150, codigo: "P008" },
  { id: 9, nombre: "Disco Duro 1TB", precio: 60, codigo: "P009" },
  { id: 10, nombre: "Memoria USB 64GB", precio: 20, codigo: "P010" }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let ventasTotales = JSON.parse(localStorage.getItem("ventasTotales")) || 0;

// Mostrar ventas en index
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("ventas-totales").textContent = ventasTotales;
});

// Generar ticket
function generarTicket() {
  if(carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  ventasTotales += 1;
  localStorage.setItem("ventasTotales", JSON.stringify(ventasTotales));
  document.getElementById("ventas-totales").textContent = ventasTotales;

  alert("✅ Ticket generado. Puedes pagar en caja.");
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}
// ---------------- Ventas dinámicas ----------------
document.addEventListener("DOMContentLoaded", () => {
  animarVentas(ventasTotales);
});

function animarVentas(total) {
  const ventasElemento = document.getElementById("ventas-totales");
  let inicio = 0;
  const duracion = 1500; // 1.5 segundos
  const incremento = Math.ceil(total / (duracion / 30));

  const animacion = setInterval(() => {
    inicio += incremento;
    if (inicio >= total) {
      inicio = total;
      clearInterval(animacion);
    }
    ventasElemento.textContent = inicio;
  }, 30);
}