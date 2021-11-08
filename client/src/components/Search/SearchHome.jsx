import React, { useState } from "react";
import { searchPost } from "../../actions/post.actions";
 import SearchIcon from "../../img/searchIcon.png";
 import CloseIcon from "../../img/closeIcon.png";

function SearchHome(placeholder, data) {
  const [search, setSearch] = useState();
  const [specificSearch, setSpecificSearch] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  // const handleSearch = () => {
  //   if (data === specificSearch) {
  //     setSpecificSearch();
  //   } else {
  //     setSpecificSearch(data);
  //   }
  // };
  
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="homeSearch2">
      <input
        type="text"
        className="prompt"
        value={wordEntered}
        onChange={handleFilter}
        placeholder="Recherche de posts ..."
        />

       <div className="searchIcon">

      {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      <button>
        <span>Vider</span>
      </button>
    </div>
  );
}

//   return (
//     <div className="search">
//       <div className="searchInputs">
//         <input
//           type="text"
//           placeholder={placeholder}
//           value={wordEntered}
//           onChange={handleFilter}
//         />
//         <div className="searchIcon">
//           {filteredData.length === 0 ? (
//             <SearchIcon />
//           ) : (
//             <CloseIcon id="clearBtn" onClick={clearInput} />
//           )}
//         </div>
//       </div>
//       {filteredData.length != 0 && (
//         <div className="dataResult">
//           {filteredData.slice(0, 15).map((value, key) => {
//             return (
//               <a className="dataItem" href={value.link} target="_blank">
//                 <p>{value.title} </p>
//               </a>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

export default SearchHome;

