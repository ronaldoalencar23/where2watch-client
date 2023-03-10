import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../api/api";

export function CommentDetail() {
  const [comment, setComment] = useState({
    header: "",
    body: "",
    title: {
      id: 0,
      poster_path: "",
    },
  });
  const { commentId } = useParams();

  useEffect(() => {
    async function fetchComment() {
      try {
        const response = await api.get(`/comment/${commentId}`);
        setComment(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchComment();
  }, []);

  console.log(comment);
  return (
    <>
      {comment && (
        <div class="form-painel">
          <h1>{comment.header}</h1>
          <p>{comment.body}</p>
          <div class="movie-item">
          <Link to={`/title/tv-show/${comment.title.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500${comment.title.poster_path}`}
              alt={comment.header}
            />
          </Link>
          </div>
          <Link to={`/comment/edit/${commentId}`}>
            <button>Editar</button>
          </Link>
        </div>
      )}
    </>
  );
}
