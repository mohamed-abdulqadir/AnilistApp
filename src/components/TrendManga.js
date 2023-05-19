import React, { useEffect, useState, useContext } from "react";
import { SearchContext } from "../search";
import styles from "./css/Trending.module.css";

const TrendingAnime = () => {
  const [trending, setTrending] = useState([]);
  const search = useContext(SearchContext);
  const showGraphQLData = () => {
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
      type: "MANGA",
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
      <h1 className={styles.trendingTitle}>Trending Manga</h1>
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
                            href={`https://mangadex.org/titles?q=${
                              anime.title?.english || anime.title?.romaji
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
                        </strong>
                      </a>
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

export default TrendingAnime;
