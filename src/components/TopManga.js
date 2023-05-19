import React, { useEffect, useState } from "react";
import styles from "./css/HomePage.module.css";
import { Link } from "react-router-dom";

const TopManga = () => {
  const [trending, setTrending] = useState([]);

  const showGraphQLData = () => {
    var query = `query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          
            media(type: MANGA, sort: SCORE_DESC) {
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
              coverImage {
                extraLarge
                large
                medium
              }
          }
}
}
    `;

    var variables = {
      page: 1,
      perPage: 100,
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
      // const anime = JSON.parse(data);
      // console.log(data.data.Page.media);
      setTrending(data.data.Page.media);
    }

    function handleError(error) {
      console.log("Error, check console");
      console.error(error);
    }
  };

  useEffect(() => {
    showGraphQLData();
  }, []);

  return (
    <div className={styles.home}>
      <h1 style={{ textAlign: "center" }}>Top 100 Manga</h1>

      <section className={styles.topAnime}>
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
                    trend.title?.english || trend.title?.romaji
                  }`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://asset.brandfetch.io/id7o_ziJpI/id4LUn6E28.jpeg?updated=1681786551730"
                    alt=""
                    className="animix"
                  />
                </a>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default TopManga;
