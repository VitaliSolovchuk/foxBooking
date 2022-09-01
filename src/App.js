import './App.css';
import Controller from "./controllers/Controller";
import React, { useEffect, useState } from "react";
import ModalWithLoader from "./components/ModalWithLoader";
import ModuleWithInstance from "./components/ModuleWithInstance";
import { useFetching } from "./hooks/useFetching";

function App() {


  const [isLoad, setIsLoad] = useState(false);
  const [fetchingController, isLoadingController, errorController] = useFetching(async () => await Controller)
  const [controller, setController] = useState(null)

  useEffect(() => {
    fetchingController()
      .then(res => setController(res))
  },[])

  return (<div>
      <ModalWithLoader isView={isLoad || isLoadingController}/>

      {controller && <ModuleWithInstance
        controller={controller}
        setIsLoad={setIsLoad}
      ></ModuleWithInstance>}

      {!!errorController && <div>errorController</div>}
    </div>)

}

export default App;
