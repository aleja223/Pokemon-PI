const axios = require("axios");
const { Types } = require("../db");
const { Sequelize } = require("sequelize");

const getTypes = async () => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/type");
    const types = response.data.results.map((tp) => {
      return { nameTy: tp.name };
    });

    for (const type of types) {
      // Buscar si el tipo ya existe en la base de datos
      const existingType = await Types.findOne({
        where: { nameTy: type.nameTy },
      });

      // Si el tipo no existe, realizar la inserción
      if (!existingType) {
        await Types.create(type);
      }
    }
    return;
  } catch (error) {
    console.error("Error al obtener tipos desde la API:", error.message);
    throw error;
  }
};

module.exports = {
  getTypes,
};
