


import style from "./style.module.css";
import {Link} from 'react-router-dom'
import Button from "react-bootstrap/Button";
import capa from "../../images/capa.jpg"



function Inicial() {



  return (
   <>
   <div className={style.bodyhome}>
   <div className={style.container}>
   <h1>Cansado de se perder nas contas?</h1>

      <div className={style.bntInicio}>
      <Link to="/cadastro"><button className={style.bntIni}> Cadastrar Produtos</button></Link>
      <Link to="/exibir"><button className={style.bntIni}>Lista de Produtos Cadastrados</button></Link>
      </div>
      </div>
      </div>
    </>
  );
}

export default Inicial;











