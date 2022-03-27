import "./index.css";

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response;
}

postData('http://192.168.1.33:3001/u/hayri/create_folder', {
  folder_name: 'huhu',
  folder_type: 'Thematic folder',
  parent_id: 1,
})
  .then(response => {
    console.log(response)
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  })