import "./index.css";

const img = document.querySelector('img');

fetch('https://api.giphy.com/v1/gifs/translate?api_key=iYsKzkT1kEc4Caym7pCn416N7lcLoaJV&s=road', {mode: 'cors'})
.then(function(response) {
  return response.json();
})
.then(function(response) {
  img.src = response.data.images.original.url
});