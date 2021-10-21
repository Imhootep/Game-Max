// import React, { useContext } from "react";
import React from "react";
// import { useSelector } from "react-redux";
// import { UidContext } from "../components/AppContext";
import LeftNav from "../components/Navigation/LeftNav";
import Navbar from "../components/Navigation/Navbar";
import Cookies from "js-cookie";
import { Redirect } from "react-router";

const Trending = () => {

    // const uid = useContext(UidContext)
    // const trendList = useSelector((state) =>state.trendingReducer);
    
    return (
        <>
        {Cookies.get("jwt") ?
        <div>
            <Navbar/>
            <LeftNav />
            <div className="trending-page">      
            </div>
        </div>
        :
        <Redirect to='/'  />
        }
        </>
    );
};
export default Trending