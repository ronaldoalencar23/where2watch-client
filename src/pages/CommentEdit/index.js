import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api";

export function CommentEdit() {
  const navigate = useNavigate();
  const { commentId } = useParams();
  const [form, setForm] = useState({
    header: "",
    body: "",
  });

  useEffect(() => {
    async function fetchComment() {
      try {
        const response = await api.get(`/comment/${commentId}`);
        console.log(response);
        delete response.data._id;
        setForm(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchComment();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.put(`/comment/${commentId}`, { ...form });

      navigate(`/comment/${commentId}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(e) {
    try {
      await api.delete(`/comment/${commentId}`);
      navigate(`/profile`);
    } catch (err) {
      console.log(err);
    }
  }

  console.log(form);
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

      <label htmlFor="formBody">Comentário</label>
      <input
        id="formBody"
        name="body"
        type="text"
        value={form.body}
        onChange={handleChange}
      />

      <button type="submit">Salvar</button>
      <button onClick={handleDelete}>Deletar</button>
    </form>
  );
}
