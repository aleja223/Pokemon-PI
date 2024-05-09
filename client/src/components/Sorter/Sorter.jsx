import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { sortByName, sortByAtaque } from "../../redux/actions";
import styles from "./Sorter.module.css";

export default function Sorter() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sortByName("asc"));
  }, [dispatch]);

  function handlerSort(e) {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
  }

  function handlerSort2(e) {
    e.preventDefault();
    dispatch(sortByAtaque(e.target.value));
  }

  return (
    <div>
      <select
        onChange={handlerSort}
        namety=" id="
        className={styles.sortSelect}>
        <option hidden>Ordenar Alfabeticamente:</option>
        <option value="asc" className={styles.sortOption}>
          A-Z
        </option>
        <option value="desc" className={styles.sortOption}>
          Z-A
        </option>
      </select>
      <select
        onChange={handlerSort2}
        namety="id="
        className={styles.sortSelect}>
        <option hidden> Ordenar Por Ataque:</option>
        <option value="ataquemin" className={styles.sortOption}>
          Ataque Max
        </option>
        <option value="ataquemax" className={styles.sortOption}>
          Ataque Min
        </option>
      </select>
    </div>
  );
}
