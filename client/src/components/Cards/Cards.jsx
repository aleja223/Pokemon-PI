import Card from "../Card/Card.jsx";
import styles from "./Cards.module.css";
import { useSelector } from "react-redux";
import Paginado from "../Paginado/Paginado.jsx";
import { useState } from "react";

export default function Cards() {
  const pokemons = useSelector((state) => state.pokemons) ?? [];

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentpokemons = Array.isArray(pokemons)
    ? pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)
    : [];

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className={styles.cards}>
        {Array.isArray(currentpokemons) && currentpokemons.length > 0 ? (
          currentpokemons.map(
            (
              {
                id,
                name,
                vida,
                ataque,
                defensa,
                velocidad,
                altura,
                peso,
                tipos,
                isDB,
                imagen,
              },
              index
            ) => (
              <Card
                key={`pokemon-${id}-${index}`}
                id={id}
                name={name}
                vida={vida}
                ataque={ataque}
                defensa={defensa}
                velocidad={velocidad}
                altura={altura}
                peso={peso}
                tipos={tipos}
                imagen={imagen}
                isDB={isDB}
              />
            )
          )
        ) : (
          <p>No hay pokemons disponibles.</p>
        )}
      </div>
      <div>
        <div className={styles.center}>
          <Paginado
            className="paginado"
            pokemonsPerPage={pokemonsPerPage}
            totalPokemons={pokemons.length}
            paginado={paginado}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}
