import style from "./style.module.css";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import capa from "../../images/capa2.jpg";

function Inicial() {
  return (
    <>
      <div className={style.container}>

        <img src={capa} alt="erro" />

        <div className={style.buttons}>
        <div className={style.info}>
          <Link to="/cadastro">
            <Button size="lg" colorScheme="whatsapp" className={style.bntIni}>
              Cadastrar Produtos
            </Button>
          </Link>
          <Link to="/exibir">
            <Button size="lg" colorScheme="yellow" className={style.bntIni}>
              Lista de Produtos Cadastrados
            </Button>
          </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Inicial;
