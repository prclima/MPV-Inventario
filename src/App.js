import "./App.css";
import { Routes, Route } from "react-router-dom";
import Exibir from "./page/exibir/exibir";
import Cadastro from "./page/cadastro/cadastro";
import Inicial from "./page/inicial/inicial";
import {Toaster} from 'react-hot-toast'
import Alterar from "./page/alterar/alterar"
import Editar from "./page/editar/editar"


function App() {


  return (
<div> <Toaster/>
    <Routes>
    
      <Route path="/" element={<Inicial />} />
      <Route path="/exibir" element={<Exibir />} />
      <Route path="/cadastro" element={<Cadastro />}/>
      <Route path="/cadastro/alterar/:id" element={<Alterar/>}/>
      <Route path="/editar/:id" element={<Editar />}/>
       
    </Routes>
    </div>
  );
}

export default App;
