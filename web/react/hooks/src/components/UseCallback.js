import React, { useState, useEffect, useCallback } from 'react';


export const CallbackComponent = () => {
    const [number, setNumber] = useState(1);
    const [dark, setDark] = useState(false);

    // useEffect in List component will not trigger when theme is changed
    const getItems = useCallback(() => {
        return [number, number + 1, number + 2]
    }, [number]);

    const handleNumber = (event) => {
        const maxRange = 999999999999;
        if (!event.target.value) {
            return '';}
        if (Math.abs(parseInt(event.target.value)) > maxRange) {
            return parseInt(event.target.value) > 0 ? maxRange : -maxRange;}
        return (parseInt(event.target.value))
    }

    const theme = {
        backgroundColor: dark ? '#333' : '#FFF',
        color: dark ? '#FFF': '#333'
    }

    return (
        <div style={theme}>
            <input
                type="number"
                value={number}
                onChange={e => setNumber(handleNumber(e))}
            />
            <button onClick={() => setDark(prev => !prev)}>Toggle theme</button>
            {!isNaN(number) && <List getItems={getItems} />}
        </div>
    )
}

// List will not re-render when theme is changed
const List = React.memo(({ getItems }) => {
    const [items, setItems] = useState([]);
    console.log('List rendered')

    useEffect(() => {
        setItems(getItems());
        console.log('Updating items');
    }, [getItems])

    return items.map(item => <div key={item}>{item}</div>)
})