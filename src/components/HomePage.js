import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../search";
import styles from "./css/HomePage.module.css";
import TrendingManga from "./TrendingManga";

const HomePage = () => {
  const [trending, setTrending] = useState([]);
  const [animePage, setAnimePage] = useState(1);
  const search = useContext(SearchContext);
  const showAnimeData = () => {
    var query = `query ($page: Int, $perPage: Int, $type: MediaType) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          
            media(type: $type, sort: TRENDING_DESC) {
              id
              studios {
            nodes {
              name
              siteUrl
              isAnimationStudio
            }
          }
              title {
                romaji
                english
              }
              siteUrl
              isAdult
              coverImage{
                extraLarge
                large
                medium
              }
          }
}
}
    `;

    var variables = {
      page: animePage,
      perPage: 10,
      type: search.type,
    };

    var url = "https://graphql.anilist.co",
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: query,
          variables: variables,
        }),
      };
    fetch(url, options)
      .then(handleResponse)
      .then(handleData)
      .catch(handleError);

    function handleResponse(response) {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
      });
    }
    function handleData(data) {
      setTrending(data.data.Page.media);
    }

    function handleError(error) {
      console.log("Error, check console");
      console.error(error);
    }
  };

  useEffect(() => {
    showAnimeData();
  }, []);

  return (
    <div className={styles.homepage}>
      <section className={styles.options}></section>

      <div className={styles.tite}>
        <div className={styles.main_title}>
          <Link to="/trendinganime"> TRENDING ANIME</Link>
        </div>
        <div className={styles.viewAll}>
          <Link to="/trendinganime">View All</Link>
        </div>
      </div>
      <section className={styles.anime}>
        {trending.map((trend, idx) => {
          return (
            <div className={styles.mains} key={idx}>
              <div className={styles.cover}>
                <a href={trend?.siteUrl} target="_blank" rel="noreferrer">
                  <img src={trend.coverImage?.large} alt="" />
                </a>
              </div>
              <div className={styles.title}>
                <a href={trend?.siteUrl} target="_blank" rel="noreferrer">
                  {trend.title?.english || trend.title?.romaji}
                </a>
                <a
                  href={`https://9anime.gs/filter?keyword=${
                    trend?.title?.romaji ||
                    trend?.title?.english ||
                    trend?.title?.native
                  }&sengine=all`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={styles.animix}>
                    <img
                      src="https://d4.alternativeto.net/qOUfLCyFQ-70alqi28JbEZrmi9oNnWmaqmmND0fj9m8/rs:fill:280:280:0/g:ce:0:0/YWJzOi8vZGlzdC9pY29ucy85YW5pbWVfMTA3NTM5LnBuZw.png"
                      alt=""
                    />
                  </div>
                </a>
              </div>
            </div>
          );
        })}
      </section>

      <TrendingManga></TrendingManga>
    </div>
  );
};

export default HomePage;
