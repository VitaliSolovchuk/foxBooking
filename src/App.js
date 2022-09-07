import './App.css';
import Controller from "./controllers/Controller";
import React, { useEffect, useState } from "react";
import ModalWithLoader from "./components/UI/ModalWithLoader";
import ModuleWithInstance from "./components/ModuleWithInstance";
import { useFetching } from "./hooks/useFetching";

function App({dealId}) {


  const [isLoad, setIsLoad] = useState(false);
  const [fetchingController, isLoadingController, errorController] = useFetching(async () => await Controller.build(dealId))
  const [controller, setController] = useState(null)

  useEffect(() => {
    fetchingController()
      .then(res => setController(res))
  },[])

  return (<div>
      <ModalWithLoader isView={isLoad || isLoadingController}/>

      {controller && <ModuleWithInstance
        controller={controller}
        isLoad={isLoad}
        setIsLoad={setIsLoad}
      ></ModuleWithInstance>}

      {!!errorController && <div>errorController</div>}
    </div>)

}

export default App;
