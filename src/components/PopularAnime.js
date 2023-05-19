import React, { useEffect, useState } from "react";
import styles from "./css/Trending.module.css";

const PopularAnime = () => {
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
          
            media(type: ANIME, sort: POPULARITY_DESC) {
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
      perPage: 50,
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
    // console.log(trending);
  }, []);

  return (
    <div className={styles.home}>
      <h1 className={styles.trendingTitle}>Popular Anime</h1>
      <div className={styles.trending}>
        {trending.map((anime, idx) => {
          return (
            <div className={styles.card} key={idx}>
              <div className={styles.grid}>
                <div className="poster">
                  <a
                    href={anime.siteUrl}
                    className="link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={anime.coverImage.large}
                      alt=""
                      className="poster"
                    />
                  </a>
                  <div className="overview">
                    <div className="title">
                      <a
                        href={anime.siteUrl}
                        className="link"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <strong>
                          {anime.title.english || anime.title.romaji}
                          <span> </span>
                          <a
                            href={`https://9anime.gs/filter?keyword=${anime.title.romaji}&sengine=all`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              src="https://d4.alternativeto.net/qOUfLCyFQ-70alqi28JbEZrmi9oNnWmaqmmND0fj9m8/rs:fill:280:280:0/g:ce:0:0/YWJzOi8vZGlzdC9pY29ucy85YW5pbWVfMTA3NTM5LnBuZw.png"
                              alt=""
                              className="animix"
                            />
                          </a>
                        </strong>
                      </a>
                    </div>
                    <div className="studio">
                      <strong>
                        <a
                          href={anime.studios.nodes[0]?.siteUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {anime.studios.nodes[0]?.isAnimationStudio ? (
                            <p style={{ color: "#75e1f0" }}>
                              {anime.studios.nodes[0]?.name}
                            </p>
                          ) : (
                            <p style={{ color: "gray" }}>TBA</p>
                          )}
                        </a>
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularAnime;
