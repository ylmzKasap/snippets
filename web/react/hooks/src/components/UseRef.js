import React, {useState, useEffect, useRef} from 'react';

export function RefComponent() {
  const [timer, setTimer] = useState(0);
  const interValRef = useRef();

  useEffect(() => {
    interValRef.current = setInterval(() => {
      setTimer(timer => timer + 1)
    }, 1000);

    return () => {
      clearInterval(interValRef.current);
    }
  }, [])

  return (
    <div>
      HookTimer - {timer} -
      <button onClick={() => clearInterval(interValRef.current)}>Clear Timer</button>
    </div>
  )
}

export function RefComponentTwo() {
	const inputRef = useRef(null)

	useEffect(() => {
		inputRef.current.focus()
	}, [])

	return (
		<div style={{"marginTop": "10px"}}>
            Auto Focus <br />
			<input ref={inputRef} type="text" />
		</div>
	)
}