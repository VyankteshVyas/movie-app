import React from 'react';
import Movie from './components/Movie'
import { useEffect, useState } from 'react'


const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm,setSearchTerm]=useState('');
  useEffect(() => {
    fetch(FEATURED_API)
      .then(function (res) {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then(function (data) {
        console.log(data);
        setMovies(data.results);
      })
      .catch(function (err) {
        console.log(err);
      })
  }, [])

  const handleOnSubmit=(e)=>{
    e.preventDefault();
    fetch(SEARCH_API+searchTerm)
      .then(function (res) {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then(function (data) {
        console.log(data);
        setMovies(data.results);
      })
      .catch(function (err) {
        console.log(err);
      })
  }

  const handleOnChange=(e)=>{
    setSearchTerm(e.target.value);
  }

  return (
    <div>
      <header>
      <form onSubmit={handleOnSubmit}>
      <input 
      type="text" 
      className="search" 
      placeholder="Search..." 
      value={searchTerm}
      onChange={handleOnChange}/>

      </form>
      </header>
      <div className="movie-container">

        {movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </div>

  );
}

export default App;
