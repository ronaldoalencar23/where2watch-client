import { Link } from "react-router-dom";
export function Navbar() {
  return (
    <div class="navbar bg-dark fixed-top">
      <Link to="/">
        <h1>Where 2 Watch</h1>
      </Link>
      <div class="space"></div>
      <Link to="/signup">
        <button>Cadastre-se</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/profile">
        <button>Perfil</button>
      </Link>
      <Link to="/create-list">
        <button>Criar Lista +</button>
      </Link>
      <Link to="/comment">
        <button>Comentar</button>
      </Link>
    </div>
  );
}
