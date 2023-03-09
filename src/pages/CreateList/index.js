import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";

export function CreateList() {
  const apiKey = "ee19a39b26031e6051b13d07425280fb";
  const navigate = useNavigate();
  const [movie, setMovie] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [form, setForm] = useState({
    name: "",
    titles: [],
  });

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
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
          `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`
        );
        console.log(response.data);
        setTvShows(response.data.results);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTvShows();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/myList", form);
      console.log(response);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }
  function addTitle(title) {
    title.isAdd = true;
    setForm({ ...form, titles: [...form.titles, title] });
  }

  function removeTitle(title) {
    title.isAdd = false;
    const removed = form.titles.filter(
      (currentTitle) => currentTitle.id !== title.id
    );
    setForm({ ...form, titles: [...removed] });
  }

  const allTitles = [...movie, ...tvShows];
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome da lista</label>
        <input id="name" type="text" name="name" onChange={handleChange} />
        <button type="submit">Criar</button>
        {allTitles.map((currentTitle) => {
          return (
            <>
              <img
                src={`https://image.tmdb.org/t/p/w500${currentTitle.poster_path}`}
                alt={currentTitle.title}
              />
              {currentTitle.isAdd ? (
                <button type="button" onClick={() => removeTitle(currentTitle)}>
                  Remover
                </button>
              ) : (
                <button type="button" onClick={() => addTitle(currentTitle)}>
                  Adicionar
                </button>
              )}
            </>
          );
        })}
      </form>
    </>
  );
}
