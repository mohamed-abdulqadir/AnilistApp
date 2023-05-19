import { React, useState, useContext, useEffect } from "react";
import { SearchContext } from "../search";
import styles from "./css/Notifications.module.css";
const Notifications = ({ info }) => {
  const [notis, setNotis] = useState([]);
  const [type, setType] = useState("");
  const search = useContext(SearchContext);
  const payload = search.token
    ? JSON.parse(atob(search.token.split(".")[1]))
    : "";
  const userId = payload.sub;
  const showNotisData = () => {
    let query = `query ($page: Int, $types: [NotificationType]) {
                    Page(page: $page) {
                      pageInfo {
                        total
                        perPage
                        currentPage
                        lastPage
                        hasNextPage
                      }
                      notifications(type_in: $types, resetNotificationCount: true) {
                        ... on AiringNotification {
                          id
                          type
                          episode
                          contexts
                          media {
                            id
                            type
                            bannerImage
                            title {
                              userPreferred
                            }
                            siteUrl
                            coverImage {
                              large
                            }
                          }
                          createdAt
                        }
                        ... on RelatedMediaAdditionNotification {
                          id
                          type
                          context
                          media {
                            id
                            type
                            bannerImage
                            title {
                              userPreferred
                            }
                            siteUrl
                            coverImage {
                              large
                            }
                          }
                          createdAt
                        }
                        ... on FollowingNotification {
                          id
                          type
                          context
                          user {
                            id
                            name
                            avatar {
                              large
                            }
                            siteUrl
                          }
                          createdAt
                        }
                        ... on ActivityMessageNotification {
                          id
                          type
                          context
                          activityId
                          user {
                            id
                            name
                            avatar {
                              large
                            }
                            siteUrl
                          }
                          createdAt
                        }
                        ... on ActivityMentionNotification {
                          id
                          type
                          context
                          activityId
                          user {
                            id
                            name
                            avatar {
                              large
                            }
                            siteUrl
                          }
                          createdAt
                        }
                        ... on ActivityReplyNotification {
                          id
                          type
                          context
                          activityId
                          user {
                            id
                            name
                            avatar {
                              large
                            }
                            siteUrl
                          }
                          createdAt
                        }
                        ... on ActivityReplySubscribedNotification {
                          id
                          type
                          context
                          activityId
                          user {
                            id
                            name
                            avatar {
                              large
                            }
                            siteUrl
                          }
                          createdAt
                        }
                        ... on ActivityLikeNotification {
                          id
                          type
                          context
                          activityId
                          user {
                            id
                            name
                            avatar {
                              large
                            }
                            siteUrl
                          }
                          createdAt
                        }
                        ... on ActivityReplyLikeNotification {
                          id
                          type
                          context
                          activityId
                          user {
                            id
                            name
                            avatar {
                              large
                            }
                            siteUrl
                          }
                          createdAt
                        }
                        ... on ThreadCommentMentionNotification {
                          id
                          type
                          context
                          commentId
                          thread {
                            id
                            title
                          }
                          user {
                            id
                            name
                            avatar {
                              large
                            }
                            siteUrl
                          }
                          createdAt
                        }
                        ... on ThreadCommentReplyNotification {
                          id
                          type
                          context
                          commentId
                          thread {
                            id
                            title
                          }
                          user {
                            siteUrl
                            id
                            name
                            avatar {
                              large
                            }
                          }
                          createdAt
                        }
                        ... on ThreadCommentSubscribedNotification {
                          id
                          type
                          context
                          commentId
                          thread {
                            id
                            title
                          }
                          user {
                            id
                            name
                            avatar {
                              large
                            }
                            siteUrl
                          }
                          createdAt
                        }
                        ... on ThreadCommentLikeNotification {
                          id
                          type
                          context
                          commentId
                          thread {
                            id
                            title
                          }
                          user {
                            id
                            name
                            avatar {
                              large
                            }
                            siteUrl
                          }
                          createdAt
                        }
                        ... on ThreadLikeNotification {
                          id
                          type
                          context
                          thread {
                            id
                            title
                          }
                          user {
                            id
                            name
                            avatar {
                              large
                            }
                            siteUrl
                          }
                          createdAt
                        }
                      }
                    }
                  }
                   `;
    let variables =
      type !== ""
        ? {
            types: type,
          }
        : "";
    let url = "https://graphql.anilist.co",
      options = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + search.token,
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
      setNotis(data.data.Page);
      console.log(info.id);
      console.log(notis?.notifications);
    }

    function handleError(error) {
      console.log("Error, check console");
      console.error(error);
    }
  };
  useEffect(() => {
    search.token && showNotisData();
    // console.log(notis);
  }, [type]);

  return (
    <div className={styles.container}>
      <h1 style={{ color: "white", textAlign: "center" }}>Notifications</h1>
      <div className={styles.sort}>
        <div className={styles.option}>
          <button onClick={() => setType("")}>All</button>
        </div>
        <div className={styles.option}>
          <button onClick={() => setType("ACTIVITY_LIKE")}>Likes</button>
        </div>
        <div className={styles.option}>
          <button onClick={() => setType("ACTIVITY_REPLY")}>Replies</button>
        </div>
        <div className={styles.option}>
          <button onClick={() => setType("AIRING")}>Airing</button>
        </div>
        <div className={styles.option}>
          <button onClick={() => setType("FOLLOWING")}>Follows</button>
        </div>
        <div className={styles.option}>
          <button onClick={() => setType("RELATED_MEDIA_ADDITION")}>
            Media
          </button>
        </div>
      </div>
      {notis?.notifications?.map((nots) => {
        const createdAt = new Date(nots?.createdAt * 1000);

        var date2 = new Date();
        var Difference_In_Time = date2.getTime() - createdAt.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        //         console.log(createdAt);
        return (
          <div className={styles.notifications}>
            {nots?.type?.includes("ACTIVITY") ? (
              <div className={styles.notification}>
                <a href={nots?.user?.siteUrl} target="_blank" rel="noreferrer">
                  <img src={nots?.user?.avatar?.large} alt="" />
                </a>
                <div className={styles.text}>
                  <h3>
                    <a
                      href={nots?.user?.siteUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span style={{ color: "lightgray" }}>
                        {nots.user?.name}
                      </span>
                    </a>
                    <a
                      href={`https://anilist.co/activity/${nots?.activityId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span style={{ color: "burlywood" }}>
                        {nots?.context}
                      </span>
                    </a>
                  </h3>
                  <h6>
                    {Difference_In_Days * 24 < 1
                      ? Math.round(Difference_In_Days * 24 * 60) +
                        " Minute(s) Ago"
                      : Difference_In_Days < 1
                      ? Math.round(Difference_In_Days * 24) + " Hours Ago"
                      : Difference_In_Days < 8
                      ? Math.round(Difference_In_Days) + " Days Ago"
                      : Difference_In_Days < 30
                      ? Math.round(Difference_In_Days / 7) + " Weeks Ago"
                      : Difference_In_Days < 365
                      ? Math.round(Difference_In_Days / 30) + " Months Ago"
                      : Math.round(Difference_In_Days / 365) + " Years Ago"}
                  </h6>
                </div>
              </div>
            ) : nots?.type?.includes("AIRING") ? (
              <div className={styles.notification}>
                <a href={nots?.media?.siteUrl} target="_blank" rel="noreferrer">
                  <img src={nots?.media?.coverImage?.large} alt="" />
                </a>
                <div className={styles.text}>
                  <h3>
                    {nots?.contexts[0] + nots?.episode + nots?.contexts[1]}
                    <a
                      href={nots?.media?.siteUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {nots?.media?.title?.userPreferred}
                    </a>
                    {nots?.contexts[2]}
                  </h3>
                  <h6>
                    {Difference_In_Days * 24 < 1
                      ? Math.round(Difference_In_Days * 24 * 60) +
                        " Minute(s) Ago"
                      : Difference_In_Days < 1
                      ? Math.round(Difference_In_Days * 24) + " Hours Ago"
                      : Difference_In_Days < 8
                      ? Math.round(Difference_In_Days) + " Days Ago"
                      : Difference_In_Days < 30
                      ? Math.round(Difference_In_Days / 7) + " Weeks Ago"
                      : Difference_In_Days < 365
                      ? Math.round(Difference_In_Days / 30) + " Months Ago"
                      : Math.round(Difference_In_Days / 365) + " Years Ago"}
                  </h6>
                </div>
              </div>
            ) : nots?.type?.includes("FOLLOWING") ? (
              <div className={styles.notification}>
                <a href={nots?.user?.siteUrl} target="_blank" rel="noreferrer">
                  <img src={nots?.user?.avatar?.large} alt="" />
                </a>
                <div className={styles.text}>
                  <h3>
                    <a
                      href={nots?.user?.siteUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span style={{ color: "lightgray" }}>
                        {nots.user?.name}
                      </span>
                    </a>
                    {nots?.context}
                  </h3>
                  <h6>
                    {Difference_In_Days * 24 < 1
                      ? Math.round(Difference_In_Days * 24 * 60) +
                        " Minute(s) Ago"
                      : Difference_In_Days < 1
                      ? Math.round(Difference_In_Days * 24) + " Hours Ago"
                      : Difference_In_Days < 8
                      ? Math.round(Difference_In_Days) + " Days Ago"
                      : Difference_In_Days < 30
                      ? Math.round(Difference_In_Days / 7) + " Weeks Ago"
                      : Difference_In_Days < 365
                      ? Math.round(Difference_In_Days / 30) + " Months Ago"
                      : Math.round(Difference_In_Days / 365) + " Years Ago"}
                  </h6>
                </div>
              </div>
            ) : nots?.type?.includes("RELATED_MEDIA_ADDITION") ? (
              <div className={styles.notification}>
                <a href={nots?.media?.siteUrl} target="_blank" rel="noreferrer">
                  <img src={nots?.media?.coverImage?.large} alt="" />
                </a>
                <div className={styles.text}>
                  <h3>
                    <a href={nots?.media?.siteUrl}>
                      {nots?.media?.title?.userPreferred}
                    </a>
                    {nots?.context}
                  </h3>
                  <h6>
                    {Difference_In_Days * 24 < 1
                      ? Math.round(Difference_In_Days * 24 * 60) +
                        " Minute(s) Ago"
                      : Difference_In_Days < 1
                      ? Math.round(Difference_In_Days * 24) + " Hours Ago"
                      : Difference_In_Days < 8
                      ? Math.round(Difference_In_Days) + " Days Ago"
                      : Difference_In_Days < 30
                      ? Math.round(Difference_In_Days / 7) + " Weeks Ago"
                      : Difference_In_Days < 365
                      ? Math.round(Difference_In_Days / 30) + " Months Ago"
                      : Math.round(Difference_In_Days / 365) + " Years Ago"}
                  </h6>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;
