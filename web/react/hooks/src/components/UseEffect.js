import React, { useState, useEffect } from 'react';

export const EffectComponent = (props) => {
  const [color, setColor] = useState("black");
  
  useEffect(() => {
    const changeColorOnClick = () => {
      if (color === "black") {
        setColor("red");
      } else {
        setColor("black");
      }
    };
    
    document.addEventListener("click", changeColorOnClick);
    
    return () => {
      document.removeEventListener("click", changeColorOnClick);
    };
  }, [color]);
  
  return (
    <div>
      <div
        id="effect"
        style={{
          backgroundColor: color,
          color: "white",
      }}
      > This div can change color. Click on me!
      </div>
    </div>
    )
}