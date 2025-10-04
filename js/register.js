const formRegister = document.getElementById("form-register");
const mensaje = document.getElementById("mensaje");

formRegister.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;

  // Guardar comprador en localStorage
  const comprador = { nombre, email };
  localStorage.setItem("compradorRegistrado", JSON.stringify(comprador));

  mensaje.textContent = "Registro exitoso. ¡Tienes un 10% de descuento!";
  mensaje.style.color = "green";

  // Redirigir a la tienda automáticamente después de 1.5s
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
});