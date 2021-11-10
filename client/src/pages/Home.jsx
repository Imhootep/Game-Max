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
import discord from "../img/discord2.svg";
import fb from "../img/fb.svg";
import twitch from "../img/twitch.svg";
import twitter from "../img/twitter.svg";
import site from "../img/logo2.png";

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
                  <Trends
                    posts={posts}
                    userData={userData}
                    usersData={usersData}
                  />
                </div>
                <p>Suivez-nous sur nos réseaux !</p>
                <div className="sm-link">
                  
                  <br />
                  <div className="sm1-link">
                    <a
                      href="https://gamemax.be/"
                      id="siteHoverParent"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div id="siteHover"></div>
                      <img src={site} alt="site" className="NavImgSite" />
                    </a>
                  </div>
                  <div className="sm2-link">
                    <a
                      href="https://discord.gg/wx53YfaR"
                      id="discordHoverParent"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div id="discordHover"></div>
                      <img src={discord} alt="discord" className="NavImg" />
                    </a>
                    <a
                      href="https://www.facebook.com/gamemaxbe"
                      id="fbHoverParent"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div id="fbHover"></div>
                      <img src={fb} alt="facebook" className="NavImg" />
                    </a>
                    <a
                      href="https://www.twitch.tv/gamemax"
                      id="twitchHoverParent"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div id="twitchHover"></div>
                      <img src={twitch} alt="twitch" className="NavImg" />
                    </a>
                    <a
                      href="https://twitter.com/gamemaxbe"
                      id="twitterHoverParent"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div id="twitterHover"></div>
                      <img src={twitter} alt="twitter" className="NavImg" />
                    </a>
                  </div>
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
