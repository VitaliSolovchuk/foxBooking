import React from 'react';
import CircularIndeterminate from "./Loader";
import { Modal } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.0)'
};

const ModalWithLoader = ({isView}) => {
  return (
    <Modal open={isView} BackdropProps={{sx:{backgroundColor: 'rgba(0, 0, 0, 0.18)'}}}>
      <div>
        <CircularIndeterminate sx={style}></CircularIndeterminate>
      </div>
    </Modal>
  );
};

export default ModalWithLoader;
