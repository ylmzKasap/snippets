import React, { useState } from 'react';
import { EffectComponent } from './UseEffect';
import { ReducerComponent } from './UseReducer';
import { CallbackComponent } from './UseCallback';
import { MemoComponent } from './UseMemo';
import { RefComponent, RefComponentTwo } from './UseRef';
import { CustomHook } from './CustomHook';

const App = () => {
    const [currentDemo, setCurrentDemo] = useState('useEffect');
    const allButtons = [
      'useEffect', 'useReducer', 'useCallback', 'useMemo', 'useRef', 'customHook'];

    return (
      <div id="appContent">
        <div id='buttonContainer'><div className='description'>Other Hooks</div>
          {allButtons.filter(x => x!== currentDemo)
            .map(demo => <button 
              className="nav-button" 
              key={demo}
              onClick={() => setCurrentDemo(demo)}>{demo}</button>)
          }
        </div>
        <div id="demo">
          <div id='currentDemo'>{currentDemo}</div>
          <div className='demoContent'>
            { currentDemo === 'useEffect' && <EffectComponent /> }
            { currentDemo === 'useReducer' && <ReducerComponent /> }
            { currentDemo === 'useCallback' && <CallbackComponent /> }
            { currentDemo === 'useMemo' && <MemoComponent /> }
            { currentDemo === 'useRef' && <div><RefComponent /> <RefComponentTwo /></div> }
            { currentDemo === 'customHook' && <CustomHook /> }
          </div>
        </div>
      </div>
    );
  };
  
  export default App;