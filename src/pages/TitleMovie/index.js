import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import { Comment } from "../../components/Comment";

export function TitleMovie() {
  const { id } = useParams();
  const apiKey = "ee19a39b26031e6051b13d07425280fb";
  const [movie, setMovie] = useState([]);
  const [comment, setComment] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );
        console.log(response.data);
        setMovie(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await api.get("/comment");
        console.log(response);
        setComment(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchComments();
  }, []);
  const movieComments = comment.filter((currentComment) => {
    return currentComment.title.id === Number(id);
  });
  console.log(movie);
  return (
    <div>
      <h1 class="title"><span>{movie.title}</span></h1>
      <br />
      <Comment title={movie} />
      {movieComments.map((currentComment) => {
        return (
          <>
            <h2>{currentComment.header}</h2>
          </>
        );
      })}
    </div>
  );
}
