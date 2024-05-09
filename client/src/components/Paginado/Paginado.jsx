import React from "react";
import styles from "./Paginado.module.css";

export default function Paginado({
  pokemonsPerPage,
  totalPokemons,
  paginado,
  currentPage,
}) {
  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);

  return (
    <div>
      <nav className={styles.navs}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <button
              className={styles.button}
              disabled={currentPage === 1}
              onClick={() => paginado(currentPage - 1)}>
              Prev
            </button>
          </li>
          <li>
            <span className={styles.span}>
              Page {currentPage} of {totalPages}
            </span>
          </li>
          <li>
            <button
              className={styles.button}
              disabled={currentPage === totalPages}
              onClick={() => paginado(currentPage + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
