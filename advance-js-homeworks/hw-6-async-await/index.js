/*
Theoretical Question
Question: Explain in your own words how you understand the concept of asynchronous programming in JavaScript.
Answer: 
In most cases, the code is written in a synchronous fashion.

It should be noted that synchronous code is executed line by line, so as soon as the first line of code is reached, it is executed in the thread execution, which stands for synchronized execution.

The following is spesific for Synchronise code 
-> Each line of code waits for the previous line to finish. This can cause problems when one line of code takes a long time to run.
-> Long-running operations block code execution.

Asynchronous code:
->Asynchronous code is executed after a task that runs in the 'background' finishes
->Aynscronous code is non-blocking
->Execution doesn't wait for an asynchronous task to finish its work
So in summary, asynchronous programming is all about coordinating the behavior of our program over a period of time.
Asynchronous literally means not occurring at the same time
*/


const findIpBtn = document.querySelector('.find-ip');
const container=document.querySelector('.container')

class CountryData{
    constructor(continent, country, region, city,district){
     this.continent=continent,
     this.country=country,
     this.region=region,
     this.city=city,
     this.district=district
    }
    createCard(){
        const div=document.createElement('div');
        div.innerHTML=`
        <h1>Country: ${this.country}</h1>
        <span>Continent: ${this.continent}</span>
        <span>Region: ${this.region}</span>
        <span>City: ${this.city}</span>
        <span>District: ${this.district}</span>
        `
        container.appendChild(div);
        return div;

    }
   
}
const getClientIp = async () => {
  try {
    const response = await fetch('https://api.ipify.org/?format=json');
    const data = await response.json();
    const ip = data.ip;
    console.log(ip);
    postService(ip);
  } catch (error) {
    console.error(error);
  }
};

const postService = async (ip) => {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();
    console.log(data);
   const ipAddress= new CountryData(data.timezone,data.country,data.region,data.city,data.regionName);
   ipAddress.createCard()
  } catch (error) {
    console.error(error);
  }
};

findIpBtn.addEventListener('click', getClientIp);
