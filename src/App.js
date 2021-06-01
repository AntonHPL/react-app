import React, {useState, useEffect} from "react";
import Search from "./components/Search";
import Info from "./components/Info";
import ReactPaginate from 'react-paginate';
import axios from "axios";
import person from "./images/person.png";
import loop from './images/loop.png';
import noRepos from './images/noRepos.png';
import "./App.css";

const PER_PAGE = 4;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [imageSource, setImageSource] = useState('');
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [url, setUrl] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);

  async function getUser(login) {
    let result0;
    let result1;
    let result2;
    let result3;
    let result4;
    let result5;
    let result6;
    try {
      result0 = (await axios.get(`https://api.github.com/users/${login}`)).data;
      result1 = result0.avatar_url;
      result2 = result0.name;
      result3 = result0.login;
      result4 = result0.followers;
      result5 = result0.following;
      result6 = result0.html_url;
    } catch (e) {
        console.error(e);
      }
    setUser(result0);
    setImageSource(result1);
    setName(result2);
    setLogin(result3);
    setFollowers(result4);
    setFollowing(result5);
    setUrl(result6);
  }

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetch (
        `//api.github.com/users/${user.login}/repos?page=${currentPage+1}&per_page=${PER_PAGE}`
      )
        .then((res) => res.json())
        .then(setData)
        .catch((error) => {})
        .then(() => setLoading(false))
    }
  }, [user, currentPage])

  function handlePageClick({selected: selectedPage}) {
    setCurrentPage(selectedPage);
  }

  const currentPageData = data
    .map((post) => (
      <div id="item" key={post.id}>
        <p><a id="href" href={post.html_url} target="blank">{post.full_name}</a></p>
        <p id="description">{post.description}</p>
      </div>
    ))

    if (loading) {
      return (
        <div>
          <Search onSearch={getUser}/>
          <Info name={name}
                url={url}
                login={login}
                followers={followers}
                following={following}
                imageSource={imageSource}
          />
          <div class="loader">
          </div>
        </div>
      )
    }

  if(user === null) {
    return (
      <div>
        <Search onSearch={getUser} source={imageSource}/>
        <img src={loop} alt="github" id="loop_app"/>
        <div id="start">
          Start with searching<br/>a GitHub user
        </div>
      </div>
    )
  }

  else if (user === undefined) {
    return (
      <div>
        <Search onSearch={getUser} source={imageSource}/>
        <img src={person} alt="github" id="person_app"/>
        <div id="start">
          User not found
        </div>
      </div>
    )
  }

  else if (user && !user.public_repos) {
    return (
      <div>
        <Search onSearch={getUser}/>
        <Info name={name}
              url={url}
              login={login}
              followers={followers}
              following={following}
              imageSource={imageSource}
        />
        <img id="noImage" src={noRepos} alt="noRepos" />
        <div id="noDiv">Repository list is empty</div>
      </div>
    )
  }

  else if (user) {
    return (
      <div>
        <Search onSearch={getUser} source={imageSource}/>
        {currentPageData}
        <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={Math.ceil(user.public_repos / PER_PAGE)}
            onPageChange={handlePageClick}
            containerClassName={"paginatio"}
            previousLinkClassName={"paginatio__link"}
            nextLinkClassName={"paginatio__link"}
            disabledClassName={"paginatio__link--disabled"}
            activeClassName={"paginatio__link--active"}
            forcePage={currentPage}
        />
        <span id="repositories">Repositories({user.public_repos})</span>
        <Info name={name}
              url={url}
              login={login}
              followers={followers}
              following={following}
              imageSource={imageSource}
        />
      </div>
    );
  }
}

export default App;
