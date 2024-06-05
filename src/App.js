import React, { useState } from "react";
import MovieList from "./component/MovieList";
import Filter from "./component/Filter";

import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";

const App = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Wolf of Wall Street",
      description: "A mind-bending thriller",
      posterURL:
        "https://m.media-amazon.com/images/S/pv-target-images/f9d536e603d73b15c291d209a1fd8c5dd9434d62a6a1e5c7fbf7e94c2cda513d.jpg",
      rating: 4.5,
    },
    {
      id: 2,
      title: "Interstellar",
      description: "A space odyssey",
      posterURL:
        "https://bibliosff.wordpress.com/wp-content/uploads/2022/07/interstellar-affiche-film.jpg",
      rating: 4.7,
    },
    {
      id: 3,
      title: "Creed",
      description: "A fighter",
      posterURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZKqWUhp-VwkxkA3JwtsrIMdqOE1Img0k37g&s",
      rating: 5,
    },
  ]);

  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    posterURL: "",
    rating: 0,
  });
  const [filterTitle, setFilterTitle] = useState("");
  const [filterRate, setFilterRate] = useState(0);

  const handleTitleChange = (e) => {
    setFilterTitle(e.target.value);
  };

  const handleRateChange = (e) => {
    setFilterRate(e.target.value);
  };

  const handleAddMovie = () => {
    setMovies([...movies, { ...newMovie, id: Date.now() }]);
    setNewMovie({ title: "", description: "", posterURL: "", rating: 0 });
  };

  const getFilteredMovies = () => {
    return movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
        movie.rating >= filterRate
    );
  };

  function Home() {
    return (
      <>
        <Filter
          title={filterTitle}
          rate={filterRate}
          onTitleChange={handleTitleChange}
          onRateChange={handleRateChange}
        />
        <MovieList movies={getFilteredMovies()} />
        <div className="add-movie">
          <h2>Add New Movie</h2>
          <input
            type="text"
            placeholder="Title"
            value={newMovie.title}
            onChange={(e) =>
              setNewMovie({ ...newMovie, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={newMovie.description}
            onChange={(e) =>
              setNewMovie({ ...newMovie, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Poster URL"
            value={newMovie.posterURL}
            onChange={(e) =>
              setNewMovie({ ...newMovie, posterURL: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Rating"
            value={newMovie.rating}
            onChange={(e) =>
              setNewMovie({ ...newMovie, rating: parseFloat(e.target.value) })
            }
          />
          <button onClick={handleAddMovie}>Add Movie</button>
        </div>
      </>
    );
  }

  return (
    <div className="app">
      <h1>Movie Library</h1>
      <Home />
    </div>
  );
};

export default App;
