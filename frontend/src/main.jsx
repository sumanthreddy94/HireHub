import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './index.css';

export const Context = createContext({ isAuthorized: false });

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
      <App />
    </Context.Provider>
  );
};

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  // If there's already a root, use the existing root's render method
  const existingRoot = ReactDOM.createRoot(rootElement);
  existingRoot.render(
    <React.StrictMode>
      <AppWrapper />
    </React.StrictMode>
  );
} else {
  // Otherwise, create a new root
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AppWrapper />
    </React.StrictMode>
  );
}