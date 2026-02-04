const todo = document.getElementById('todo-output');
const ul =document.querySelector("ul")
 

async function getTodo() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    // const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
      const json = await response.json();

      console.log(json)
        let html ="";
      
      json.forEach((item) => {
        html += `<li>
          ${item.name}:${item.email}
            </li>
          `
      })
      ul.innerHTML = html

    //   todo.innerHTML = json.title;
    //   todo.innerHTML = JSON.stringify(json);
  } catch (error) {
    console.error('There was a problem fetching the data:', error);
  }
}

todo.textContent = 'Loading...';
getTodo();