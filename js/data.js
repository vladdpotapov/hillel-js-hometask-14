'use strict';

// CONSTRUCTORS:
function Method() {
    this.buyCar = function(currentCar) {
        if (this.Balance >= currentCar.Price) {
            this.Car = `${currentCar.Brand} ` + `${currentCar.Model}`;    
            this.Balance = this.Balance - currentCar.Price;
            clearContainer(infoWindow);
            setToLocalStorage();                                                // setToLocalStorage
        } else {
            messageNotEnoughMoney(currentObject);
        }
        // console.log(this);
    };

    this.sellCar = function(currentCar) {
        this.Balance = this.Balance + currentCar.Price;
        delete this.Car;
        setToLocalStorage();                                                    // setToLocalStorage
        // console.log(this);
    }
}

function Human(userId, userName, userAge, userJob, userPhoneNumber, userBalance) {
    this.Id = userId;
    this.Name = userName;
    this.Age = userAge;
    this.Job = userJob;
    this.Phone = userPhoneNumber;
    this.Balance = userBalance;
}

function Company(companyId, companyName, companyEmployees, companyArea, companyPhoneNumber, companyBalance) {
    this.Id = companyId;
    this.Name = companyName;
    this.Employees = companyEmployees;
    this.Area = companyArea;
    this.Number = companyPhoneNumber;
    this.Balance = companyBalance;
}

function Car(carId, carBrand, carModel, carAge, carPower, carPrice) {
    this.Id = carId;
    this.Brand = carBrand;
    this.Model = carModel;
    this.Age = carAge;
    this.Power = carPower;
    this.Price = carPrice;
}

Human.prototype = new Method();
Company.prototype = new Method();

// ARRAYS:
let users = [
    new Human(1, 'John', 30, 'developer', '000-000-00-00', 10000),
    new Human(2, 'Kate', 25, 'dancer', '000-111-11-11', 8000),
    new Human(3, 'Jill', 23, 'painter', '000-111-11-11', 7500),
];

let companies = [
    new Company(1, 'Alpha', 150, 'development', '063-555-66-44', 160000),
    new Company(2, 'GreenTrees', 100, 'plants', '063-555-66-44', 70000),
    new Company(3, 'Foxxx', 80, 'PC Parts', '063-555-66-44', 35000),
];

let cars = [
    new Car(1, 'Mercedes', 'G500 AMG', 2, 550, 150000),
    new Car(2, 'BMW', 'X5', 7, 240, 50000),
    new Car(3, 'Audi', 'A4', 10, 150, 8500),
    new Car(4, 'Toyota', 'Camry', 7, 100, 7400),
    new Car(5, 'Nissan', 'Skyline', 15, 150, 8000),
];

let defaultUsers = users;
let defaultCompanies = companies;
let defaultCars = cars;

// ELEMENTS:
const buttonsShowWrap = document.getElementById('buttons-box');

const buttonShowUsersList = document.getElementById('button-show-users');
const buttonShowCompaniesList = document.getElementById('button-show-companies');
const buttonShowCarsList = document.getElementById('button-show-cars');

const tableWrap = document.getElementById('table-wrap');
const table = document.getElementById('table');

const infoBox = document.getElementById('info-box');
const infoWindow = document.getElementById('info-window');

let currentObject;
let currentCar;
// let buttonSell;                                                    // Вариант №2