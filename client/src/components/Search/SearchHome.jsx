import React from "react";
import searchIcon from "../../img/searchIcon2.png";

function SearchHome(placeholder, data) {
  return (
    <div className="homeSearch2">
      <input
        type="text"
        className="prompt"
        placeholder="Recherche de posts ..."
        
      />
      <span className="searchBar2">
        <img id="searchIcon" src={searchIcon} alt="" />
      </span>
      <button>
        <span>Vider</span>
      </button>
    </div>
  );
}

export default SearchHome;
