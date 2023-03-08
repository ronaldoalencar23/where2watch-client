import { Link } from "react-router-dom";
export function Navbar() {
  return (
    <div>
      <Link to="/">
        <h1>Where 2 Watch</h1>
      </Link>
      <Link to="/signup">
        <button>Cadastre-se</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/profile">
        <button>Perfil</button>
      </Link>
      <Link to="/createList">
        <button>Criar Lista +</button>
      </Link>
    </div>
  );
}