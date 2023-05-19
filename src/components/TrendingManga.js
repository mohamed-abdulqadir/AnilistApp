import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../search";
import styles from "./css/HomePage.module.css";
import TopManga from "./TopManga";

const TrendingManga = () => {
  const [trending, setTrending] = useState([]);
  const [animePage, setAnimePage] = useState(1);
  const search = useContext(SearchContext);
  const showAnimeData = () => {
    var query = `query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          
            media(type: MANGA, sort: TRENDING_DESC) {
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
    <div>
      <section className={styles.options}></section>

      <div className={styles.tite}>
        <div className={styles.main_title}>
          <Link to="/trendingmanga"> TRENDING MANGA</Link>
        </div>
        <div className={styles.viewAll}>
          <Link to="/trendingmanga">View All</Link>
        </div>
      </div>
      <section className={styles.anime}>
        {trending.map((trend, idx) => {
          return (
            <div className={styles.main} key={idx}>
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
                  href={`https://mangadex.org/titles?q=${
                    trend?.tttle?.romaji ||
                    trend?.title?.english ||
                    trend?.title?.native
                  }`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={styles.animix}>
                    <img
                      src="https://asset.brandfetch.io/id7o_ziJpI/id4LUn6E28.jpeg?updated=1681786551730"
                      alt=""
                    />
                  </div>
                </a>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default TrendingManga;
