// Empleados de ejemplo (puedes añadir más)
let empleados = [
  { nombre: "Juan", puesto: "vendedor", password: "1234" },
  { nombre: "Admin", puesto: "admin", password: "admin123" }
];

// Formulario
const formLogin = document.getElementById("form-login");
const mensaje = document.getElementById("mensaje");

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const puesto = document.getElementById("puesto").value;
  const password = document.getElementById("password").value;

  const emp = empleados.find(e => e.nombre === nombre && e.puesto === puesto && e.password === password);

  if (emp) {
    // Guardar empleado activo en sessionStorage
    sessionStorage.setItem("empleadoActivo", JSON.stringify(emp));
    mensaje.textContent = "¡Bienvenido, " + emp.nombre + "!";
    mensaje.style.color = "green";

    // Redirigir al dashboard
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  } else {
    mensaje.textContent = "Credenciales incorrectas";
    mensaje.style.color = "red";
  }
});