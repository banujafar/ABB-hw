/*
Theorotical question
Explain in your own words how you understand what destructuring is and why it is needed

Destructuring is likely to break complex data structures   into smaller data structures like variables.So we can retrieve  elements from array or object and store into variables with destructuring.e.x;
const array=[1,2,3];
we can write like 
const a=array[0],
const b=array[1] 
but with destructuring we can do it with writing a line of code and declare all of them at the same time;
const [a,b,c]=array

desctructuring helps us to change variables;
let a=5;
let b=3;
let temp=a;
a=b;
b=temp
with desctructuring we can do in one line
[a,b]=[b,a];


*/


//Practical questions
//Task 1
const clients1 = ["Gilbert", "Salvatore", "Pierce", "Summers", "Forbes", "Donovan", "Bennett"];
const clients2 = ["Pierce", "Zaltzman", "Salvatore", "Michaelson"];
const mergedClients = new Set([...clients1, ...clients2]);
console.log(mergedClients)
//Task 2
const characters = [
    {
        name: "Elena",
        lastName: "Gilbert",
        age: 17,
        gender: "woman",
        status: "human"
    },
    {
        name: "Caroline",
        lastName: "Forbes",
        age: 17,
        gender: "woman",
        status: "human"
    },
    {
        name: "Alaric",
        lastName: "Saltzman",
        age: 31,
        gender: "man",
        status: "human"
    },
    {
        name: "Damon",
        lastName: "Salvatore",
        age: 156,
        gender: "man",
        status: "vampire"
    },
    {
        name: "Rebekah",
        lastName: "Mikaelson",
        age: 1089,
        gender: "woman",
        status: "vampire"
    },
    {
        name: "Klaus",
        lastName: "Mikaelson",
        age: 1093,
        gender: "man",
        status: "vampire"
    }
];
const charactersShortInfo = characters.map(({ name, lastName: surName, age }) => ({ name, surName, age }));
console.log(charactersShortInfo);

//Task 3
{
    const user1 = {
        name: "John",
        years: 30,
        //isAdmin:true,
    };
    const { name, years: age, isAdmin = false } = user1;
    console.log(name, age, isAdmin);
}

//Task 4
const satoshi2020 = {
    name: 'Nick',
    surname: 'Sabo',
    age: 51,
    country: 'Japan',
    birth: '1979-08-21',
    location: {
        lat: 38.869422,
        lng: 139.876632
    }
}

const satoshi2019 = {
    name: 'Dorian',
    surname: 'Nakamoto',
    age: 44,
    hidden: true,
    country: 'USA',
    wallet: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    browser: 'Chrome'
}

const satoshi2018 = {
    name: 'Satoshi',
    surname: 'Nakamoto',
    technology: 'Bitcoin',
    country: 'Japan',
    browser: 'Tor',
    birth: '1975-04-05'
}
const fullProfile = { ...satoshi2018, ...satoshi2019, ...satoshi2020 };
console.log(fullProfile)

//Task 5
const books = [{
    name: 'Harry Potter',
    author: 'J.K. Rowling'
}, {
    name: 'Lord of the rings',
    author: 'J.R.R. Tolkien'
}, {
    name: 'The witcher',
    author: 'Andrzej Sapkowski'
}];

const bookToAdd = {
    name: 'Game of thrones',
    author: 'George R. R. Martin'
}
const newBooks = [...books, bookToAdd];
// console.log(books)
console.log(newBooks)

//Task6
const employee = {
    name: 'Vitalii',
    surname: 'Klichko'
}
const { age = 30, salary = 1000 } = { ...employee };
//console.log(age,salary);
const newObject = { ...employee, age, salary };
console.log(newObject);

//Task 7
const array = ['value', () => 'showValue'];

// Write the code here
const [value, showValue] = array
alert(value); // should output 'value'
alert(showValue()); // should output 'showValue'
