import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getName, getPokemons } from "../../redux/actions";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  useEffect(() => {
    if (name) {
      dispatch(getName(name));
    } else {
      dispatch(getPokemons());
    }
  }, [name, dispatch]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (!/^\d+$/.test(inputValue)) {
      setName(inputValue);
    }
  };
  const pokemons = useSelector((state) => state.pokemons);

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(getName(name));
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSearch}>
      <input
        className={styles.input}
        type="text"
        value={name}
        onChange={handleInputChange}
        placeholder="Buscar Pokemon..."
      />
      {pokemons.length > 0 && (
        <div className={styles.result}>
          <h3>{pokemons[0].name}</h3>
          <img
            className={styles.image}
            src={pokemons[0].img}
            alt={pokemons[0].name}
          />
        </div>
      )}
    </form>
  );
};

export default SearchBar;
