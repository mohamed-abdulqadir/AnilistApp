import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/Footer.module.css";
import { SearchContext } from "../search";

const Footer = () => {
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
          <a href={`/animelist`}>
            <div className={styles.link}>
              <i class="fa-solid fa-tv"></i>
              <span>Anime List</span>
            </div>
          </a>
        </div>
        <div className={styles.navigation}>
          <a href={`/mangalist`}>
            <div className={styles.link}>
              <i class="fa-solid fa-book"></i>
              <span>Manga List</span>
            </div>
          </a>
        </div>
        <div className={styles.navigation}>
          <a href={`/profile`}>
            <div className={styles.link}>
              <i className="fa-solid fa-user"></i>
              <span>Profile</span>
            </div>
          </a>
        </div>
        <div className={styles.navigation}>
          <a
            href="/"
            onClick={() => {
              search.removeToken();
            }}
          >
            <div className={styles.link}>
              <i
                class={`fa-solid fa-right-from-bracket ${styles.icons}`}
                style={{ color: "tomato" }}
              ></i>
              Log Out
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

export default Footer;
