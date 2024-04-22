document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".formulario-contact")
  const enviarButton = document.getElementById("enviar-button")

  // Event listener for the form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault(); 

    const nombre = document.getElementById("Nombre").value
    const email = document.getElementById("Email").value
    const telefono = document.getElementById("Telefono").value
    const asunto = document.getElementById("Asunto").value
    const mensaje = document.getElementById("Mensaje").value

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    let formIsValid = true

    if (nombre.length < 4 || nombre.length > 15) {
      alert("Nombre debe tener entre 4 y 15 caracteres.")
      formIsValid = false
    }

    // Validate the 'email' field
    if (!email.match(emailRegex)) {
      alert("Email no es válido.")
      formIsValid = false;
    }

    // Validate the 'telefono' field
    if (telefono.length !== 10 || isNaN(telefono)) {
      alert("Teléfono debe tener exactamente 10 dígitos numéricos.")
      formIsValid = false
    }

    // Validate the 'asunto' field
    if (asunto.length < 5 || asunto.length > 20) {
      alert("Asunto debe tener entre 5 y 20 caracteres.")
      formIsValid = false;
    }

    // Validate the 'mensaje' field
    if (mensaje.length < 5 || mensaje.length > 200) {
      alert("Mensaje debe tener entre 5 y 200 caracteres.")
      formIsValid = false
    }

    if (formIsValid) {
      alert("El mensaje ha sido enviado con éxito.")
      form.reset()
    } else {
      alert("No se puede enviar el formulario debido a errores.")
    }
  });

  enviarButton.disabled = true

  form.addEventListener("input", function () {
    const nombre = document.getElementById("Nombre").value
    const email = document.getElementById("Email").value
    const telefono = document.getElementById("Telefono").value
    const asunto = document.getElementById("Asunto").value
    const mensaje = document.getElementById("Mensaje").value

    const formIsValid =
      nombre.length >= 4 &&
      nombre.length <= 15 &&
      email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) &&
      telefono.length === 10 &&
      !isNaN(telefono) &&
      asunto.length >= 5 &&
      asunto.length <= 20 &&
      mensaje.length >= 5 &&
      mensaje.length <= 200;

    enviarButton.disabled = !formIsValid
  })
})