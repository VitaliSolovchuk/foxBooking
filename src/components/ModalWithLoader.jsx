import React from 'react';
import CircularIndeterminate from "./UI/Loader";
import { Modal } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const ModalWithLoader = ({isView}) => {
  return (
    <Modal open={isView} >
      <div>
        <CircularIndeterminate sx={style}></CircularIndeterminate>
      </div>
    </Modal>
  );
};

export default ModalWithLoader;
