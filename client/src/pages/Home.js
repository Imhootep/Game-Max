import React from "react";
import Navbar from "../components/Navbar";
import LeftNav from "../components/LeftNav";
import Thread from "../components/Thread";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="home">
        <LeftNav />
        <div className="main">
          <Thread />
        </div>
      </div>
    </div>
  );
};

export default Home;
