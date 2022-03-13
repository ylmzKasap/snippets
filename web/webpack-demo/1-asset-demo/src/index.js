import myName from './myName';
import './style.css';
import Icon from './icon.png';
import Data from './data.xml';
import Notes from './data.csv';

function component() {
  const element = document.createElement('div');

  element.textContent = myName('Cody');
  element.classList.add('hello');

  // Add the image to our existing div.
  const myIcon = new Image();
  myIcon.src = Icon;
  document.body.appendChild(myIcon);

  return element;
  }

  console.log(Data);
  console.log(Notes);
  
  document.body.appendChild(component());