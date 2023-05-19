import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Fall from "./components/Fall";
import Summer from "./components/Summer";
import Spring from "./components/Spring";
import Winter from "./components/Winter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrendingAnime from "./components/TrendingAnime";
import TrendManga from "./components/TrendManga";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import { SearchContext } from "./search";
import "./Header.scss";
import LoggedInNav from "./components/LoggedInNav";
import AnimeList from "./components/AnimeList";
import MangaList from "./components/MangaList";
import PopularAnime from "./components/PopularAnime";
import PopularManga from "./components/PopularManga";
import PopularManhwa from "./components/PopularManhwa";
import TopManga from "./components/TopManga";
import Search from "./components/Search";
import TopAnime from "./components/TopAnime";
import Notifications from "./components/Notifications";
import Footer from "./components/Footer";
import LoggedOutFooter from "./components/LoggedOutFooter";
import SeasonalFooter from "./components/SeasonalFooter";
function App() {
  const [filtered, setFiltered] = useState("");
  const [input, setInput] = useState("");
  const [sortBy, setSortBy] = useState("POPULARITY_DESC");
  const [info, setInfo] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [type, setType] = useState("ANIME");
  const [submitted, setSubmitted] = useState(false);

  const infos = new URLSearchParams(window.location.hash.slice(1));
  const accessToken = infos.get("access_token");
  accessToken && localStorage.setItem("myToken", accessToken);
  const [token, setToken] = useState(localStorage.getItem("myToken"));
  const removeToken = () => {
    localStorage.removeItem("myToken");
  };

  // console.log(token);
  // console.log(token);
  const showUserData = () => {
    let query = `
    query($id:Int!){
      Page{
      followers(userId: $id){
        name
      }
    }
      Viewer {
        id
        name
        about (asHtml: false)
        avatar {
          large
        }
        isFollower
        statistics{
          anime{
            count
            episodesWatched
            scores(sort: MEAN_SCORE_DESC){
              score
              meanScore
              count
            }
          }
          manga{
            count
            chaptersRead
          }
        }
        
        favourites {
          anime {
            nodes{
              siteUrl
              title {
                romaji
                english
                native
                userPreferred
              }
              coverImage{
                large
              }
            }
          }
          manga{
            nodes{
              siteUrl
              title {
                romaji
                english
                native
                userPreferred
              }
              coverImage{
                large
              }
            }
          }
          characters{
            nodes{
              siteUrl
              name {
                first
                middle
                last
                full
                native
                userPreferred
              }
              image{
                large
              }
            }
          }
          staff{
            nodes{
              siteUrl
              name {
                first
                middle
                last
                full
                native
                userPreferred
              }
              image{
                large
              }
            }
          }
          studios{
            nodes{
              siteUrl
              name
            }
          }
        }
        bannerImage
        unreadNotificationCount
        donatorTier
        donatorBadge
        moderatorRoles
        options {
          titleLanguage
          staffNameLanguage
          restrictMessagesToFollowing
          airingNotifications
          displayAdultContent
          profileColor
          notificationOptions {
            type
            enabled
          }
          disabledListActivity {
            type
            disabled
          }
        }
        mediaListOptions {
          scoreFormat
          rowOrder
          animeList {
            customLists
            sectionOrder
            splitCompletedSectionByFormat
            advancedScoring
            advancedScoringEnabled
          }
          mangaList {
            customLists
            sectionOrder
            splitCompletedSectionByFormat
            advancedScoring
            advancedScoringEnabled
          }
        }
      }
    }
    
    
`;
    let variables = {
      id: userId,
    };
    let url = "https://graphql.anilist.co",
      options = {
        // mode: "no-cors",
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
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
      setInfo(data.data.Viewer);
      setFollowers(data.data.Page);
      console.log(info.id);
      console.log(followers.followers?.length);
    }

    function handleError(error) {
      console.log("Error, check console");
      console.error(error);
    }
  };

  const showFollowingData = () => {
    let query = `
    query($id: Int!){
      Page{
        following (userId: $id){
          name
        }
        
      }
    }  
`;
    let variables = {
      id: userId,
    };
    var url = "https://graphql.anilist.co",
      options = {
        // mode: "no-cors",
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
      setFollowing(data.data.Page);
      console.log(info);
      console.log(following.following?.length);
    }

    function handleError(error) {
      console.log("Error, check console");
      console.error(error);
    }
  };

  const payload = token ? JSON.parse(atob(token.split(".")[1])) : "";
  const userId = payload.sub;

  useEffect(() => {
    token && showUserData();
    token && showFollowingData();
    console.log(info.id);
    window.history.pushState(
      "",
      window.location.hash,
      window.location.pathname
    );
  }, [info?.unreadNotificationCount]);

  return (
    <SearchContext.Provider
      value={{
        info,
        input,
        setInput,
        filtered,
        setFiltered,
        sortBy,
        setSortBy,
        setToken,
        removeToken,
        type,
        setType,
        submitted,
        setSubmitted,
        token,
      }}
    >
      <div className="App">
        <Router>
          {window.location.pathname === "/winter" ||
          window.location.pathname === "/summer" ||
          window.location.pathname === "/spring" ||
          window.location.pathname === "/fall" ? (
            <Header></Header>
          ) : (
            ""
          )}
          {token &&
          window.location.pathname !== "/winter" &&
          window.location.pathname !== "/summer" &&
          window.location.pathname !== "/spring" &&
          window.location.pathname !== "/fall" ? (
            <LoggedInNav info={info}></LoggedInNav>
          ) : window.location.pathname !== "/winter" &&
            window.location.pathname !== "/summer" &&
            window.location.pathname !== "/spring" &&
            window.location.pathname !== "/fall" ? (
            <Home></Home>
          ) : (
            ""
          )}
          <Routes>
            <Route path="/" exact element={<HomePage />}></Route>
            <Route
              path="/popularanime"
              exact
              element={<PopularAnime />}
            ></Route>
            <Route
              path="/popularmanga"
              exact
              element={<PopularManga />}
            ></Route>
            <Route
              path="/popularmanhwa"
              exact
              element={<PopularManhwa />}
            ></Route>
            <Route
              path="/trendinganime"
              exact
              element={<TrendingAnime />}
            ></Route>
            <Route path="/search" exact element={<Search />}></Route>
            <Route path="/trendingmanga" exact element={<TrendManga />}></Route>
            {token ? (
              <Route
                path="/notifications"
                exact
                element={<Notifications info={info} />}
              ></Route>
            ) : (
              console.log("you must be logged in")
            )}
            <Route path="/topmanga" exact element={<TopManga />}></Route>
            <Route path="/topanime" exact element={<TopAnime />}></Route>
            <Route path="/winter" exact element={<Winter />}></Route>
            <Route path="/spring" exact element={<Spring />}></Route>
            <Route path="/summer" exact element={<Summer />}></Route>
            <Route path="/fall" exact element={<Fall />}></Route>
            {token ? (
              <Route
                path={"/profile"}
                element={
                  <Profile
                    info={info}
                    followers={followers}
                    following={following}
                  />
                }
              ></Route>
            ) : (
              console.log("you must be logged in")
            )}
            {token ? (
              <Route
                path={"/animelist"}
                element={<AnimeList info={info} userId={userId} />}
              ></Route>
            ) : (
              console.log("you must be logged in")
            )}
            {token ? (
              <Route
                path={"/mangalist"}
                element={<MangaList info={info} userId={userId} />}
              ></Route>
            ) : (
              console.log("you must be logged in")
            )}
          </Routes>
          {window.location.pathname === "/winter" ||
          window.location.pathname === "/summer" ||
          window.location.pathname === "/spring" ||
          window.location.pathname === "/fall" ? (
            <SeasonalFooter></SeasonalFooter>
          ) : !token ? (
            <LoggedOutFooter></LoggedOutFooter>
          ) : (
            <Footer></Footer>
          )}
        </Router>
      </div>
    </SearchContext.Provider>
  );
}

export default App;
