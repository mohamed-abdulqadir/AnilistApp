import { React, useContext } from "react";
import "../Header.scss";
import styles from "./css/Home.module.css";
import { SearchContext } from "../search";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoggedInNav = ({ info }) => {
  const search = useContext(SearchContext);
  const navigate = useNavigate();

  return (
    <div>
      <nav className={styles.header}>
        <ul>
          <Link to="/">
            <div className={styles.logo}>
              <img src={process.env.PUBLIC_URL + "/logo.png"} alt="AniList" />
            </div>
          </Link>
          <div className={styles.links}>
            <Link to={`/`}>
              <div className={styles.link}>
                <i class="fa-solid fa-house"></i>
                <span>Home</span>
              </div>
            </Link>
            <a href={`/summer`}>
              <div className={styles.link}>
                <img
                  src={process.env.PUBLIC_URL + "/seasonal.png"}
                  alt="Seasonal"
                  style={{ width: "18px", height: "18px", marginBottom: "4px" }}
                />
                <span>Seasonal</span>
              </div>
            </a>
            <Link to={`/animelist`}>
              <div className={styles.link}>
                <i class="fa-solid fa-tv"></i>
                <span>Anime List</span>
              </div>
            </Link>
            <Link to={`/mangalist`}>
              <div className={styles.link}>
                <i class="fa-solid fa-book"></i>
                <span>Manga List</span>
              </div>
            </Link>
            {/* <Link to="#">
              <div className={styles.link}></div>
            </Link> */}

            <div className={styles.dropdownBrowse}>
              <div className={styles.dropbtn}>
                <i class="fa-solid fa-sort-down"></i>
                <span>Browse</span>
              </div>
              <div className={styles.browseContent}>
                <a href="/popularanime">
                  <span>Popular Anime</span>
                </a>
                <a href="/popularmanga">
                  <span>Popular Manga</span>
                </a>
                <a href="/popularmanhwa">
                  <span>Popular Manhwa</span>
                </a>
                <a href="/topanime">
                  <span>Top 100 Anime</span>
                </a>
                <a href="/topmanga">
                  <span>Top 100 Manga</span>
                </a>
              </div>
            </div>
          </div>
          <div className={styles.user}>
            {/* <div className={styles.search}> */}
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
            </form>
            {/* </div> */}
            <li className={styles.avatar}>
              <span>
                <i
                  className={`fa-solid fa-magnifying-glass ${styles.searchIcon} fa-lg`}
                ></i>
                <div className={styles.rightNav}>
                  <Link to="/profile">
                    <img src={info?.avatar?.large} alt="" />
                  </Link>
                  <div className={styles.dropdown}>
                    <div className={styles.dropbtn}>
                      <i className={`fa-solid fa-chevron-down fa-lg `}></i>
                    </div>
                    <div className={styles.dropdowncontent}>
                      <a href="/profile">
                        <span>
                          <i class={`fa-solid fa-user ${styles.icons}`}></i>{" "}
                          Profile
                        </span>
                      </a>
                      <a href="/notifications">
                        <span>
                          <i class={`fa-solid fa-bell ${styles.icons}`}></i>{" "}
                          Notifications
                        </span>
                      </a>

                      <a
                        href="/"
                        onClick={() => {
                          search.removeToken();
                        }}
                      >
                        <span>
                          <i
                            class={`fa-solid fa-right-from-bracket ${styles.icons}`}
                          ></i>
                          Log Out
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
                {info?.unreadNotificationCount > 0 && (
                  <div className={styles.notis}>
                    <a href="/notifications">{info?.unreadNotificationCount}</a>
                  </div>
                )}
              </span>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default LoggedInNav;
