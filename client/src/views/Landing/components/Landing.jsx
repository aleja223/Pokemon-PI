import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={`${styles.container} ${styles.background}`}>
      <h1 className={styles.title}>Bienvenido a mi PI-Pokemon</h1>
      <p className={styles.subtitle}>
        Creado y Diseñado por{" "}
        <span className={styles.link}>Alejandra León</span>
      </p>
      <div className={styles["button-container"]}>
        <Link to="/Home" className={styles.button}>
          Entrar
        </Link>
      </div>
    </div>
  );
};

export default Landing;
