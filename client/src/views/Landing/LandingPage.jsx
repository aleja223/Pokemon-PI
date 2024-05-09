import styles from "./Fondo.module.css";
import Landing from "./components/Landing.jsx";

const LandingPage = () => {
  return (
    <div className={styles.landing}>
      <Landing></Landing>
    </div>
  );
};

export default LandingPage;
