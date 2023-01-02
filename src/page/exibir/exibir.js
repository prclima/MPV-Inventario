import axios from "axios";
import style from "./style.module.css";
import { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";

import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function Exibir() {
  const [show, setShow] = useState([]);
  const [filter, setFilter] = useState();
  const [dbFilter, setDbFilter] = useState([]);
  const [isDeleted, SetIsDeleted] = useState(false);

  useEffect(() => {
    async function BringData() {
      try {
        const response = await axios.get("https://ironrest.cyclic.app/pedro");
        setShow(response.data);
        setDbFilter(response.data);
        SetIsDeleted(false);
      } catch (err) {
        console.log(err);
      }
    }
    BringData();
  }, [isDeleted]);

  function handle(e) {
    const valorDigitado = e.target.value;
    const dataFilter = show.filter((item) => {
      return item.produto.includes(valorDigitado);
    });

    setDbFilter(dataFilter);
  }

  async function Delete(id) {
    try {
      await axios.delete(`https://ironrest.cyclic.app/pedro/${id}`);
      SetIsDeleted(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className={style.cabecalho}>
        <h1> Produtos Cadastrados</h1>
      </div>
      <Link to="/cadastro" style={{ marginLeft: "1.5%" }}>
        <Button> Cadastrar Novo Produto</Button>
      </Link>
      <Link to="/" style={{ marginLeft: "10px" }}>
        <Button> Voltar</Button>
      </Link>

      <div className={style.info}>
        <Stack
          direction="horizontal"
          gap={5}
          style={{
            width: "420px",
            marginLeft: "20px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <Form.Control
            className="me-auto"
            placeholder="Filtrar..."
            onChange={handle}
          />
        </Stack>
      </div>
      <Table striped style={{ marginLeft: "10px" }}>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Valor do Estoque</th>
            <th> Conferido?</th>
          </tr>
        </thead>
        <tbody>
          {dbFilter.map((item) => (
            <tr key={item._id}>
              <td>{item.produto}</td>
              <td>{item.qtd}</td>
              <td>
                {(item.valor * 1).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
              <td>
                {(item.qtd * item.valor).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>

              <td>
                {" "}
                <Form.Check inline name="group1" />
              </td>
              <td>
                <Link to={`/cadastro/alterar/${item._id}`}>
                  <Button colorScheme="green">Veja mais</Button>
                </Link>

                <Link to={`/editar/${item._id}`}>
                  <Button colorScheme="yellow" style={{ marginLeft: "15px" }}>
                    Alterar
                  </Button>
                </Link>

                <Button
                  colorScheme="red"
                  style={{ marginLeft: "15px" }}
                  onClick={() => {
                    Delete(item._id);
                  }}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
export default Exibir;
