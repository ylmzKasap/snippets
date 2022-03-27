import './style.css'

import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export function renderMain(Component, propObject) {
    if (propObject === undefined) {
        propObject = {};
    }

    ReactDOM.render(
        <React.StrictMode>
            <Component {...propObject} />
        </React.StrictMode>,
        document.getElementById("main-app")
    );
}

const dragContext = React.createContext();

const DragTest = () => {
    const [data, setData] = useState([
        {"title": "group-1", "items": ['item 1', 'item 2', 'item 3']},
        {"title": "group-2", "items": ['item 4', 'item 5']},
        {"title": "group-3", "items": ['item 6', 'item 7', 'item 8', 'item 9']}
    ]);

    const [cloneElement, setCloneElement] = useState("");
    const [cloneStyle, setCloneStyle] = useState({});
    const [cloneTimeout, setCloneTimeout] = useState({'exists': false, 'timeouts': ""});

    const [draggedElement, setDraggedElement] = useState({});
    const [dragCount, setDragCount] = useState(0);
    const [isDragging, setDrag] = useState(false);


    useEffect(() => {
        if (draggedElement.exists && Object.keys(cloneStyle).length && isDragging) {
            setCloneElement(<DragClone item={draggedElement.name} cloneStyle={cloneStyle} />)
        }
    }, [cloneStyle, draggedElement, isDragging])
    
    
    const resetDrag = () => {
        setCloneElement("");
        setCloneStyle({});
        setDraggedElement({});
        setDrag(false);
        setCloneTimeout({'exists': false, 'timeouts': ""});
    }


    const handleMouseAction = (event) => {
        if (draggedElement.exists > 0 && !cloneTimeout.exists) {
            setDragCount(count => count + 1);
            if (dragCount > 7) {
                setCloneStyle({
                    "width": "150px",
                    "backgroundColor": "rgb(142, 47, 230)",
                    "left": `${event.clientX + 5}px`,
                    "top": `${event.clientY + 5}px`,
                    "boxShadow": "0px 3px 6px black",
                    "transition": "width .3s, background-color .3s"
                });
                setDrag(true);
                setCloneElement(<DragClone item={draggedElement.name} cloneStyle={cloneStyle} />)
            } 
        }
    }

    const handleMouseUp = (event) => {
        if (draggedElement.exists && !['drag-group', 'drag-filler'].includes(event.target.className)) {
            const { top, left, width } = draggedElement.clonedStyle;
            setDragCount(0);
            
            setCloneStyle({
                "width": `${width}px`,
                "backgroundColor": "rgb(230, 150, 47)",
                "left": `${left}px`,
                "top": `${top}px`,
                "transition": ".3s"
            });

            setCloneTimeout({
                'exists': true,
                'timeouts': setTimeout(() => resetDrag, 300)
            });
        }
    }

    return (
        <dragContext.Provider value={
            {"draggedElement": draggedElement,
            "setDraggedElement": setDraggedElement,
            "isDragging": isDragging,
            "setCloneStyle": setCloneStyle,
            "cloneTimeout": cloneTimeout,
            "resetDrag": resetDrag,
            "setData": setData}}>
            <div className='drag-container'
                onMouseMove={handleMouseAction}
                onMouseUp={handleMouseUp}
                >
                {data.map(group => (
                    <DragGroup title={group['title']} items={group['items']} key={group.title}/>
                ))}
                {cloneElement}
            </div>
        </dragContext.Provider>
    )
}


