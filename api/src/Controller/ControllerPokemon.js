const axios = require("axios");
const { Pokemon, Types } = require("../db");
const clearData = require("./clearData");
const { Op } = require("sequelize");

const getAllPokemon = async () => {
  const databasepokemon = await Pokemon.findAll();
  const apiPokemonRaw = (
    await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0.")
  ).data.results;
  const apiPokemonCleaned = await Promise.all(
    apiPokemonRaw.map(async (p) => {
      const apiPokemonData = (await axios.get(p.url)).data;
      return clearData(apiPokemonData);
    })
  );
  const allPokemon = [...databasepokemon, ...apiPokemonCleaned];

  const ordePokemon = allPokemon.sort((a, b) => a.id - b.id);

  return ordePokemon;
};

const getName = async (name) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );
    const data = response.data;
    const cleanedPokemon = clearData(data);
    return [cleanedPokemon];
  } catch (error) {
    const pokemonFromDb = await Pokemon.findOne({ where: { name: name } });
    if (pokemonFromDb) {
      return [pokemonFromDb];
    } else {
      return [{ message: `No se encontró Pokémon con el nombre ${name}` }];
    }
  }
};

const getIdPokemon = async (id) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    const pokemonFromDb = await Pokemon.findByPk(id);

    if (pokemonFromDb) {
      const data = response.data;
      const cleanedPokemon = clearData(data);
      cleanedPokemon.id = id;

      const types = await Types.findAll({
        where: { nameTy: { [Op.in]: cleanedPokemon.tipos } },
      });

      if (types.length === 0) {
        throw new Error("El Pokémon por ID no existe");
      }

      const createdPokemon = Object.assign({}, cleanedPokemon);
      createdPokemon.tipos = types.map((type) => type.nameTy);

      return createdPokemon;
    } else {
      const data = response.data;
      const cleanedPokemon = clearData(data);
      cleanedPokemon.id = id;

      const createdPokemon = await Pokemon.create(cleanedPokemon);

      const pokeTypes = await Types.findAll({
        where: { nameTy: cleanedPokemon.tipos },
      });

      if (pokeTypes.length === 0) {
        throw new Error("El tipo de Pokémon no existe");
      }

      await createdPokemon.setTypes(pokeTypes);

      return [createdPokemon];
    }
  } catch (error) {
    console.error("Error en getIdPokemon:", error);
    throw error;
  }
};

const createPokemon = async (
  id,
  name,
  imagen,
  vida,
  ataque,
  defensa,
  velocidad,
  altura,
  peso,
  tipos
) =>
  await Pokemon.create({
    id: Math.floor(Math.random() * 10000),
    name,
    imagen,
    vida,
    ataque,
    defensa,
    velocidad,
    altura,
    peso,
    tipos,
    isDB: true,
  });
//console.log(Pokemon.tipos);

module.exports = {
  getAllPokemon,
  getName,
  getIdPokemon,
  createPokemon,
};
