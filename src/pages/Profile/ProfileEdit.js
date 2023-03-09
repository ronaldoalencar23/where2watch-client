import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
        delete response.data._id;
        setForm(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.put("/user", { ...form });

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }
  console.log(form);
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
