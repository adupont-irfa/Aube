import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Point d'entrée qui instancie et monte l'application React.
const rootElement = document.getElementById('root');
if (!rootElement) {
  // On s'assure que l'élément racine existe avant de créer le root React.
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
