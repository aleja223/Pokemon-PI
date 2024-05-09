const axios = require("axios");
const { Op } = require("sequelize");
const {
  getAllPokemon,
  getName,
  getIdPokemon,
  createPokemon,
} = require("../Controller/ControllerPokemon");

const { Pokemon, Types } = require("../db");

const getPokemonHandler = async (req, res) => {
  try {
    const pokemon = await getAllPokemon();
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getNameHandler = async (req, res) => {
  try {
    const { name } = req.query;

    const pokemon = await getName(name);

    if (pokemon && pokemon.length > 0) {
      res.status(200).json(pokemon);
    } else {
      res.status(404).json({
        message: `No se encontró ningún Pokémon con el nombre ${name}`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ocurrió un error al buscar el Pokémon" });
  }
};

const getIdPokemonHandler = async (req, res) => {
  const { idPokemon } = req.params;
  //console.log("ID recibido:", id);
  try {
    const pokemonApi = await getIdPokemon(idPokemon);

    if (!pokemonApi) {
      return res.status(404).send({ message: "Pokemon por ID no encontrado" });
    }

    return res.status(200).json(pokemonApi);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

const postPokemonHandler = async (req, res) => {
  try {
    const {
      name,
      imagen,
      vida,
      ataque,
      defensa,
      velocidad,
      altura,
      peso,
      nameType,
      isDB,
    } = req.body;
    if (
      !name ||
      !imagen ||
      !vida ||
      !ataque ||
      !defensa ||
      !velocidad ||
      !altura ||
      !peso ||
      !nameType
    ) {
      return res.status(400).json({ error: "Faltan datos" });
    }
    const nameExisting = await Pokemon.findOne({ where: { name: name } });
    if (nameExisting) {
      return res.status(400).json({ error: "pokemon existente" });
    }

    const pokemonCreate = await Pokemon.create({
      name,
      imagen,
      vida,
      ataque,
      defensa,
      velocidad,
      altura,
      peso,
    });
    const pokeTypes = await Types.findAll({ where: { nameTy: nameType } });
    if (pokeTypes.length === 0) {
      return res.status(400).json({ errror: "El tipo de Pokemon no existe" });
    }
    await pokemonCreate.setTypes(pokeTypes);
    return res.status(200).json({ message: "pokemon creado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getIdPokemonHandler,
  getPokemonHandler,
  getNameHandler,
  postPokemonHandler,
};
