import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function Exibir() {
  const [show, setShow] = useState([]);
  const [filter, setFilter] = useState();
  const [dbFilter, setDbFilter] = useState([]);
  const [isDeleted, SetIsDeleted] = useState(false)

  useEffect(() => {
    async function trazerDados() {
      try {
        const response = await axios.get("https://ironrest.cyclic.app/pedro");
        setShow(response.data);
        setDbFilter(response.data);
        SetIsDeleted(false)
      } catch (err) {
        console.log(err);
      }
    }
    trazerDados();
  }, [isDeleted], );

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
      SetIsDeleted(true)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1 style={{ marginLeft: "40%", marginBottom: "30px" }}>
        {" "}
        Lista de Produtos
      </h1>

      <Link to="/cadastro" style={{ marginLeft: "2.5%" }}>
        <Button> Cadastrar Novo Produto</Button>
      </Link>
      <Link to="/" style={{ marginLeft: "10px" }}>
        <Button> Voltar</Button>
      </Link>

      <Stack
        direction="horizontal"
        gap={5}
        style={{
          width: "420px",
          marginLeft: "49px",
          marginTop: "30px",
          marginBottom: "10px",
        }}
      >
        <Form.Control
          className="me-auto"
          placeholder="Filtrar..."
          onChange={handle}
        />
      </Stack>

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
              <td>{item.valor}</td>
              <td>{item.qtd * item.valor}</td>

              <td>
                {" "}
                <Form.Check inline name="group1" />
              </td>
              <td>
                <Link to={`/cadastro/alterar/${item._id}`}>
                  <Button variant="outline-info">Veja mais</Button>
                </Link>

                <Link to={`/editar/${item._id}`}>
                  <Button
                    variant="outline-warning"
                    style={{ marginLeft: "15px" }}
                  >
                    Alterar
                  </Button>
                </Link>

                <Button
                  variant="outline-danger"
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
