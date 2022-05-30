import React from "react";
import { createRoot } from 'react-dom/client'
import RouteSwitch from "./RouteSwitch";
import "./index.css";

createRoot(
    document.getElementById('app'))
    .render(<RouteSwitch />);