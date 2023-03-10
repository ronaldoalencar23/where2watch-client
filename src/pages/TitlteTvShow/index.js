import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../api/api";
import { Comment } from "../../components/Comment";

export function TitleTvShow() {
  const { id } = useParams();
  const apiKey = "ee19a39b26031e6051b13d07425280fb";
  const [tvShow, setTvShow] = useState([]);
  const [comment, setComment] = useState([]);

  useEffect(() => {
    async function fetchTvShow() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`
        );
        console.log(response.data);
        setTvShow(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTvShow();
  }, []);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await api.get("/comment");
        console.log(response.data);
        setComment(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchComments();
  }, []);
  const tvShowComments = comment.filter((currentComment) => {
    return currentComment.title.id === Number(id);
  });
  console.log(tvShowComments);
  return (
    <div>
      <h1>{tvShow.name}</h1>
      <Comment title={tvShow} />
      {tvShowComments.map((currentComment) => {
        return (
          <>
            <Link to={`/comment/${currentComment._id}`}>
              <h2>{currentComment.header}</h2>
            </Link>
          </>
        );
      })}
    </div>
  );
}
