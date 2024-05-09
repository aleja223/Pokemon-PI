import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getID } from "../../redux/actions";
import styles from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemonsID);

  useEffect(() => {
    dispatch(getID(id));
  }, [dispatch, id]);

  if (Object.keys(pokemon).length === 0) {
    return <div>Cargando...</div>;
  }
  if (pokemon.error) {
    return <div>Error al obtener los datos del pokemon.</div>;
  }

  return (
    <div className={styles.pokemondetail}>
      <div className={styles.container}>
        <div className={styles.div1}>
          <h1>Id: {pokemon.id}</h1>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.imagen} alt={pokemon.name} />
        </div>
        <div className={styles.div2}>
          <p>HP: {pokemon.vida}</p>
          <p>Attack: {pokemon.ataque}</p>
          <p>Defense: {pokemon.defensa}</p>
          <p>Speed: {pokemon.velocidad}</p>
          <p>Height: {pokemon.altura}</p>
          <p>Weight: {pokemon.peso}</p>
          <div className={styles.types}>
            {pokemon.tipos &&
              Array.isArray(pokemon.tipos) &&
              pokemon.tipos.map((tipo) => (
                <span key={tipo} className={styles.tipo}>
                  {tipo}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
