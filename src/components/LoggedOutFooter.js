import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/Footer.module.css";
import { SearchContext } from "../search";

const LoggedOutFooter = () => {
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
          <a href={`/fall`}>
            <div className={styles.link}>
              <img
                src={process.env.PUBLIC_URL + "/seasonal.png"}
                alt="Seasonal"
                style={{ width: "18px", height: "15px", marginBottom: "4px" }}
              />
              <span>Seasonal</span>
            </div>
          </a>
        </div>
        <div className={styles.navigation}>
          <a
            href={`https://anilist.co/api/v2/oauth/authorize?client_id=9494&response_type=token`}
          >
            <div className={styles.link}>
              <i class="fa-solid fa-right-to-bracket"></i>
              <span>Log In</span>
            </div>
          </a>
        </div>
      </div>
      <div className={styles.navigate}>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            search.setSubmitted(true);
            navigate("/search");
          }}
        >
          <i
            className={`fa-solid fa-magnifying-glass ${styles.searchIcon}`}
          ></i>
          <input
            type="text"
            className={styles.searchClick}
            name=""
            placeholder="search here..."
            onChange={(e) => {
              search.setInput(e.target.value);
            }}
          />
        </form>
      </div>
    </footer>
  );
};

export default LoggedOutFooter;
