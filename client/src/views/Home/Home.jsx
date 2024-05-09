import styles from "./Home.module.css";
import Cards from "../../components/Cards/Cards";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes } from "../../redux/actions";
import {
  SearchBar,
  Filter,
  Sorter,
  FilterDB,
} from "../../components/Components";

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  const pokemons = useSelector((state) => state.pokemons);
  const currentName = useSelector((state) => state.name);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getPokemons());
      dispatch(getTypes());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (currentName) {
      const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(currentName.toLowerCase())
      );
      setSearchResults(filteredPokemons);
    } else {
      setSearchResults([]);
    }
  }, [currentName, pokemons]);

  return (
    <>
      <div>
        <div className={styles.container}>
          <div className={styles.sorter}>
            <Sorter />
          </div>
          <div className={styles.filter}>
            <div className={styles.filterdb}>
              <FilterDB />
            </div>
            <div className={styles.filtertipos}>
              <Filter />
            </div>
          </div>
          <div className={styles.search}>
            <SearchBar />
          </div>
        </div>
        {loading ? (
          <div className={styles.loading}>
            <img
              className={styles.loadinggif}
              src="https://pa1.narvii.com/6350/341bed1d228bbf0314be2b1ab4a59ababbac3e2e_hq.gif"
              alt=""
            />
            <h1 className={styles.textogif}>Cargando...!</h1>
          </div>
        ) : (
          <div className={styles.fondo}>
            <div className={styles.acomodo}>
              <Cards pokemons={currentName ? searchResults : pokemons} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
