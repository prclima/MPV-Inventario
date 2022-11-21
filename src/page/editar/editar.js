import style from "./style.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Editar() {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function trazerEspecifico() {
      try {
        const response = await axios.get(
          `https://ironrest.cyclic.app/pedro/${params.id}`
        );
        setForm(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    trazerEspecifico();
  }, []);

  const [form, setForm] = useState({
    produto: "",
    qtd: 0,
    valor: 0,
    observações: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.valueIsNumber
        ? e.target.valueAsNumber
        : e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const infosSemId = { ...form };
      delete infosSemId._id;

      const response = await axios.put(
        `https://ironrest.cyclic.app/pedro/${params.id}`,
        infosSemId
      );
      toast.success("Produto Alterado!");

      navigate("/exibir");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className={style.cabecalho}>
        <h1>Formulário de Edição</h1>
      </div>

      <div className={style.formulario}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="basic">
            <Form.Label>Produto:</Form.Label>
            <Form.Control
              disabled
              type="text"
              placeholder="Informe o Produto"
              value={form.produto}
              name="produto"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="basic">
            <Form.Label>Unidades</Form.Label>
            <Form.Control
              type="number"
              placeholder="Quntas Unidades?"
              value={form.qtd}
              name="qtd"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="basic">
            <Form.Label>Valor</Form.Label>
            <Form.Control
              type="number"
              placeholder="Valor Unitário"
              value={form.valor}
              name="valor"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="basic">
            <Form.Label>Observações</Form.Label>
            <Form.Control
              type="text"
              placeholder="Há alguma observação?"
              value={form.observações}
              name="observações"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className={style.btnConfirm}>
            <button
              className={style.bntCadastro}
              style={{ marginRight: "70px" }}
            >
              {" "}
              Alterar
            </button>
            <Link to="/exibir">
              <Button>Voltar</Button>
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Editar;
