import React, { useReducer } from "react";

const handleNumbers = (state, action) => {
    if (action.type === 'increment_first') {
        return {...state, count: state.count + action.value};
    } else if (action.type === 'decrement_first' && state.count - action.value > 0) {
        return {...state, count: state.count - action.value};
    } else if (action.type === 'increment_second') {
        return {...state, count2: state.count2 + action.value};
    } else if (action.type === 'decrement_second' && state.count2 - action.value > 0) {
        return {...state, count2: state.count2 - action.value};
    } else {
        return {count: state.count, count2: state.count2};
    }
}

export const ReducerComponent = (props) => {
    const [number, setNumber] = useReducer(handleNumbers, {count: 0, count2: 0});

    return (
        <div>
            <div>{number.count}</div>
            <button onClick={() => setNumber({type: 'increment_first', value: 5})}>++</button>
            <button onClick={() => setNumber({type: 'increment_first', value: 1})}>+</button>
            <button onClick={() => setNumber({type: 'decrement_first', value: 1})}>-</button>
            <button onClick={() => setNumber({type: 'decrement_first', value: 5})}>--</button>
            <div>{number.count2}</div>
            <button onClick={() => setNumber({type: 'increment_second', value: 1})}>+</button>
            <button onClick={() => setNumber({type: 'decrement_second', value: 1})}>-</button>
        </div>
    )
}