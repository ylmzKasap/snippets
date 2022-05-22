import React, { useState, useEffect } from 'react';

const getSavedValue = (key, initialValue) => {
    const savedValue = JSON.parse(localStorage.getItem(key));
    if (savedValue) return savedValue;
    return initialValue;
}

// Custom hook one handling local storage
const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => getSavedValue(key, initialValue));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
}

// Custom hook two logging changing value
const useUpdateLogger = (value) => {
    useEffect(() => {
        console.log(value);
    }, [value]);
}

export const CustomHook = () => {
    const [name, setName] = useLocalStorage('name', '');
    useUpdateLogger(name);

    return (
        <div>
            Saved Text <br />
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
            />
        </div>
    )
}