import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import Modal from "react-modal";
document.body.style.backgroundColor = "#f0f0f0";
Modal.setAppElement("#root");

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);