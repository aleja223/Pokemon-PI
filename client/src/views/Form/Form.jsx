import styles from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes } from "../../redux/actions";
import React, { useEffect, useState, useRef } from "react";
import validate from "./validacion";

const Form = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const formRef = useRef(null);

  const [input, setInput] = useState({
    name: "",
    imagen: "",
    vida: 0,
    ataque: 0,
    defensa: 0,
    velocidad: 0,
    altura: 0,
    peso: 0,
    tipos: [],
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate(input);

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    const {
      name,
      imagen,
      vida,
      ataque,
      defensa,
      velocidad,
      altura,
      peso,
      tipos,
    } = input;
    const pokemonData = {
      name,
      imagen,
      vida,
      ataque,
      defensa,
      velocidad,
      altura,
      peso,
      tipos: tipos,
    };
    dispatch(postPokemon(pokemonData));
    console.log(pokemonData);

    formRef.current.reset();
    setInput({
      name: "",
      imagen: "",
      vida: 0,
      ataque: 0,
      defensa: 0,
      velocidad: 0,
      altura: 0,
      peso: 0,
      tipos: [],
    });
  };

  const handleTypeChange = (event) => {
    const selectedType = Array.from(
      document.querySelectorAll("input[name=type]:checked")
    ).map((input) => input.value);

    if (!input.name.trim()) {
      alert("Ingrese un nombre válido");
      return;
    }
    if (selectedType.length >= 2) {
      document
        .querySelectorAll("input[name=type]:not(:checked)")
        .forEach((input) => {
          input.disabled = true;
        });
    } else {
      document
        .querySelectorAll("input[name=type]:not(:checked)")
        .forEach((input) => {
          input.disabled = false;
        });
    }

    setInput({
      ...input,
      tipos: selectedType,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <>
      <div className={styles.newpokemoncontainer}>
        <form
          id="new-pokemon-form"
          ref={formRef}
          className={styles.newpokemonform}
          onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre:</label>
          <input
            value={input.name}
            type="text"
            id="name"
            name="name"
            required
            onChange={handleInputChange}
          />
          <label htmlFor="imagen">Imagen:</label>
          <input
            value={input.imagen}
            type="url"
            id="imagen"
            name="imagen"
            required
            onChange={handleInputChange}
          />
          <label htmlFor="vida">Vida:</label>
          <input
            value={input.vida}
            type="number"
            id="vida"
            name="vida"
            min="0"
            max="100"
            required
            onChange={handleInputChange}
          />
          <label htmlFor="ataque">Ataque:</label>
          <input
            value={input.ataque}
            type="number"
            id="ataque"
            name="ataque"
            min="0"
            max="100"
            required
            onChange={handleInputChange}
          />
          <label htmlFor="defensa">Defensa:</label>
          <input
            value={input.defensa}
            type="number"
            id="defensa"
            name="defensa"
            min="0"
            max="100"
            required
            onChange={handleInputChange}
          />
          <label htmlFor="velocidad">Velocidad:</label>
          <input
            value={input.velocidad === null ? "" : input.velocidad}
            type="number"
            id="velocidad"
            name="velocidad"
            min="0"
            max="100"
            onChange={handleInputChange}
          />
          <label htmlFor="altura">Altura:</label>
          <input
            value={input.altura}
            type="number"
            id="altura"
            name="altura"
            min="0"
            max="10"
            onChange={handleInputChange}
          />
          <label htmlFor="peso">Peso:</label>
          <input
            value={input.peso}
            type="number"
            id="peso"
            name="peso"
            min="0"
            max="1000"
            onChange={handleInputChange}
          />
          <label htmlFor="type">Tipo(s):</label>
          <div className={styles.checktipes}>
            {Array.isArray(types) &&
              types.map((type, index) => (
                <label key={index} className={styles.tipo}>
                  <input
                    type="checkbox"
                    name="type"
                    value={type.id}
                    checked={input.tipos.includes(type.id)}
                    onChange={handleTypeChange}
                  />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
          </div>
          <div className={styles.errors}>
            {Object.keys(errors).map((field) => (
              <div key={field} className={styles.error}>
                {errors[field]}
              </div>
            ))}
          </div>
          <button type="submit" id="submit-button">
            Crear Pokemon
          </button>
        </form>

        <div className={styles.card}>
          <div className={styles.front}>
            <div className={styles.imageContainer}>
              <img
                src={input.imagen}
                alt={input.imagen}
                className={styles.image}
              />
            </div>
            <h2 className={styles.name}>{input.name}</h2>
            <div className={styles.types}>
              {input.tipos.map((tipo) => (
                <span key={tipo} className={styles.tipo}>
                  {tipo}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.back}>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statName}>Vida:</span>
                <span className={styles.statValue}>{input.vida}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statName}>Ataque:</span>
                <span className={styles.statValue}>{input.ataque}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statName}>Defensa:</span>
                <span className={styles.statValue}>{input.defensa}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statName}>Velocidad:</span>
                <span className={styles.statValue}>{input.velocidad}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statName}>Altura:</span>
                <span className={styles.statValue}>{input.altura}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statName}>Peso:</span>
                <span className={styles.statValue}>{input.peso}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
