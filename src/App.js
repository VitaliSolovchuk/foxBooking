import './App.css';
import Controller from "./controllers/Controller";
import { useAsync } from "react-async"
import React, { useState } from "react";
import ModalWithLoader from "./components/ModalWithLoader";
import ModuleWithInstance from "./components/ModuleWithInstance";

function App() {


  const [isLoad, setIsLoad] = useState(false);
  const { ControllerWithInstance, error, isPending } = useAsync(Controller)


return (
  <div>
    <ModalWithLoader isView={isLoad || isPending}/>

    <ModuleWithInstance
      Controller={ControllerWithInstance}
      setIsLoad={setIsLoad}
    ></ModuleWithInstance>

    {error && <div>ОШИБКА</div>}
  </div>
)

}

export default App;
