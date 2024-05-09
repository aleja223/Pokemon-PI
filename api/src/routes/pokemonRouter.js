const { Router } = require("express");
const {
  getPokemonHandler,
  getIdPokemonHandler,
  getNameHandler,
  postPokemonHandler,
} = require("../handlers/pokemonHandler");

const pokemonRouter = Router();

pokemonRouter.get("/:idPokemon", getIdPokemonHandler);
pokemonRouter.get("/:name", getNameHandler);
pokemonRouter.get("/", getPokemonHandler);
pokemonRouter.post("/", postPokemonHandler);

module.exports = pokemonRouter;
