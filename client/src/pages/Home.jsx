import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../components/AppContext";
import Navbar from "../components/Navigation/Navbar";
import LeftNav from "../components/Navigation/LeftNav";
import Thread from "../components/Post/Thread";
import Trends from "../components/Post/Trends";
import NewPostForm from "../components/Post/NewPostForm";
import { Redirect } from "react-router-dom";
import logo from "../img/logo2.png";
import searchIcon from "../img/searchIcon2.png";

const Home = () => {
  const posts = useSelector((state) => state.postReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  const uid = useContext(UidContext);

  const [oust, setOust] = useState(false);

  const ticTac = () => {
    setInterval(() => {
      setOust(true);
    }, 3000);
  };

  return (
    <>
      {uid !== null ? (
        <div>
          <Navbar />
          <div className="home">
            <LeftNav />
            <div className="main">
              <div className="home-header">
                <NewPostForm />
              </div>
              <Thread posts={posts} userData={userData} usersData={usersData} />
            </div>
            <div className="right-side">
              <div className="right-side-container">
                <div className="wrapper">
                  <div className="homeSearch">
                    <div className="homeSearch2">
                      <input
                        type="text"
                        className="prompt"
                        placeholder="rechercher..."
                      />
                      <span className="searchBar">
                        <img id="searchIcon" src={searchIcon} alt="" />
                      </span>
                    </div>
                  </div>
                  <Trends
                    posts={posts}
                    userData={userData}
                    usersData={usersData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <img
            src={logo}
            className="loading"
            alt="logo"
            onLoad={() => ticTac()}
          />
          <div class="pac-man" />
          <h2>Redirection...</h2>
          <div>{oust === true ? <Redirect to="/" /> : ""}</div>
        </div>
      )}
    </>
  );
};

export default Home;
