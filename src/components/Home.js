import { useContext } from "react";
import styles from "./css/HomeTwo.module.css";
import { SearchContext } from "../search";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const search = useContext(SearchContext);
  return (
    <div>
      <nav className={styles.header}>
        <ul>
          <div className={styles.logo}>
            <a href="/">
              <img src={process.env.PUBLIC_URL + "/logo.png"} alt="AniList" />
            </a>
          </div>
          <div className={styles.links}>
            <a href="/spring">
              SEASONAL ANIME <span> {"   "}</span>
              <img
                src={process.env.PUBLIC_URL + "/seasonal.png"}
                style={{
                  width: "18px",
                  height: "18px",
                  marginBottom: "4px",
                  marginLeft: "7px",
                }}
                alt=""
              />{" "}
            </a>
          </div>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              search.setSubmitted(true);
              navigate("/search");
            }}
          >
            <input
              type="text"
              className={styles.searchClick}
              name=""
              placeholder="search here..."
              onChange={(e) => {
                search.setInput(e.target.value);
              }}
            />
            <i
              className={`fa-solid fa-magnifying-glass ${styles.searchIcon} fa-lg`}
            ></i>
          </form>
          <div id="login">
            <button className={styles.button}>
              <a
                href={`https://anilist.co/api/v2/oauth/authorize?client_id=9494&response_type=token`}
              >
                LOGIN
              </a>
            </button>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
