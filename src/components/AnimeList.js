import { useState, useEffect, useContext } from "react";
import styles from "./css/AnimeList.module.css";
import { SearchContext } from "../search";
const AnimeList = ({ info, userId }) => {
  const search = useContext(SearchContext);
  const username = search.info.name;
  const [media, setMedia] = useState([]);
  const showAnimeList = () => {
    const query = `
    query ($userId: Int, $userName: String, $type: MediaType) {
      MediaListCollection(userId: $userId, userName: $userName, type: $type, forceSingleCompletedList: true, sort: SCORE_DESC) {
        lists {
          name
          isCustomList
          isCompletedList: isSplitCompletedList
          entries {
            ...mediaListEntry
          }
        }
        user {
          id
          name
          avatar {
            large
          }
          mediaListOptions {
            scoreFormat
            rowOrder
            animeList {
              sectionOrder
              customLists
              splitCompletedSectionByFormat
              theme
            }
            mangaList {
              sectionOrder
              customLists
              splitCompletedSectionByFormat
              theme
            }
          }
        }
      }
    }
    
    fragment mediaListEntry on MediaList {
      id
      mediaId
      status
      score
      progress
      progressVolumes
      repeat
      priority
      private
      hiddenFromStatusLists
      customLists
      advancedScores
      notes
      updatedAt
      startedAt {
        year
        month
        day
      }
      completedAt {
        year
        month
        day
      }
      media {
        id
        title {
          userPreferred
          romaji
          english
          native
        }
        siteUrl
        coverImage {
          extraLarge
          large
        }
        nextAiringEpisode {
          episode
        }
        type
        format
        status(version: 2)
        episodes
        volumes
        chapters
        averageScore
        popularity
        isAdult
        countryOfOrigin
        genres
        bannerImage
        studios(isMain: true) {
          nodes {
            name
            siteUrl
            isAnimationStudio
          }
        }
        startDate {
          year
          month
          day
        }
      }
    }
    
    `;
    let variables = {
      userId: userId,
      userName: username,
      type: "ANIME",
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
      setMedia(data.data);
      console.log(media);
    }

    function handleError(error) {
      console.log("Error, check console");
      console.error(error);
    }
  };
  let total = 0;
  useEffect(() => {
    search.info && showAnimeList();
  }, []);

  return (
    <div className={styles.home}>
      {media?.MediaListCollection?.lists[1] && (
        <div>
          <h1 className={styles.maintitle}>Watching</h1>
          <div className={styles.homepage}>
            {media?.MediaListCollection?.lists[1]?.entries?.map((anime) => {
              const progress =
                (anime?.progress /
                  (anime.media?.episodes ||
                    anime.media.nextAiringEpisode?.episode)) *
                100;
              // console.log(progress);
              return (
                <div>
                  <div key={anime.media.title?.romaji} className={styles.items}>
                    <div className={styles.animeimage}>
                      <a
                        href={anime?.media?.siteUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={anime.media.coverImage?.large} alt="" />
                      </a>
                      <div className={styles.overview}>
                        <div className={styles.title}>
                          <a
                            href={anime.media?.siteUrl}
                            className="link"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <strong>
                              {anime.media?.title?.english ||
                                anime.media?.title?.romaji}
                              <span> </span>
                              <a
                                href={`https://9anime.gs/filter?keyword=${
                                  anime.media?.title?.romaji ||
                                  anime.media?.title?.english ||
                                  anime.media?.title?.native
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
                            </strong>
                          </a>
                        </div>
                        <div className={styles.episodeProgress}>
                          <p style={{ marginLeft: "5px" }}>
                            ({anime?.progress}/
                            {anime?.media?.episodes ||
                              anime.media.nextAiringEpisode?.episode ||
                              "???"}
                            )
                          </p>
                          {anime.media?.status === "RELEASING" ? (
                            <span
                              style={{
                                fontSize: "10px",
                                marginLeft: "5px",
                                color: "yellow",
                              }}
                            >
                              {" "}
                              (RELEASING)
                            </span>
                          ) : anime.media?.status === "HIATUS" ? (
                            <span
                              style={{
                                fontSize: "10px",
                                marginLeft: "5px",
                                color: "orange",
                              }}
                            >
                              {" "}
                              (HIATUS)
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <span style={{ float: "right", marginRight: "0.7rem" }}>
                          {anime?.score > 0 && (
                            <div>
                              <i
                                className="fa-solid fa-star"
                                style={{ color: "yellow" }}
                              ></i>
                              {anime?.score}
                            </div>
                          )}
                        </span>
                      </div>
                    </div>

                    <div
                      className="progress"
                      style={{
                        height: "5px",
                        borderRadius: "50px",
                        width: "150px",
                      }}
                    >
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${progress}%` }}
                        aria-valuenow="0"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {media?.MediaListCollection?.lists?.map((stuff, idx) => {
        return (
          <div key={idx}>
            <h1 className={styles.maintitle}>
              {stuff?.name !== "Watching" && stuff?.name}
            </h1>
            <div className={styles.homepage}>
              {stuff?.entries?.map((anime) => {
                const progress =
                  (anime?.progress /
                    (anime.media?.episodes ||
                      anime.media.nextAiringEpisode?.episode)) *
                  100;
                return (
                  anime?.status !== "CURRENT" && (
                    <div>
                      <div
                        key={anime.media.title?.romaji}
                        className={styles.items}
                      >
                        <div className={styles.animeimage}>
                          <a
                            href={anime?.media?.siteUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img src={anime.media.coverImage?.large} alt="" />
                          </a>
                          <div className={styles.overview}>
                            <div className={styles.title}>
                              <a
                                href={anime.media?.siteUrl}
                                className="link"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <strong>
                                  {anime.media?.title?.english ||
                                    anime.media?.title?.romaji}
                                  <span> </span>
                                  <a
                                    href={`https://animixplay.to/?q=${
                                      anime.media?.title?.romaji ||
                                      anime.media?.title?.english ||
                                      anime.media?.title?.native
                                    }&sengine=all`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <div className={styles.animix}>
                                      <img
                                        src="https://animixplay.to/icon.png"
                                        alt=""
                                      />
                                    </div>
                                  </a>
                                </strong>
                              </a>
                            </div>
                            <div className={styles.episodeProgress}>
                              <p style={{ marginLeft: "5px" }}>
                                ({anime?.progress}/
                                {anime?.media?.episodes ||
                                  anime.media.nextAiringEpisode?.episode ||
                                  "???"}
                                )
                              </p>
                              {anime.media?.status === "RELEASING" ? (
                                <span
                                  style={{
                                    fontSize: "10px",
                                    marginLeft: "5px",
                                    color: "yellow",
                                  }}
                                >
                                  {" "}
                                  (RELEASING)
                                </span>
                              ) : anime.media?.status === "HIATUS" ? (
                                <span
                                  style={{
                                    fontSize: "10px",
                                    marginLeft: "5px",
                                    color: "orange",
                                  }}
                                >
                                  {" "}
                                  (HIATUS)
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                            <span
                              style={{ float: "right", marginRight: "0.7rem" }}
                            >
                              {anime?.score > 0 && (
                                <div>
                                  <i
                                    className="fa-solid fa-star"
                                    style={{ color: "yellow" }}
                                  ></i>
                                  {anime?.score}
                                </div>
                              )}
                            </span>
                          </div>
                        </div>

                        <div
                          className="progress"
                          style={{
                            height: "5px",
                            borderRadius: "50px",
                            width: "150px",
                          }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `${progress}%` }}
                            aria-valuenow="0"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnimeList;
