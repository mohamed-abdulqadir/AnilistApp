import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/Footer.module.css";
import { SearchContext } from "../search";

const SeasonalFooter = () => {
  const navigate = useNavigate();
  const search = useContext(SearchContext);
  return (
    <footer className={styles.footer}>
      <div className={styles.menu}>
        <div className={styles.navigation}>
          <a href={`/`}>
            <div className={styles.link}>
              <i class="fa-solid fa-house"></i>
              <span>Home</span>
            </div>
          </a>
        </div>

        <div className={styles.navigation}>
          <a href={`/winter`}>
            <div className={styles.link}>
              <i class="fa-solid fa-snowflake"></i>
              <span>Winter</span>
            </div>
          </a>
        </div>

        <div className={styles.navigation}>
          <a href={`/summer`}>
            <div className={styles.link}>
              <i class="fa-solid fa-sun"></i>
              <span>Summer</span>
            </div>
          </a>
        </div>

        <div className={styles.navigation}>
          <a href={`/spring`}>
            <div className={styles.link}>
              <i class="fa-brands fa-pagelines"></i>
              <span>Spring</span>
            </div>
          </a>
        </div>

        <div className={styles.navigation}>
          <a href={`/fall`}>
            <div className={styles.link}>
              <i class="fa-solid fa-tree"></i>
              <span>Fall</span>
            </div>
          </a>
        </div>
      </div>
      <br />
    </footer>
  );
};

export default SeasonalFooter;
