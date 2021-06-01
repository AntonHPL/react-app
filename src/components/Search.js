import React from "react";
import "../styles/search.css";
import github from '../images/github.png';
import loop from '../images/loop.png';

function Info({onSearch}, props) {
  const [searchValue, setSearchValue] = React.useState("");

  function onSubmit(e) {
    e.preventDefault();
    onSearch(searchValue);
  }

  return (
    <div id="blok">
      <img src={github} alt="github" id="github"/>
      <div id="form">
      <img src={loop} alt="github" id="loop"/>
        <form onSubmit={onSubmit}>
          <input
            id="input"
            type="text"
            autoComplete="off"
            placeholder="Enter GitHub username"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
      </div>
    </div>
  )
}

export default Info;
