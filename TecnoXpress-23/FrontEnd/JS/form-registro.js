const formularioRegistro = document.querySelector(".formulario-registro");
const nombre = document.querySelector('input[name="nombre"]');
const apellido = document.querySelector('input[name="apellido"]');
const DNI = document.querySelector('input[name="DNI"]');
const fechaNacimiento = document.querySelector(
  'input[name="fecha_de_nacimiento"]'
);
const celular = document.querySelector('input[name="celular"]');
const email = document.querySelector('input[name="email"]');
const contraseña = document.querySelector('input[name="contraseña"]');
const confirmarContraseña = document.querySelector(
  'input[name="confirmar_contraseña'
);

formularioRegistro.addEventListener("submit", (event) => {
  event.preventDefault();
  validaCamposRegistro();
});

DNI.addEventListener("input", function () {
  if (this.value.length > 8) {
    this.value = this.value.slice(0, 8);
  }
});

// Validación de celular
celular.addEventListener("input", function () {
  if (this.value.length > 10) {
    this.value = this.value.slice(0, 10);
  }
});

function validaCamposRegistro() {
  const nombreValor = nombre.value.trim();
  const apellidoValor = apellido.value.trim();
  const DNIValor = DNI.value.trim();
  const fechaNacimientoValor = fechaNacimiento.value;
  const celularValor = celular.value.trim();
  const emailValor = email.value.trim();
  const contraseñaValor = contraseña.value;
  const confirmarContraseñaValor = confirmarContraseña.value;

  const nombreError = document.getElementById("nombreError");
  const apellidoError = document.getElementById("apellidoError");
  const dniError = document.getElementById("dniError");
  const celularError = document.getElementById("celularError");
  const emailError = document.getElementById("emailError");
  const contraseñaError = document.getElementById("contraseñaError");
  const confirmarContraseñaError = document.getElementById(
    "confirmarContraseñaError"
  );

  nombreError.style.display = "none";
  apellidoError.style.display = "none";
  dniError.style.display = "none";
  celularError.style.display = "none";
  emailError.style.display = "none";
  contraseñaError.style.display = "none";
  confirmarContraseñaError.style.display = "none";

  if (nombreValor.length < 4 || nombreValor.length > 15) {
    nombreError.style.display = "block";
    return;
  }

  if (apellidoValor.length < 4 || apellidoValor.length > 15) {
    apellidoError.style.display = "block";
    return;
  }

  if (DNIValor.length !== 8) {
    dniError.style.display = "block";
    return;
  }

  if (!fechaNacimientoValor) {
    alert("Debe seleccionar una Fecha de Nacimiento.");
    return;
  }

  if (celularValor.length !== 10 || !/^\d{10}$/.test(celularValor)) {
    celularError.style.display = "block";
    return;
  }

  if (!/^[\w\.-]+@[\w\.-]+\.\w+$/.test(emailValor)) {
    emailError.style.display = "block";
    return;
  }

  if (contraseñaValor.length < 4) {
    contraseñaError.style.display = "block";
    return;
  }

  if (contraseñaValor !== confirmarContraseñaValor) {
    confirmarContraseñaError.style.display = "block";
    return;
  }

  window.location.href = "index.html";
}
