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
try{
    getData()
    }
catch(err){
        console.table(err)//Reference error
     }

     
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
        price: 70
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
const root = document.querySelector('#root');

    for (let book of books) {
        try {
            const list = document.createElement('ul');
            root.appendChild(list)
            if ('price' in book && 'name' in book && 'author' in book) {
                const bookKeys=Object.keys(book);
                const bookValues=Object.values(book)
                for (let i = 0; i < bookKeys.length; i++) {
                    console.log(book);
                    const item = document.createElement('li')
                    // console.log(Object.keys(book));
                    list.appendChild(item).textContent = `
                    ${bookKeys[i]}:${bookValues[i]}
                    `
                }
            }
            else {
                //console.log(Object.keys(books[0]));
                const missingProperties = ['author', 'name', 'price'].filter(property => !(property in book));
                throw new Error(`Missing property in the book object,${missingProperties}`);
            }
        }
        catch (err) {
            console.error(err)
        }
    }


