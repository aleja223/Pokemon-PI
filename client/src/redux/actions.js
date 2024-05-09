import axios from "axios";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const GET_ID = "GET_ID";
export const GET_NAME = "GET_NAME";
export const POST_POKEMON = "POST_POKEMON";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATAQUE = "ORDER_BY_ATAQUE";

export function getPokemons() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/pokemons/");
      dispatch({
        type: GET_POKEMONS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al obtener pokemons:", error);
    }
  };
}

export function getTypes() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/types/");
      console.log(response.data);
      dispatch({
        type: GET_TYPES,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al obtener types:", error);
    }
  };
}

export function getID(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/pokemons/${id}`);
      dispatch({
        type: GET_ID,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al obtener pokemon por id:", error);
    }
  };
}

export function getName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/pokemons/${name}`
      );
      dispatch({
        type: GET_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al obtener pokemon por nombre:", error);
    }
  };
}

export function postPokemon(pokemonData) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3001/pokemons/",
        JSON.stringify(pokemonData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      dispatch({
        type: POST_POKEMON,
        payload: response.data,
      });
      console.log(pokemonData);
    } catch (error) {
      console.error("Error para obtener pokemon:", error.response.data.message);
      console.log(error.message);
    }
  };
}

export const filterByType = (selectedTypes) => {
  return {
    type: FILTER_BY_TYPE,
    payload: selectedTypes,
    //filterFunction: (pokemons) => {
    //console.log("pokemons", pokemons);
    //const filteredPokemons = selectedTypes.every((selectedType) => {
    // return pokemons.tipos.includes(selectedType);
    // });
    //console.log("filteredPokemons", filteredPokemons);
    //return filteredPokemons;
    // },
  };
};

export function filterByCreated(isDB) {
  return {
    type: FILTER_BY_CREATED,
    payload: isDB,
  };
}

export function sortByName(payload) {
  console.log(payload);
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function sortByAtaque(payload) {
  console.log(payload);
  return {
    type: ORDER_BY_ATAQUE,
    payload,
  };
}
