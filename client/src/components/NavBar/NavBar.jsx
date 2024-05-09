import styles from "./NavBar.module.css";
import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "./logo.png";

function NavBar() {
  return (
    <nav>
      <ul className={styles.navlist}>
        <Link to="/" className={styles.landing}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </Link>
        <div className={styles.div}>
          <div className={styles.home}>
            <li>
              <NavLink to="/home" activeClassName={styles.active}>
                Home
              </NavLink>
            </li>
          </div>
          <li className={styles.form}>
            <NavLink to="/forms" activeClassName={styles.active}>
              Form
            </NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
