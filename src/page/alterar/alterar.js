import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom' 
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';

function Alterar(){
    const[prod, setProd] = useState({})
    const params = useParams();

    useEffect(() => {
        async function trazerEspecifico(){
            try {
                const response = await axios.get(`https://ironrest.cyclic.app/pedro/${params.id}`)
                setProd(response.data)
            }
            catch(err){
                console.log(err)
            }
        }
        trazerEspecifico();
    },[])
    return(
        <>

        <Card style={{ width: '18rem', border: 'black solid 1px', marginLeft: '1%', marginTop: '30px'}}>
        <Card.Body>
          <Card.Title>Nome Produto: {prod.produto}</Card.Title>
         
          <Card.Text>
          Em estoque temos {prod.qtd} unidades. O valor unitário é {prod.valor}.
          -----------------------------------
          Observação:  
          {(prod.observações ? prod.observações : ' Sem observação cadastrada.')}
          </Card.Text>
          <Link to="/exibir"> 
        <Button style={{marginLeft: '35%'}}>Voltar</Button>
        </Link>
        </Card.Body>
      </Card>
        
        
      </>
    )
}

export default Alterar;