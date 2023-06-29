/*
Theoretical Question
Explain in your own words what AJAX is and how it is useful in JavaScript development.
AJAX -Asynchronous Javascript and XML allows us to request data from web servers from dynamically.Let's imagine we have an application and when user or developer click button it should be displayed movies list (like below code).in this example client or developer sent HTTP request to the web server which has the data which we want to receive (request type can be get (retrive data from web server or post(send data to the server) etc)).The communication happens with AJAX calls.
*/
const root = document.querySelector("#root");

// Function to display loading animation
const displayLoading = (parentElement) => {
  const loader = document.createElement("div");
  loader.classList.add("loader");
  loader.style.display = "block";
  for (let i = 1; i <= 4; i++) {
    const span = document.createElement("span");
    loader.appendChild(span);
  }
  parentElement.appendChild(loader);
};

// Function to hide loading animation
const hideLoading = (parentElement) => {
  const loader = parentElement.querySelector(".loader");
  if (loader) {
    loader.style.display = "none";
  }
};

const fetchData = (url) => {
  try {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};
console.log(fetchData)
fetchData("https://ajax.test-danit.com/api/swapi/films")
  .then((data) => {
    data.forEach((item) => {
      const div = document.createElement("div");
      const title = document.createElement("h2");
      const paragraph = document.createElement("p");
      const ul = document.createElement("ul");
      root.appendChild(div);
      div.appendChild(title);
      displayLoading(div);
      div.appendChild(paragraph);
      div.appendChild(ul);
      title.textContent = `${item.name}: Episode ${item.episodeId}`;
      paragraph.textContent = item.openingCrawl;
      Promise.all(item.characters.map(fetchData))
        .then((characters) => {
          hideLoading(div);
          characters.forEach((character) => {
            const li = document.createElement("li");
            ul.appendChild(li);
            li.textContent = character.name;
          });
        })
        .catch((err) => console.log(err));
    });
  })
  .catch((err) => console.log(err));

