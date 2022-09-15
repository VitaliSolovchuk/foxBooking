import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
// TODO comment for deploy
// const CUSTOM_REQUEST={DEAL: {ID: 120873}} //120001 120873 121395
// eslint-disable-next-line no-undef
root.render(<App dealId={CUSTOM_REQUEST.DEAL.ID}/>);
