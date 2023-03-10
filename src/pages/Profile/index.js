import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";
import { Link } from "react-router-dom";

export function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    comments: {
      header: "",
      body: "",
      _id: "",
    },
    lists: {
      name: "",
      _id: "",
    },
  });
  const [load, setLoad] = useState(true);
  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(AuthContext);
  useEffect(() => {
    async function fetchUser() {
      const response = await api.get("/user/profile");
      setUser(response.data);
      setLoad(!load);
    }

    fetchUser();
  }, []);

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/");
  }
  console.log(user);
  return (
    <>
      {!load && (
        <>
          <h1>{user.name}</h1>
          <p>{user.email}</p>

          {user.comments.map((currentComment) => {
            return (
              <>
                <Link to={`/comment/${currentComment._id}`}>
                  <h2>{currentComment.header}</h2>
                </Link>
                <p>{currentComment.body}</p>
              </>
            );
          })}

          {user.lists.map((currentList) => {
            return (
              <>
                <Link to={`/list/${currentList._id}`}>
                  <h2>{currentList.name}</h2>
                </Link>
              </>
            );
          })}
        </>
      )}
      <Link to="/profile/edit">
        <button>Editar</button>
      </Link>
      <button onClick={handleLogOut}>Sair</button>
    </>
  );
}
