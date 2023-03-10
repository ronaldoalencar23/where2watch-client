import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../api/api";

export function Comment(props) {
  const { id } = useParams();
  const [form, setForm] = useState({
    header: "",
    body: "",
    title: {},
    // isMovie: true,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post(`/comment/${id}`, { ...form, title: props.title });

      setForm({ header: "", body: "" }); // limpa o formulário
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="formHeader">Título</label>
      <input
        id="formHeader"
        name="header"
        type="text"
        value={form.header}
        onChange={handleChange}
      />
      <label htmlFor="formComment">Comentário</label>
      <textarea
        id="formComment"
        name="body"
        value={form.body}
        onChange={handleChange}
      />
      <button type="submit">Postar</button>
    </form>
  );
}
