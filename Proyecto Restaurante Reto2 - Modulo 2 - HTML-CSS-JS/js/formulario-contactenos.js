const formulario = document.getElementById("formulario_contactenos");
const inputs = document.querySelectorAll("#formulario_contactenos input");
const selects = document.querySelectorAll("#formulario_contactenos select");
const textareas = document.querySelectorAll("#formulario_contactenos textarea");
const terminos = document.getElementById("terminos");

const expresiones = {
  asunto: /^[a-zA-ZÀ-ÿ\s\.\,\!\¡\¿\?]+$/,
  nombreCompleto: /^[a-zA-ZÀ-ÿ\s]{10,35}$/,
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{1,20}$/,
  mensaje: /^.{10,200}$/,
};

const campos = {
  servicio: false,
  asunto: false,
  nombreCompleto: false,
  correo: false,
  mensaje: false,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "servicio":
      validarSelect(e.target, e.target.name, "error");
      break;
    case "asunto":
      validarCampoVacio(expresiones.asunto, e);
      break;
    case "nombreCompleto":
      validarCampoVacio(expresiones.nombreCompleto, e);
      break;
    case "correo":
      validarCampoVacio(expresiones.correo, e);
      break;
    case "mensaje":
      validarCampoVacio(expresiones.mensaje, e);
      break;

    default:
      break;
  }
};

const validarCampoVacio = (expresion, e) => {
  const inputName = e.target.name;
  if (e.target.value == "") {
    document
      .querySelector(`#grupo__${inputName} .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
    validarCampo(expresion, e.target, inputName, "error1");
  } else {
    document
      .querySelector(`#grupo__${inputName} .formulario__input-error1`)
      .classList.remove("formulario__input-error1-activo");
    validarCampo(expresion, e.target, inputName, "error");
  }
};

const validarCampo = (expresion, input, campo, error) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-correcto");

    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-times-circle");

    document
      .querySelector(`#grupo__${campo} .formulario__input-${error}`)
      .classList.remove(`formulario__input-${error}-activo`);

    campos[campo] = true;
  } else {
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#grupo__${campo} .formulario__input-${error}`)
      .classList.add(`formulario__input-${error}-activo`);
    campos[campo] = false;
  }
};

const validarSelect = (input, campo, error) => {
  if (input.value != "") {
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-correcto");

    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-times-circle");

    document
      .querySelector(`#grupo__${campo} .formulario__input-${error}`)
      .classList.remove(`formulario__input-${error}-activo`);
    campos[campo] = true;
  } else {
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#grupo__${campo} .formulario__input-${error}`)
      .classList.add(`formulario__input-${error}-activo`);
    campos[campo] = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

selects.forEach((select) => {
  select.addEventListener("blur", validarFormulario);
});

textareas.forEach((textarea) => {
  textarea.addEventListener("keyup", validarFormulario);
  textarea.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    campos.servicio &&
    campos.asunto &&
    campos.nombreCompleto &&
    campos.correo &&
    campos.mensaje &&
    terminos.checked
  ) {
    formulario.reset();
    document
      .getElementById("formulario__mensaje-exito")
      .classList.add("formulario__mensaje-exito-activo");
    setTimeout(() => {
      document
        .getElementById("formulario__mensaje-exito")
        .classList.remove("formulario__mensaje-exito-activo");
    }, 1500);

    document
      .querySelectorAll(".formulario__grupo-correcto")
      .forEach((icono) => {
        icono.classList.remove("formulario__grupo-correcto");
      });
  } else {
    document
      .getElementById("formulario__mensaje")
      .classList.add("formulario__mensaje-activo");
    setTimeout(() => {
      document
        .getElementById("formulario__mensaje")
        .classList.remove("formulario__mensaje-activo");
    }, 1500);
  }
});
