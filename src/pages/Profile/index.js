import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";
import { Link } from "react-router-dom";

export function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(AuthContext);
  useEffect(() => {
    async function fetchUser() {
      const response = await api.get("/user/profile");
      setUser(response.data);
    }

    fetchUser();
  }, []);

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/");
  }

  return (
    <>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <Link to="/profile/edit">
        <button>Editar</button>
      </Link>
      <button onClick={handleLogOut}>Sair</button>
    </>
  );
}
