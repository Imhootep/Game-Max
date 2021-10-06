import React from "react";
import Navbar from "../components/Navbar";
import LeftNav from "../components/LeftNav";
import Thread from "../components/Thread";
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
      </div>
    </div>
  );
};

export default Home;
