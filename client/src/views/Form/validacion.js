const validate = (input) => {
  let errors = {};

  //  nombre
  if (!input.name.trim()) {
    errors.name = "Ingrese un nombre válido";
  }

  // imagen
  if (!input.imagen.trim()) {
    errors.imagen = "Ingrese una URL de imagen válida";
  }

  // campos numéricos (vida, ataque, defensa, velocidad, altura y peso)
  const campoNun = ["vida", "ataque", "defensa", "velocidad", "altura", "peso"];
  for (const field of campoNun) {
    if (isNaN(input[field]) || input[field] < 0 || input[field] > 1000) {
      errors[field] = "Ingrese un valor numérico válido (entre 0 y 1000)";
    }
  }

  // un tipo seleccionado
  if (input.tipos.length === 0) {
    errors.tipos = "Seleccione al menos un tipo";
  }

  return errors;
};

export default validate;
