import { filterByCreated } from "../../redux/actions";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import styles from "./Filter.module.css";

const FilterDB = () => {
  const dispatch = useDispatch();
  const [isDB, setIsDB] = useState("");

  useEffect(() => {
    if (isDB !== "") {
      dispatch(filterByCreated(isDB));
    }
  }, [isDB, dispatch]);

  const handleOrigenChange = (event) => {
    setIsDB(event.target.value === "true");
  };

  return (
    <div>
      <h3 className={styles.texto}>FILTRAR POR DB:</h3>
      <div>
        <label className={styles.texto1}>
          <input
            type="radio"
            name="origen"
            value="false"
            checked={isDB === false}
            onChange={handleOrigenChange}
          />
          API
        </label>
        <label className={styles.texto2}>
          <input
            type="radio"
            name="origen"
            value="true"
            checked={isDB === true}
            onChange={handleOrigenChange}
          />
          Database
        </label>
      </div>
    </div>
  );
};

export default FilterDB;
