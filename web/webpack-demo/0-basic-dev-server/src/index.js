import _ from 'lodash';
import "./index.css";

function component() {
  const element = document.createElement('div');

  element.innerHTML = _.join(['Greetings', 'from', 'webpack'], ' ');

  return element;
  }
  
  document.body.appendChild(component());