import React from "react";
import persons from "../images/persons.svg";
import person from "../images/person.png";
import "../styles/info.css";

const Info = ({name, url, login, followers, following, imageSource}) => {
  return (
    <div>
      <span id="name">{name} </span>
      <span><a id="login" href={url} target = "_blank">{login}</a> </span>
      <span id="followers"><img src={persons} alt="persons" id="persons"/>{followers} followers  </span>
      <span id="following"><img src={person} alt="person" id="person"/>{following} following</span>
      <a href={url} target="_blank"><img src={imageSource} alt="user" id="image"/></a>
    </div>
  )
}

export default Info;
