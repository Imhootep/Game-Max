import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/Navigation/LeftNav";
import Navbar from "../components/Navigation/Navbar";

const Trending = () => {

    const uid = useContext(UidContext)
    const trendList = useSelector((state) =>state.trendingReducer);
    
    return (
        <>
        <Navbar/>
        <LeftNav />
    <div className="trending-page">
        
        

    </div>
    </>
    )
}
export default Trending