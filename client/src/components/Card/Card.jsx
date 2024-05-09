import { useState } from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card({
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
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const capitalized =
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  return (
    <Link to={`/detail/${id}`} className={styles.cardLink}>
      <div className={styles.cardContainer}>
        <div
          className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}>
          <div className={styles.front} style={{ pointerEvents: "none" }}>
            <div className={styles.imageContainer}>
              <img
                src={imagen}
                alt={imagen}
                className={imageLoaded ? styles.imageLoaded : styles.image}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            <h2 className={styles.name}>{capitalized}</h2>
            <div className={styles.types}>
              {Array.isArray(tipos) &&
                tipos.map((tipo) => (
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
                <span className={styles.statValue}>{vida}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statName}>Ataque:</span>
                <span className={styles.statValue}>{ataque}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statName}>Defensa:</span>
                <span className={styles.statValue}>{defensa}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statName}>Velocidad:</span>
                <span className={styles.statValue}>{velocidad}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statName}>Altura:</span>
                <span className={styles.statValue}>{altura}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statName}>Peso:</span>
                <span className={styles.statValue}>{peso}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
