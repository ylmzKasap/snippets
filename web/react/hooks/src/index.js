import React from "react";
import { createRoot } from 'react-dom/client'
import RouteSwitch from "./RouteSwitch";
import "./main.scss";

createRoot(
    document.getElementById('app'))
    .render(<RouteSwitch />);