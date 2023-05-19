import { React } from "react";
import styles from "./css/Profile.module.css";
import { useNavigate } from "react-router-dom";

const Profile = ({ info, followers, following }) => {
  console.log(info?.id);
  function detectURLs(message) {
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return message.match(urlRegex);
  }
  const test = info?.about?.replace(detectURLs(info?.about), "");
  const about = test?.replace("img220(", "");
  console.log(info?.statistics?.anime);
  const navigate = useNavigate();
  return (
    <div className={styles.profilePage}>
      <div className={styles.banner}>
        <img src={info?.bannerImage} alt="" />
      </div>
      <div className={styles.user}>
        <div className={styles.logo}>
          <img src={info.avatar?.large} alt="AniList" />
          <h1>{info?.name}</h1>
        </div>
        <div className={styles.infos}>
          <h5>{followers.followers?.length} Followers</h5>
          <h5>{following.following?.length} Following</h5>
        </div>
      </div>
      {info?.about && (
        <div className={styles.bio}>
          <div>
            <div
              className={styles.bioTitle}
              style={{ textDecoration: "underline" }}
            >
              BIO
            </div>
            <span>{about}</span>
            <img
              src={info?.about && detectURLs(info?.about?.slice(0, -1))}
              alt=""
            />
          </div>
        </div>
      )}
      <div className={styles.mainProfile}>
        <div className={styles.top}>
          <section className={styles.stats}>
            <h1 style={{ textAlign: "center" }}>STATS</h1>
            <div className={styles.tots}>
              <div
                className={styles.totalAnime}
                onClick={() => {
                  navigate("/animelist");
                }}
              >
                <div className={styles.tit} style={{ fontSize: "1.8rem" }}>
                  Total Anime
                  <i
                    style={{ color: "black", display: "inline" }}
                    className="fa-solid fa-link"
                  ></i>
                </div>
                <div className={styles.total}>
                  {info?.statistics?.anime?.count}
                </div>
              </div>
              <div
                className={styles.totalAnime}
                onClick={() => {
                  navigate("/mangalist");
                }}
              >
                <div className={styles.tit} style={{ fontSize: "1.8rem" }}>
                  Total Manga
                  <i
                    style={{ color: "black", display: "inline" }}
                    className="fa-solid fa-link"
                  ></i>
                </div>
                <div className={styles.total}>
                  {info?.statistics?.manga?.count}
                </div>
              </div>
            </div>

            <div className={styles.tots}>
              <div className={styles.totalWatched}>
                <div className={styles.tit}>Episodes Watched</div>
                <div className={styles.total}>
                  {info?.statistics?.anime?.episodesWatched}
                </div>
              </div>
              <div className={styles.totalWatched}>
                <div className={styles.tit}>Chapters Read</div>
                <div className={styles.total}>
                  {info?.statistics?.manga?.chaptersRead}
                </div>
              </div>
            </div>
            {/* Score Distribution */}
          </section>

          <section className={styles.favourites}>
            <div className={styles.anime}>
              {info.favourites?.anime?.nodes?.length > 0 && (
                <h3 className={styles.title}>FAVOURITE ANIME</h3>
              )}
              <div className={styles.items}>
                {info.favourites?.anime?.nodes?.length > 0
                  ? info.favourites?.anime?.nodes?.map((favAnime, idx) => {
                      return (
                        <a
                          href={favAnime?.siteUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span
                            className={styles.hovertext}
                            data-hover={
                              favAnime?.title?.english ||
                              favAnime?.title?.romaji
                            }
                          >
                            <img
                              className={styles.posters}
                              src={favAnime?.coverImage?.large}
                              alt=""
                            />
                          </span>
                        </a>
                      );
                    })
                  : ""}
              </div>
            </div>
          </section>
        </div>
        <section className={styles.favourites}>
          <div className={styles.manga}>
            {info.favourites?.manga?.nodes?.length > 0 && (
              <h3 className={styles.title}>FAVOURITE MANGA</h3>
            )}
            <div className={styles.items}>
              {info.favourites?.manga?.nodes?.length > 0
                ? info.favourites?.manga?.nodes?.map((favAnime, idx) => {
                    return (
                      <a
                        href={favAnime?.siteUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span
                          className={styles.hovertext}
                          data-hover={
                            favAnime?.title?.english || favAnime?.title?.romaji
                          }
                        >
                          <img
                            className={styles.posters}
                            src={favAnime?.coverImage?.large}
                            alt=""
                          />
                        </span>
                      </a>
                    );
                  })
                : ""}
            </div>
          </div>
        </section>

        <section className={styles.favourites}>
          <div className={styles.characters}>
            {info.favourites?.characters?.nodes?.length > 0 && (
              <h3 className={styles.title}>FAVOURITE CHARACTERS</h3>
            )}
            <div className={styles.characters}>
              {info.favourites?.characters?.nodes?.length > 0
                ? info.favourites?.characters?.nodes?.map((favAnime, idx) => {
                    return (
                      <div key={idx}>
                        <a
                          href={favAnime?.siteUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span
                            className={styles.hovertext}
                            data-hover={favAnime?.name?.full}
                          >
                            <img
                              src={favAnime?.image?.large}
                              className={styles.posters}
                              alt=""
                            />
                          </span>
                        </a>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </section>

        <section className={styles.favourites}>
          <div className={styles.staff}>
            {info.favourites?.staff?.nodes?.length > 0 && (
              <h3 className={styles.title}>FAVOURITE STAFF</h3>
            )}
            <div className={styles.items}>
              {info.favourites?.staff?.nodes?.length > 0
                ? info.favourites?.staff?.nodes?.map((favAnime, idx) => {
                    return (
                      <div key={idx}>
                        <a
                          href={favAnime?.siteUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span
                            className={styles.hovertext}
                            data-hover={favAnime?.name.full}
                          >
                            <img
                              src={favAnime?.image?.large}
                              className={styles.posters}
                              alt=""
                            />
                          </span>
                        </a>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </section>

        <section className={styles.favourites}>
          <div className={styles.studios}>
            {info.favourites?.studios?.nodes?.length > 0 && (
              <h3 className={styles.title}>FAVOURITE STUDIOS</h3>
            )}
            <div className={styles.items}>
              {info.favourites?.studios?.nodes?.length > 0
                ? info.favourites?.studios?.nodes?.map((favStudios, idx) => {
                    return (
                      <h4 key={idx}>
                        {" "}
                        <a
                          href={favStudios?.siteUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {favStudios?.name}
                        </a>{" "}
                      </h4>
                    );
                  })
                : ""}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
