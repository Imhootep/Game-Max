import React from "react";
import Navbar from "../components/Navbar";
import LeftNav from "../components/LeftNav";
import Thread from "../components/Thread";
import NewPostForm from "../components/Post/NewPostForm";
import Trends from "../components/Trends";

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
