import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../search";
import styles from "./css/Search.module.css";
import { useNavigate } from "react-router-dom";

const Search = ({ anime }) => {
  const [value, setValue] = useState([]);
  const search = useContext(SearchContext);
  const navigate = useNavigate();
  const showGraphQLData = () => {
    const query = `
    query ($page: Int, $perPage: Int, $search: String) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media(search: $search, sort: POPULARITY_DESC, isAdult: false) {
          id
          idMal
          title {
            romaji
            english
            native
          }
          type
          endDate {
            year
            month
            day
          }
          startDate {
            year
            month
            day
          }
          studios(isMain: true) {
            nodes {
              name
            }
          }
          isAdult
          source
          genres
          volumes
          episodes
          chapters
          siteUrl
          status
          averageScore
          meanScore
          popularity
          description
          favourites
          coverImage {
            extraLarge
            medium
            large
            color
          }
        }
      }
}`;
    // console.log(search.input);
    // console.log(value);
    let variables = {
      search: search.input,
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
      setValue(data.data.Page.media);

      //   console.log(value);
    }

    function handleError(error) {
      console.log("Error, check console");
      console.error(error);
    }
  };

  useEffect(() => {
    showGraphQLData();
    console.log(search.submitted);
    search.setSubmitted(false);
  }, [search.submitted]);
  search.input === "" && navigate("/");
  return (
    <div className={styles.search}>
      <h1 className={styles.maintitle}></h1>
      <br />
      <br />
      {value.map((anime, idx) => {
        let removeB = anime.description?.replace(/\<br\>/g, "");
        let removeI = removeB?.replace(/\<i>/g, "");
        let des = removeI?.replace("</i>", "");
        let desc = des?.replace("</i>", "");
        let description = desc?.replace("</i>", "");
        return (
          <div className={styles.card} key={idx}>
            <div className={styles.grid}>
              <a
                href={anime.siteUrl}
                className="link"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={anime.coverImage.large}
                  alt=""
                  className={styles.poster}
                />
              </a>
              <div className={styles.overview}>
                <div>
                  <div className={styles.title}>
                    <a href={anime.siteUrl} target="_blank" rel="noreferrer">
                      {anime.title.english || anime.title.romaji}
                    </a>
                    <span> </span>

                    {anime.type === "ANIME" ? (
                      <div>
                        <a
                          href={`https://anix.to/filter?keyword=${anime.title.romaji}&sengine=all`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src="https://pbs.twimg.com/profile_images/1263003620594708483/znw0-sKS_400x400.jpg"
                            alt=""
                            className={styles.animix}
                          />
                        </a>
                      </div>
                    ) : (
                      <div>
                        <a
                          href={`https://mangadex.org/titles?q=${
                            anime.tttle?.romaji ||
                            anime.title?.english ||
                            anime.title?.native
                          }`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src="https://asset.brandfetch.io/id7o_ziJpI/id4LUn6E28.jpeg?updated=1681786551730"
                            alt=""
                            className={styles.animix}
                          />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                <p className={styles.synopsis}>
                  <strong style={{ color: "#9fadbd" }}>Synopsis:</strong> <br />
                  {description}
                </p>

                <div className={styles.studio}>
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
                        ""
                      )}
                    </a>
                  </strong>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {value?.length > 0 && (
        <h4 style={{ color: "white", margin: "1rem" }}>
          Total Results: {value?.length}
        </h4>
      )}
    </div>
  );
};

export default Search;
