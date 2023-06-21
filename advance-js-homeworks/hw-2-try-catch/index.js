/*
         Theoretical Question
1.Provide a few examples of when it is appropriate to use the try...catch construct in code.

1.const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/01');
      if (!response.ok) {
        throw new Error('Error: Response status ' + response.status);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.table(error);
    }
  };
  
  fetchData();

we used try...catch in above code,because we try to fetch data and if there is any problem related to wrong url, network error etc.,catch block will work and error will be displayed console

2. try{
let json = '{name:"Banu", age: 23}';  
let user = JSON.parse(json); 
console.log( user.name ); 
console.log( user.age ); 
}
 catch(err){
    console.error(err)//output: Expected property name or '}' in JSON at position 1
 }

 if we will define json property like that :
    let json = '{"name":"Banu", "age": 23}';  it will work without any errors

3.try{
    getData()
    }
catch(err){
        console.table(err)//Reference error
     }

We didn't define getData function so it gave error
*/

const books = [
    {
        author: "Lucy Foley",
        name: "List of Invitees",
        price: 70
    },
    {
        author: "Susanna Clarke",
        name: "Jonathan Strange & Mr Norrell",
    },
    {
        name: "Design. A Book for Non-Designers.",
        price: 70
    },
    {
        author: "Alan Moore",
        name: "Neonomicon",
        price: 70,
    },
    {
        author: "Terry Pratchett",
        name: "Moving Pictures",
        price: 40
    },
    {
        author: "Angus Hyland",
        name: "Cats in Art",
    }
];
function createBookList() {
    let bookFields = [];
    for (let book of books) {
        bookFields = [...bookFields, ...Object.keys(book)];
    }
    console.log(bookFields)
    return Array.from(new Set(bookFields));
}

function validateBook() {
    const arrayOfProperties = createBookList();
    const root = document.querySelector('#root');
    for (let book of books) {
        const missingProperties = arrayOfProperties.filter(property => !Object.keys(book).includes(property));
        try {
            if (missingProperties.length === 0) {
                const list = document.createElement('ul');
                root.appendChild(list);
                Object.entries(book).map((key) => {
                    const item = document.createElement('li');
                    item.textContent = `${key[0]}: ${key[1]} `;
                    list.appendChild(item);
                })
            } else {
                throw new Error(`Missing property in the book object: ${missingProperties}`);
            }
        } catch (err) {
            console.error(err);
        }
    }
}
validateBook();
