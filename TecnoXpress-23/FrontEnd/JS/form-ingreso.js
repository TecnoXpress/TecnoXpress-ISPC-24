const formularioIngreso = document.querySelector(".formularioIngreso")
const usuario = document.querySelector('input[name="usuario"]')
const contraseña = document.querySelector('input[name="contraseña"]')

formularioIngreso.addEventListener("submit", (event) => {
  event.preventDefault();
  if (validaCamposIngreso()) {
    window.location.href = "./index.html"; 
  }
});

function validaCamposIngreso() {
  const usuarioValor = usuario.value.trim();
  const contraseñaValor = contraseña.value.trim();

  if (usuarioValor === "") {
    alert("El campo Usuario es obligatorio.");
    return;
  }

  if (contraseñaValor === "") {
    alert("El campo Contraseña es obligatorio.");
    return;
  }

  formularioIngreso.submit();
}
