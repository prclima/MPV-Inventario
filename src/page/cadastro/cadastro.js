import style from "./style.module.css";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function Cadastro() {
  const navigate = useNavigate();
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
      const response = await axios.post(
        "https://ironrest.cyclic.app/pedro",
        form
      );
      toast.success("Produto Cadastrado!");
      navigate("/exibir");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.cabecalho}>
          <h1>Formulário de Cadastro</h1>
        </div>

        <div className={style.formulario}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="basic">
              <Form.Label>Produto:</Form.Label>
              <Form.Control
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
                value={form.valor.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
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
              />
            </Form.Group>
            <div className={style.btnConfirm}>
              <Button type="submit" style={{ marginRight: "10px" }}>
                Cadastrar
              </Button>
              <Link to="/exibir">
                <Button>Voltar</Button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Cadastro;
