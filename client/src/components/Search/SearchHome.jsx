import React from "react";
import searchIcon from "../../img/searchIcon2.png"

function SearchHome() {
  return (
    <div className="homeSearch2">
      <input type="text" className="prompt" placeholder="rechercher..." />
      <span className="searchBar"><img id="searchIcon" src={searchIcon} alt="" /></span>
    </div>
  );
}

export default SearchHome;
