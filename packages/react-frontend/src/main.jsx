import React from "react";
import ReactDOMClient from "react-dom/client";
import MyApp from "./MyApp";
import "./main.css";

// Create the container
const container = document.getElementById("root");

//Create a root
const root = ReactDOMClient.createRoot(container);

//Initial render: redner an element to the root
root.render(<MyApp />);