const root = document.querySelector("#root")
// Function to display loading animation
const displayLoading = (parentElement) => {
const loader = document.createElement('div');
loader.classList.add('loader');
 loader.style.display = 'block';
  for (let i = 1; i <= 4; i++) {
    const span = document.createElement("span");
    loader.appendChild(span);
  }
  
    parentElement.appendChild(loader);
}

// Function to hide loading animation
const hideLoading = (data) => {
    for(let i=0;i<data.length;i++){
         const loader=document.querySelectorAll('.loader')[i]
  loader.style.display = 'none';
    }
   
}

const fetchData = () => {
  try {
    return fetch("https://ajax.test-danit.com/api/swapi/films")
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

fetchData().then((data) => {
  data.forEach((item) => {
    const div = document.createElement('div');
    const title = document.createElement('h2');
    const paragraph = document.createElement('p');
    const ul = document.createElement('ul');
    root.appendChild(div);
    div.appendChild(title);
    displayLoading(div);
    div.appendChild(paragraph);
    div.appendChild(ul);
    title.textContent = `${item.name}: ${item.episodeId}`;
    paragraph.textContent = item.openingCrawl; 
    item.characters.map((url) => {
      fetch(url)
        .then((res) => res.json())
        .then((character) => {
          hideLoading(data)
          const li = document.createElement('li');
          ul.appendChild(li);
          li.textContent = character.name;
        })
        .catch((err) => console.log(err))
    });
  });
});
