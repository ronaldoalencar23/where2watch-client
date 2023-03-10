import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Home() {
  const apiKey = "ee19a39b26031e6051b13d07425280fb";
  const [movie, setMovie] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
        );
        console.log(response.data);
        setMovie(response.data.results);
      } catch (err) {
        console.log(err);
      }
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    async function fetchTvShows() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`
        );
        console.log(response.data);
        setTvShows(response.data.results);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTvShows();
  }, []);

  return (
    <div class="row">
      <div class="movie-list col-lg-8 mx-auto">
        {movie.map((currentMovie) => {
          return (
            <div class="movie-item">
              <Link to={`/title/movie/${currentMovie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
                  alt={currentMovie.title}
                />
              </Link>
            </div>
          );
        })}
        {tvShows.map((currentTvShows) => {
          return (
            <div class="tv-show-item">
              <Link to={`/title/tv-show/${currentTvShows.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${currentTvShows.poster_path}`}
                  alt={currentTvShows.title}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
