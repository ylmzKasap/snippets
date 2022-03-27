import "./index.css";

function component() {
  const element = document.createElement('div');

  let someGuy = 'Webpack';
  element.innerHTML = `Greetings from ${someGuy}`;

  return element;
  }
  
  document.body.appendChild(component());