const DragGroup = (props) => {
    const [selfStyle, setSelfStyle] = useState({});
    const { isDragging, setData, draggedElement, cloneTimeout, resetDrag } = useContext(dragContext);

    const handleMouseHover = (event) => {
        if (isDragging && !cloneTimeout.exists) {
            if (event.type === "mouseover") {
                if (event.target.className === 'drag-group') {
                    setSelfStyle({"borderBottom": "dashed white 5px"})
                } else {
                    setSelfStyle({})
                }
            } else {
                setSelfStyle({})
            }   
        }    
    }

    const handleMouseUp = (event) => {
        if (isDragging  && !cloneTimeout.exists) {
            if (event.target.className === 'drag-group') {
                // Remove from its prior place.
                setData(data => data.map(obj => {
                    if (obj.title === draggedElement.group) {
                        for (let i = 0; i < obj.items.length; i++) {
                            if (obj.items[i] === draggedElement.name) {
                                const newOrder =  [...obj.items.slice(0, i), ...obj.items.slice(i + 1)];
                                return {"title": obj.title, "items": newOrder};
                            }
                        }
                    } else {
                        return obj;
                    }
                }));
                // Push item to the group.
                setData(data => data.map(obj => {
                    if (obj.title === props.title) {
                        return {"title": obj.title, "items": obj.items.concat(draggedElement.name)};
                } else {
                    return obj;
                }}))
            
            setSelfStyle({});
            resetDrag();            
            }
        }
    }

    return (
        <div className='drag-group' style={selfStyle}
        onMouseOver={handleMouseHover} onMouseOut={handleMouseHover} onMouseUp={handleMouseUp}>
            {props.title}
            {props.items.map(item => (
                <DragItem item={item} key={item} group={props.title} />
            ))}         
        </div>
        )
}


const DragItem = (props) => {
    const [selfStyle, setSelfStyle] = useState({});
    const [fillerStyle, setFillerStyle] = useState({});
    const { draggedElement, setDraggedElement, setData,
        isDragging, setCloneStyle, cloneTimeout, resetDrag } = useContext(dragContext);

    useEffect(() => {
        if (isDragging && props.item === draggedElement.name) {
            setSelfStyle({"opacity": 0.6, "transition": "opacity .3s"})
        } else {
            setSelfStyle({"opacity": 1});
        }
    }, [isDragging, draggedElement, props.item]);

    const handleMouseDown = (event) => {
        if (!cloneTimeout.exists) {
            const elementDimensions = event.target.getBoundingClientRect();
            setCloneStyle({
            "left": `${elementDimensions.left}px`,
            "top": `${elementDimensions.top}px`,
            });
            setDraggedElement({
                'name': props.item, 'exists': true,
                "group": props.group,
                'clonedStyle': elementDimensions});
        }
    }

    const handleFillerHover = (event) => {
        const siblingName = event.target.nextElementSibling.innerText;
        if (siblingName !== draggedElement.name) {
            if (isDragging && !cloneTimeout.exists) {
                if (event.type === 'mouseover') {
                    setFillerStyle({"border": "dashed white"});
                } else {
                    setFillerStyle({});
                }   
            }
        }
    }

    const handleSwitch = (event) => {
        const siblingName = event.target.nextElementSibling.innerText;
        if (isDragging && !cloneTimeout.exists) {
            if (siblingName !== draggedElement.name) {
                // Remove from its prior place.
                setData(data => data.map(obj => {
                    if (obj.title === draggedElement.group) {
                        for (let i = 0; i < obj.items.length; i++) {
                            if (obj.items[i] === draggedElement.name) {
                                const newOrder =  [...obj.items.slice(0, i), ...obj.items.slice(i + 1)];
                                return {"title": obj.title, "items": newOrder};
                            }
                        }
                    } else {
                        return obj;
                    }
                }));
                // Insert into the dragged place.
                setData(data => data.map(obj => {
                    if (obj.title === props.group) {
                        for (let i = 0; i < obj.items.length; i++) {
                            if (obj.items[i] === event.target.nextElementSibling.innerText) {
                                const newOrder = [...obj.items.slice(0, i), draggedElement.name, ...obj.items.slice(i)];
                                return {"title": obj.title, "items": newOrder};
                            }
                        }
                    } else {
                        return obj;
                    }
                }));
            }
            setFillerStyle({});
            resetDrag();
        }
    }

    return (
        <div className='drag-item-container'>
            <div className='drag-filler' style={fillerStyle}
            onMouseOver={handleFillerHover} onMouseLeave={handleFillerHover} onMouseUp={handleSwitch}/>
            <div className='drag-item'
                style={selfStyle}
                onMouseDown={handleMouseDown}>
            {props.item}
            </div>
        </div>
    )
}

const DragClone = (props) => {
    return (
        <div className='drag-item-clone' style={props.cloneStyle}>
            {props.item}
        </div>
    )
}

renderMain(DragTest, {});