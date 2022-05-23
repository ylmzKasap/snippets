import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const App = (props) => {
    const [currentDemo, setCurrentDemo] = useState('');
    const navigate = useNavigate();
    const url = useLocation();

    const allButtons = [
      'useEffect', 'useReducer', 'useCallback', 'useMemo', 'useRef', 'customHook'];

    useEffect(() => {
      const currentHook = url.pathname.replace('/', '');
      if (allButtons.includes(currentHook)) {
        setCurrentDemo(currentHook);
      }
    }, [url.pathname]);

    return (
      <div id="appContent">
        <div id='buttonContainer'><div className='description'>Other Hooks</div>
          {allButtons.filter(x => x!== currentDemo)
            .map(demo => <button 
              className="nav-button" 
              key={demo}
              onClick={() => navigate(`/${demo}`)}>{demo}</button>)
          }
        </div>
        <div id="demo">
          <div id='currentDemo'>{currentDemo}</div>
          <div className='demoContent'>
            <Outlet />
          </div>
        </div>
      </div>
    );
  };
  
  export default App;