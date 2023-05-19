import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import { SearchContext } from "../search";

const Fall = () => {
  const [trending, setTrending] = useState([]);
  const search = useContext(SearchContext);

  const showGraphQLData = () => {
    var query = `query ($season: MediaSeason!, $seasonYear: Int!, $page: Int, $sort: [MediaSort]) {
      Page(page: $page) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        media(season: $season, seasonYear: $seasonYear, type: ANIME, sort: $sort, isAdult: false, format: TV) {
          id
          siteUrl
          coverImage {
            extraLarge
            large
            medium
          }
          externalLinks {
            id
            url    
            site
            language
            color
            icon
            language
            isDisabled
          }
          relations {
            edges {
              relationType
            }
            nodes {
              id
              title{
                romaji
              }
            }
          }
          rankings {
            season
            type
            rank
          }
          meanScore
          format
          type
          trailer {
            id
            site
            thumbnail
          }
          hashtag
          genres
          studios(isMain: true) {
            nodes {
              name
              siteUrl
              isAnimationStudio
            }
          }
          idMal
          title {
            romaji
            english
          }
          status
          episodes
          description (asHtml: false)
          nextAiringEpisode {
            id
            timeUntilAiring
            episode
          }
          source
          startDate {
            year
            month
            day
          }
        }
      }
    }
    `;

    var variables = {
      season: "FALL",
      seasonYear: 2023,
      page: 1,
      sort: search.sortBy || "POPULARITY_DESC",
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
    showGraphQLData();
  }, [search.sortBy]);

  return (
    <div className="items">
      {trending.map((anime, idx) => {
        let removeB = anime.description?.replace(/\<br\>/g, "");
        let removeI = removeB?.replace(/\<i>/g, "");
        let description = removeI?.replace("</i>", "");
        const date = new Date();
        date.setMonth(anime.startDate?.month - 1);
        const m = date.toLocaleString("en-US", { month: "long" });
        const seconds = anime.nextAiringEpisode?.timeUntilAiring;
        const d = Math.floor(seconds / (3600 * 24));
        const h = Math.floor((seconds % (3600 * 24)) / 3600);

        const minutes = ((seconds - (seconds % 60)) / 60) % 60;

        const isFound = anime.relations.edges?.some((relation) => {
          if (relation.relationType === "PREQUEL") {
            return true;
          }
          return false;
        });

        const rightIndex = anime.relations.edges?.findIndex((relation) => {
          return relation.relationType === "PREQUEL";
        });

        const sequelName =
          anime.relations.nodes[rightIndex]?.title?.romaji ||
          anime.relations.nodes[rightIndex]?.title?.english;

        const sequelTo =
          sequelName?.length > 25
            ? `${sequelName?.substring(0, 25)}...`
            : sequelName;

        return anime.title.english?.toLowerCase().includes(search.filtered) ||
          anime.title.romaji?.toLowerCase().includes(search.filtered) ? (
          <div className="card" key={idx}>
            <div className="grid">
              <div className="poster">
                <a
                  href={anime.siteUrl}
                  className="link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={anime.coverImage.extraLarge} alt="" />
                </a>
                <div className="overview">
                  <div className="title">
                    <a
                      href={anime.siteUrl}
                      className="link"
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#ffffff" }}
                    >
                      <strong>
                        {anime.title.romaji || anime.title.english}
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
            <div className="description">
              <div className="head">
                <div className="description-header">
                  <div className="next-episode">
                    {anime.status === "RELEASING"
                      ? `Ep ${anime.nextAiringEpisode?.episode} of ${anime?.episodes} airing in:`
                      : ""}
                    {anime.status === "FINISHED"
                      ? `${anime.episodes} episodes aired on `
                      : ""}
                    {anime.status === "NOT_YET_RELEASED"
                      ? anime.episodes
                        ? `${anime.episodes} Episodes airing in:`
                        : `Airing in:`
                      : ""}
                  </div>
                  <div className="days">
                    <div>
                      <p></p>
                    </div>
                    {anime.nextAiringEpisode?.timeUntilAiring ? (
                      <strong>
                        {d === 1 ? d + " day, " : d === 0 ? "" : d + " days, "}
                        {h !== 0
                          ? h + ` hours${!d ? "," : ""} `
                          : minutes + " mins"}
                        {d === 0 && h ? minutes + " mins" : ""}
                      </strong>
                    ) : (
                      <strong>
                        {m} {anime.startDate?.year}
                      </strong>
                    )}
                    <div className="source">
                      {isFound === true ? (
                        <span className="sequel">Sequel to {sequelTo}</span>
                      ) : (
                        <span>
                          Source • {anime.source.split("_").join(" ")}
                        </span>
                      )}
                    </div>
                    <div className="stats">
                      {anime.meanScore && (
                        <div className="score">
                          <span>
                            {anime.meanScore >= 70 ? (
                              <img
                                src={process.env.PUBLIC_URL + "/happy.png"}
                                className="face"
                                alt=""
                              />
                            ) : anime.meanScore > 59 && anime.meanScore < 70 ? (
                              <img
                                src={process.env.PUBLIC_URL + "/normal.png"}
                                className="face-normal"
                                alt=""
                              />
                            ) : (
                              <img
                                src={process.env.PUBLIC_URL + "/sad.png"}
                                className="face"
                                alt=""
                              />
                            )}
                            {anime.meanScore}%
                          </span>
                        </div>
                      )}
                      <div className="rank">
                        {anime.rankings.map((ranks) => {
                          return ranks.season ? (
                            ranks.season !== null &&
                            ranks?.type === "POPULAR" &&
                            ranks?.season === "FALL" ? (
                              <span>
                                <img
                                  src={process.env.PUBLIC_URL + "/heart.png"}
                                  className="heart"
                                  alt="heart"
                                />
                                #{ranks?.rank}
                              </span>
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="trailer-header">
                    {/* trailer site and trailer thumbnail */}
                    <a
                      href={`https://myanimelist.net/anime/${anime.idMal}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://image.myanimelist.net/ui/OK6W_koKDTOqqqLDbIoPAiC8a86sHufn_jOI-JGtoCQ"
                        alt=""
                        className="link_img"
                      />
                    </a>
                    {/* {console.log(anime.externalLinks[1]?.url)} */}

                    {anime.externalLinks[0]?.icon ? (
                      <a
                        href={anime.externalLinks[0]?.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={anime.externalLinks[0]?.icon}
                          alt=""
                          className="link_img"
                          style={{
                            backgroundColor: `${anime.externalLinks[0].color}`,
                          }}
                        />
                      </a>
                    ) : (
                      ""
                    )}

                    {anime.externalLinks[1]?.icon ? (
                      <a
                        href={anime.externalLinks[1]?.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={anime.externalLinks[1]?.icon}
                          alt=""
                          className="link_img"
                          style={{
                            backgroundColor: `${anime.externalLinks[1].color}`,
                          }}
                        />
                      </a>
                    ) : (
                      ""
                    )}

                    {anime.externalLinks[2]?.icon ? (
                      <a
                        href={anime.externalLinks[2]?.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={anime.externalLinks[2]?.icon}
                          alt=""
                          className="link_img"
                          style={{
                            backgroundColor: `${anime.externalLinks[2].color}`,
                          }}
                        />
                      </a>
                    ) : (
                      ""
                    )}

                    {anime.externalLinks[3]?.icon ? (
                      <a
                        href={anime.externalLinks[3]?.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={anime.externalLinks[3]?.icon}
                          alt=""
                          className="link_img"
                          style={{
                            backgroundColor: `${anime.externalLinks[3].color}`,
                          }}
                        />
                      </a>
                    ) : (
                      ""
                    )}

                    {anime.externalLinks[4]?.icon ? (
                      <a
                        href={anime.externalLinks[4]?.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={anime.externalLinks[4]?.icon}
                          alt=""
                          className="link_img"
                          style={{
                            backgroundColor: `${anime.externalLinks[4].color}`,
                          }}
                        />
                      </a>
                    ) : (
                      ""
                    )}

                    <a
                      href={`https://www.youtube.com/watch?v=${anime.trailer?.id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="image-cropper">
                        <img
                          className="trailer_img"
                          src={anime.trailer?.thumbnail}
                          alt=""
                        />
                        <span
                          className="trailer-span"
                          style={{
                            fontSize: "10px",
                            letterSpacing: "1.8px",
                          }}
                        >
                          <i
                            class="fa-solid fa-angles-up fa-sm"
                            style={{
                              marginLeft: "1.8rem",
                              marginBottom: "-1.5rem",
                            }}
                          ></i>
                          TRAILER
                        </span>
                      </div>
                    </a>
                  </div>
                  <br />
                  <br />
                </div>
                <br />
                <p className="synopsis">
                  <strong style={{ color: "#9fadbd" }}>Synopsis:</strong> <br />
                  {description}
                </p>
              </div>
              <div className="genres">
                {anime.genres[0] ? (
                  <a
                    href={`https://anilist.co/search/anime/${anime.genres[0]}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    <span>{anime.genres[0]}</span>
                  </a>
                ) : (
                  ""
                )}
                {anime.genres[1] ? (
                  <a
                    href={`https://anilist.co/search/anime/${anime.genres[1]}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    <span>{anime.genres[1]}</span>
                  </a>
                ) : (
                  ""
                )}
                {/* </span> */}
              </div>
            </div>
          </div>
        ) : (
          ""
        );
      })}
    </div>
  );
};

export default Fall;
