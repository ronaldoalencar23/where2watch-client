import { useEffect, useState } from "react";
import { createRoutesFromChildren, useNavigate } from "react-router-dom";
import { api } from "../../api/api";

export function ProfileEdit() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/user/profile");
        console.log(response);
        delete response.user._id;
        setForm({ ...response.data });
      } catch (error) {}
    }
    fetchUser();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.put("/api/user", { ...form });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="formName">Nome:</label>
      <input
        id="formName"
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
      />

      <label htmlFor="formEmail">E-mail:</label>
      <input
        id="formEmail"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />

      <button type="submit">Cadastrar</button>
    </form>
  );
}
