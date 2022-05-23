import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EffectComponent } from './components/UseEffect';
import { ReducerComponent } from './components/UseReducer';
import { CallbackComponent } from './components/UseCallback';
import { MemoComponent } from './components/UseMemo';
import { RefComponent, RefComponentTwo } from './components/UseRef';
import { CustomHook } from './components/CustomHook';
import App from "./components/App";

const RouteSwitch = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route path="useEffect" element={<EffectComponent />} />
                    <Route path="useReducer" element={<ReducerComponent />} />
                    <Route path="useCallback" element={<CallbackComponent />} />
                    <Route path="useMemo" element={<MemoComponent />} />
                    <Route path="useRef" element={<div> <RefComponent /> <RefComponentTwo /> </div>} />
                    <Route path="customHook" element={<CustomHook />} />
                    <Route path="*" element={<h2>Page not found</h2>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;