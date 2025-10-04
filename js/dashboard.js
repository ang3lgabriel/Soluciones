// ----------------------
// Datos simulados o cargados desde localStorage
// ----------------------
let empleados = JSON.parse(localStorage.getItem("empleados")) || [
  { nombre: "Juan", puesto: "vendedor", password: "1234", ventas: 5, nuevosEmpleados: 1, calidad: "Alta" },
  { nombre: "Admin", puesto: "admin", password: "admin123" }
];

let compradores = JSON.parse(localStorage.getItem("compradores")) || [
  { nombre: "Carlos", email: "carlos@email.com" },
  { nombre: "Maria", email: "maria@email.com" }
];

let productos = JSON.parse(localStorage.getItem("productos")) || [
  { id: 1, nombre: "Laptop HP", precio: 650, codigo: "P001" },
  { id: 2, nombre: "Smartphone Samsung", precio: 450, codigo: "P002" },
  { id: 3, nombre: "Auriculares Bluetooth", precio: 80, codigo: "P003" }
];

// Guardar en localStorage al inicio
localStorage.setItem("empleados", JSON.stringify(empleados));
localStorage.setItem("compradores", JSON.stringify(compradores));
localStorage.setItem("productos", JSON.stringify(productos));

// ----------------------
// Empleado activo
// ----------------------
const empActivo = JSON.parse(sessionStorage.getItem("empleadoActivo"));
const infoEmpleado = document.getElementById("info-empleado");
const adminSection = document.getElementById("admin-section");

// Mostrar info del empleado
if(empActivo){
  let html = `
    <div class="card">
      <h3>Nombre:</h3><p>${empActivo.nombre}</p>
    </div>
    <div class="card">
      <h3>Puesto:</h3><p>${empActivo.puesto}</p>
    </div>
  `;
  if(empActivo.puesto !== "admin"){
    const empData = empleados.find(e => e.nombre === empActivo.nombre);
    html += `
      <div class="card">
        <h3>Ventas del mes:</h3><p>${empData.ventas}</p>
      </div>
      <div class="card">
        <h3>Nuevos empleados registrados:</h3><p>${empData.nuevosEmpleados || 0}</p>
      </div>
      <div class="card">
        <h3>Calidad:</h3><p>${empData.calidad}</p>
      </div>
    `;
  } else {
    adminSection.style.display = "block";
  }
  infoEmpleado.innerHTML = html;
}

// ----------------------
// Funciones para crear tablas editables
// ----------------------
function crearTabla(datos, contenedorId, tipo) {
  const cont = document.getElementById(contenedorId);
  cont.innerHTML = ""; // Limpiar contenido previo
  const table = document.createElement("table");
  table.classList.add("editable-table");

  // Cabecera
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");
  Object.keys(datos[0]).forEach(key => {
    const th = document.createElement("th");
    th.textContent = key;
    trHead.appendChild(th);
  });
  const thAccion = document.createElement("th");
  thAccion.textContent = "Acción";
  trHead.appendChild(thAccion);
  thead.appendChild(trHead);
  table.appendChild(thead);

  // Cuerpo
  const tbody = document.createElement("tbody");
  datos.forEach((item, index) => {
    const tr = document.createElement("tr");
    Object.values(item).forEach(val => {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.value = val;
      td.appendChild(input);
      tr.appendChild(td);
    });

    // Botón de eliminar
    const tdAccion = document.createElement("td");
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = () => {
      datos.splice(index, 1);
      guardarDatos(tipo);
      crearTabla(datos, contenedorId, tipo);
    };
    tdAccion.appendChild(btnEliminar);
    tr.appendChild(tdAccion);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  cont.appendChild(table);

  // Guardar cambios al salir del input
  table.querySelectorAll("input").forEach((input, idx) => {
    input.addEventListener("change", () => {
      const fila = Math.floor(idx / Object.keys(datos[0]).length);
      const col = idx % Object.keys(datos[0]).length;
      const key = Object.keys(datos[0])[col];
      datos[fila][key] = input.value;
      guardarDatos(tipo);
    });
  });
}

// ----------------------
// Guardar datos en localStorage
// ----------------------
function guardarDatos(tipo) {
  if(tipo === "empleados") localStorage.setItem("empleados", JSON.stringify(empleados));
  if(tipo === "compradores") localStorage.setItem("compradores", JSON.stringify(compradores));
  if(tipo === "productos") localStorage.setItem("productos", JSON.stringify(productos));
}

// ----------------------
// Funciones de edición admin
// ----------------------
function editarEmpleados() {
  crearTabla(empleados, "admin-section", "empleados");
}
function editarCompradores() {
  crearTabla(compradores, "admin-section", "compradores");
}
function editarProductos() {
  crearTabla(productos, "admin-section", "productos");
}

// ----------------------
// Cerrar sesión
// ----------------------
function cerrarSesion() {
  sessionStorage.removeItem("empleadoActivo");
}