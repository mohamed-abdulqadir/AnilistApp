import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../Header.scss";
import { SearchContext } from "../search";
const Header = () => {
  const [activePage, setActivePage] = useState("");

  // add click function to the sort
  const sortIcon = document.querySelector(".fa-sort");
  const sort = document.querySelector(".sort");
  document.addEventListener("click", (event) => {
    if (sortIcon == event.target) {
      sort.classList?.toggle("select-display");
    } else {
      sort.classList?.remove("select-display");
    }
  });

  // add click function to the search
  const searchInput = document.querySelector(".input");
  const searchIcon = document.querySelector(".fa-magnifying-glass");
  document.addEventListener("click", (event) => {
    searchIcon == event.target || searchInput == event.target
      ? searchInput.classList?.toggle("input-display")
      : searchInput.classList?.remove("input-display");
  });

  // change color for the selected sort
  const title = document.querySelector(".sort_title");
  const popularity = document.querySelector(".popularity");
  const score = document.querySelector(".score");
  const status = document.querySelector(".status");
  const start = document.querySelector(".start");
  const end = document.querySelector(".end");

  const clicked = document.querySelectorAll(".clicked");

  clicked.forEach((click) => {
    // console.log(click);
    click.addEventListener("click", () => {
      click === title
        ? title.classList?.add("blue")
        : title.classList?.remove("blue");
      click === popularity
        ? popularity.classList?.add("blue")
        : popularity.classList?.remove("blue");
      click === score
        ? score.classList?.add("blue")
        : score.classList?.remove("blue");
      click === status
        ? status.classList?.add("blue")
        : status.classList?.remove("blue");
      click === start
        ? start.classList?.add("blue")
        : start.classList?.remove("blue");
      click === end
        ? end.classList?.add("blue")
        : end.classList?.remove("blue");
    });
  });

  const handleClick = () => {
    window.addEventListener("click", () => {
      setActivePage(window.location.href);
    });
  };

  const search = useContext(SearchContext);
  return (
    <nav className="navbar">
      <div className="wrap">
        <a href="/">
          <img src={process.env.PUBLIC_URL + "/logo.png"} className="logo" />
        </a>
        <a href="/">
          <i className="fa fa-house fa-lg"></i>
        </a>
        <ul className="list season">
          <Link
            to="/winter"
            className={
              activePage === "http://localhost:3000/winter" ? "active" : ""
            }
            onClick={handleClick}
          >
            <li>
              Winter <span>2025</span>
            </li>
          </Link>
          <Link
            to="/spring"
            className={
              activePage === "http://localhost:3000/spring" ? "active" : ""
            }
            onClick={handleClick}
          >
            <li>
              Spring <span>2024</span>
            </li>
          </Link>
          <Link
            to="/summer"
            className={
              activePage === "http://localhost:3000/summer" ? "active" : ""
            }
            onClick={handleClick}
          >
            <li>
              Summer <span>2024</span>
            </li>
          </Link>
          <Link
            to="/fall"
            className={
              activePage === "http://localhost:3000/fall" ? "active" : ""
            }
            onClick={handleClick}
          >
            <li>
              Fall <span>2024</span>
            </li>
          </Link>
        </ul>

        <ul className="list trendul"></ul>
        <div className="filters">
          <div className="search">
            <input
              type="text"
              className="input"
              onChange={(e) => {
                search.setFiltered(e.target.value);
                // console.log(search.filtered);
              }}
              placeholder="Filter Anime"
            />
          </div>
          <div className="hovertext" data-hover="Search">
            <i
              className={`fa-solid fa-magnifying-glass search-icon fa-xl ${
                window.location.pathname !== "/trendinganime" &&
                window.location.pathname !== "/trendingmanga"
                  ? ""
                  : "hide"
              }`}
              onClick={() => {
                const searchInput = document.querySelector(".input");
                searchInput.classList.toggle("input-display");
              }}
            ></i>
          </div>
          <div className="hovertext" data-hover="Sort">
            <i
              className={`fa-solid fa-sort filter-icon fa-xl ${
                window.location.pathname !== "/" &&
                window.location.pathname !== "/trendinganime" &&
                window.location.pathname !== "/trendingmanga"
                  ? ""
                  : "hide"
              } `}
              onClick={() => {
                const select = document.querySelector(".sort");
                select.classList.toggle("select-display");
              }}
            ></i>
            {/* : ''} */}
            <div className="options">
              <div className="sort">
                <div
                  className="sort_title clicked"
                  val="TITLE_ROMAJI"
                  onClick={() => {
                    const value = title.getAttribute("val");
                    search.setSortBy(value);
                  }}
                >
                  Title
                </div>
                <div
                  className="popularity clicked"
                  data="POPULARITY_DESC"
                  onClick={() => {
                    const value = popularity.getAttribute("data");
                    search.setSortBy(value);
                  }}
                >
                  Popularity
                </div>
                <div
                  className="score clicked"
                  data="SCORE_DESC"
                  onClick={() => {
                    const value = score.getAttribute("data");
                    search.setSortBy(value);
                  }}
                >
                  Score
                </div>
                <div
                  className="status clicked"
                  data="STATUS"
                  onClick={() => {
                    const value = status.getAttribute("data");
                    search.setSortBy(value);
                  }}
                >
                  Status
                </div>
                <div
                  className="start clicked"
                  data="START_DATE"
                  onClick={() => {
                    const value = start.getAttribute("data");
                    search.setSortBy(value);
                  }}
                >
                  Start Date
                </div>
                <div
                  className="end clicked"
                  data="END_DATE"
                  onClick={() => {
                    const value = end.getAttribute("data");
                    search.setSortBy(value);
                  }}
                >
                  End Date
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {window.location.pathname !== "/" &&
      window.location.pathname !== "/trendinganime" &&
      window.location.pathname !== "/trendingmanga" ? (
        <h1 className="TV">TV</h1>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Header;
