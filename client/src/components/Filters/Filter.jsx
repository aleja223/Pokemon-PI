import React, { useEffect, useState } from "react";
import { filterByType } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Filter.module.css";

const Filter = () => {
  const dispatch = useDispatch();
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [prevSelectedTypes, setPrevSelectedTypes] = useState([]);
  const types = useSelector((state) => state.types);

  useEffect(() => {
    if (JSON.stringify(selectedTypes) !== JSON.stringify(prevSelectedTypes)) {
      dispatch(filterByType(selectedTypes));
      setPrevSelectedTypes(selectedTypes);
    }
  }, [selectedTypes, prevSelectedTypes, dispatch]);

  const handleTypeChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    const count = isChecked ? selectedCount + 1 : selectedCount - 1;

    if (count <= 2) {
      setSelectedCount(count);

      if (isChecked) {
        setSelectedTypes([...selectedTypes, value]);
      } else {
        setSelectedTypes(selectedTypes.filter((type) => type !== value));
      }
    } else {
      event.preventDefault();
    }
  };

  return (
    <div>
      <h3 className={styles.texto3}>FILTRAR POR TIPO:</h3>
      <div className={styles.tipos}>
        {Array.isArray(types) &&
          types.map((type) => (
            <label key={type.id} className={styles.checkboxes}>
              <input
                type="checkbox"
                name="type"
                value={type.name}
                checked={selectedTypes.includes(type.name)}
                onChange={handleTypeChange}
              />
              <span className={styles.checkboxText}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            </label>
          ))}
      </div>
    </div>
  );
};

export default Filter;
