import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../api/api";

export function ListDetail() {
  const [load, setLoad] = useState(true);
  const [list, setList] = useState({
    name: "",
    titles: {
      poster_path: "",
    },
  });
  const { myListId } = useParams();

  useEffect(() => {
    async function fetchList() {
      try {
        const response = await api.get(`/myList/${myListId}`);
        setList(response.data);
        setLoad(!load);
      } catch (err) {
        console.log(err);
      }
    }
    fetchList();
  }, []);

  console.log(list);
  return (
    <>
      {!load && (
        <div>
          <h1 class="title list"><span>{list.name}</span></h1>
          <br />

          <div class="form-painel list">
          {list.titles.map((currentTitle) => {
            return (
              <div class="movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${currentTitle.poster_path}`}
                alt={list.name}
              />
              </div>
            );
          })}

          {/* <Link to={`/list/edit/${listId}`}>
                <button>Editar</button>
              </Link> */}
            </div>
        </div>
      )}
    </>
  );
}
