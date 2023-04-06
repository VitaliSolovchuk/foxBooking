import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
// TODO comment for deploy
// const CUSTOM_REQUEST={DEAL: {ID: 134669}, BITRIX_AUTH: "", ALFA_API_KEY: "" }

// eslint-disable-next-line no-use-before-define 
root.render(<App dealId={CUSTOM_REQUEST.DEAL.ID} ALFA_API_KEY={CUSTOM_REQUEST.ALFA_API_KEY} BITRIX_AUTH={CUSTOM_REQUEST.BITRIX_AUTH} />); // eslint-disable-line
