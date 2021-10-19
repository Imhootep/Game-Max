import React from "react";
import Navbar from "../components/Navigation/Navbar";
import LeftNav from "../components/Navigation/LeftNav";
import Thread from "../components/Post/Thread";
import Trends from "../components/Post/Trends";
import NewPostForm from "../components/Post/NewPostForm";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="home">
        <LeftNav />
        <div className="main">
          <div className="home-header">
              <NewPostForm/>
          </div>
          <Thread />
        </div>
        <div className="right-side">
          <div className="right-side-container">
            <div className="wrapper">
              <Trends />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
