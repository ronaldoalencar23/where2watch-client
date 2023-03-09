import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AuthContextComponent } from "./contexts/authContext";
import { Profile } from "./pages/Profile";
import { ErrorPage } from "./pages/ErrorPage";
import { Feed } from "./pages/Feed";
import { Navbar } from "./components/Navbar";
import { ProfileEdit } from "./pages/Profile/ProfileEdit";
import { Comment } from "./components/Comment";
import { CreateList } from "./pages/CreateList";
import { TitleMovie } from "./pages/TitleMovie";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { TitleTvShow } from "./pages/TitlteTvShow";

function App() {
  return (
    <>
      <AuthContextComponent>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={<ProtectedRoute component={Profile} />}
          />
          <Route
            path="/profile/edit"
            element={<ProtectedRoute component={ProfileEdit} />}
          />
          <Route path="/create-list" element={<CreateList />} />
          <Route path="/title/movie/:id" element={<TitleMovie />} />
          <Route path="/title/tv-show/:id" element={<TitleTvShow />} />
          <Route path="/feed" element={<ProtectedRoute component={Feed} />} />
          <Route path="*" element={<ErrorPage />} />
          <Route
            path="/comment"
            element={<ProtectedRoute component={Comment} />}
          />
        </Routes>
      </AuthContextComponent>
    </>
  );
}

export default App;
