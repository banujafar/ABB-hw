/*
/// Theoretical Questions

1.Explain in your own words how you understand prototypical inheritance works in JavaScript.

const User=function(name,surname,password,email){
    this.name=name,
    this.surname=surname
    this.password=password,
    this.email=email;
    }
    User.prototype.getFullName=function(){
        return this.name+ ' ' + this.surname 
    }

const user=new User('Banu','Jafar','12345ght','banujafarli9@gmail.com');
console.log(user.getFullName())
console.log(user.__proto__===User.prototype)

We have created constructur function called User and this contructur function has prototype property which is an object.Inside it we created getFullName method.When we use new keyword The following happened 
1.created new empty object
2.this keyword refers to the  object ( this.name:'Banu',this.surname:'Jafar' etc.)
3.then the new object is connected via __proto__property to the prototype property of constructur function 
4.the new object returned from the constructur function

when we call getFullName on new user object JavaScript can not find this method on the object directly,so it looks for this method on prototype of the object and calls it, so here because  getFullName method on the prototype property of the object it returns result.This called prototypical inheritance.All objects which are created from the constructur function can access the method on the protoype (in this case it is getFullName).If we create this method on the constructur directly like others,then when we create objects with new keyword this method is created each time and each object will have same method ,so it will take more memory,in prototypical inheritance this method will be defined one time and all objects can access it ,it saves memory.



2.Why is it necessary to call super() in the constructor of a child class?
When we create child class inherited from parent class ,we have to call super().Super() method invoke parent constructur,if we want to initialize and extend some properties  in the child class,I mean if we want to use inherited properties from parent class  we write these properties in super (),otherwise we make it just empty ().
e.x,in the below code ,we created Programmer child class which is inherited from Employee parent class.IN child class we call super() inside contructur,so the contructur of parent class (Employee) is invoked.Then write  inherited properties from parent class (name,age,salary) inside super() 
*/

class Employee{
    constructor(name,age,salary){
       this.name=name,
       this.age=age,
       this.salary=salary
    }
    get getName(){
        return this.name
    }
    set setName(name){
        this.name=name
    }
    get getAge(){
        return this.age
    }
    set setAge(age){
        this.age=age
    }
    get getSalary(){
        return this.salary
    }
    set setSalary(salary){
        this.salary=salary
    }
}
class Programmer extends Employee{
    constructor(name,age,salary,lang){
        super(name,age,salary)   
        this.lang=lang
    }

   get getSalary(){
    return this.salary*3
   }
    
     
}

const frontEndDeveloper=new Programmer('Mark',25,'1300',['js','ts','react'])
const backEndDeveloper=new Programmer('Anne',24,'1500',['java','Oracle'])
const fullStackJSDeveloper=new Programmer('Banu',23,'1400',['js','ts','nodejs','react'])
frontEndDeveloper.name='BanuJafar'
backEndDeveloper.age='33'
fullStackJSDeveloper.salary='1700'
console.log(fullStackJSDeveloper.getSalary)
console.log(frontEndDeveloper)
console.log(backEndDeveloper)
console.log(fullStackJSDeveloper)


  