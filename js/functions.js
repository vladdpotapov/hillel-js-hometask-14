'use strict';

// MAIN FUNCTIONS:
function createTable(array) {
    
    let buttonAdd = createButton('Add', 'button', array, table);                        

    let buttonClose = createButton('Close', 'button', array, table);   
    buttonClose.classList.add('button__service');
    buttonClose.addEventListener('click', () => {
        clearContainer(infoBox);
        clearContainer(table)
    }); 

    array.forEach(function(object) {
        let tableRow = createElement('tr', 'table__row', object, table);
        let tableCellId = createElement('td', 'table__cell', object, tableRow);
        let tableCellName = createElement('td', 'table__cell', object, tableRow);
        tableCellName.classList.add('cell__name');                                                
        let tableCellActions = createElement('td', 'table__cell', object, tableRow);
        let buttonView = createButton('View', 'button', object, tableCellActions);
        let buttonEdit = createButton('Edit', 'button', object, tableCellActions);
        let buttonDelete = createButton('Delete', 'button', object, tableCellActions);
        let buttonBuy = createButton('Buy Car', 'button', object, tableCellActions);
        // buttonSell = createButton('Sell Car', 'button', object, tableCellActions);       // Вариант №2

        setText(tableCellId, object.Id);
        setText(tableCellName, object.Name);
        if (array === cars) {
            setText(tableCellName, object.Brand);
            buttonBuy.remove();
            // buttonSell.remove();
        }

        tableRow.addEventListener('click', function(event) {
            let clickedButton = parseInt(event.target.getAttribute('data-id'));
            if (clickedButton) {
                const clickedObject = array.find(function(object) {
                    return object.Id === clickedButton;
                });
            }
        });
 
        buttonView.addEventListener('click', () => {
            clearContainer(infoBox);
            showInfo(object);
        });
        buttonEdit.addEventListener('click', () => {
            clearContainer(infoBox);
            editInfo(array, object);
        });
        buttonDelete.addEventListener('click', () => {
            clearContainer(infoBox);
            confirm(array, object);
        });
        buttonAdd.addEventListener('click', () => {
            clearContainer(infoBox);
            addNewObject(array, object);
        });     
        buttonBuy.addEventListener('click', () => {
            currentObject = object;                     
            showCarsToBuy(currentObject, cars);
            clearContainer(infoWindow);
        });

        // if (!object.Car) {                                                                   // Вариант №2
        //     buttonSell.disabled = true;                                                      // Вариант №2
        //     buttonSell.classList.add('button__disabled');                                    // Вариант №2
        // } else {                                                                             // Вариант №2
        //     buttonSell.addEventListener('click', () => {                                     // Вариант №2
        //         currentObject.sellCar(currentCar);                                           // Вариант №2
        //         buttonSell.disabled = false;                                                 // Вариант №2
        //         buttonSell.classList.remove('button__disabled');                             // Вариант №2
        //     });                                                                              // Вариант №2
        // }                                                                                    // Вариант №2

        if (object.Car) {                                                                       // Вариант №1
            let buttonSell = createButton('Sell Car', 'button', object, tableCellActions);      // Вариант №1
            if (array == cars) {
                buttonSell.remove();
            } 
            buttonSell.addEventListener('click', () => {                                        // Вариант №1
                currentObject.sellCar(currentCar);                                              // Вариант №1
                closeWindow(buttonSell);                                                        // Вариант №1
            });
        }
        
    });       
}

function showInfo(object) {
    clearContainer(infoWindow);

    let table = createElement('table', 'table', object, infoWindow);
    let buttonClose = createButton('Close', 'button', object, table); 
    buttonClose.classList.add('button__service');
    buttonClose.addEventListener('click', () => closeWindow(table));

    for (let key in object) {
        if (typeof object[key] === 'function') {
            continue;
        }
        let row = createElement('tr', 'table__row', object, table);
        let cellKey = createElement('td', 'table__cell', object, row);
        let cellValue = createElement('td', 'table__cell', object, row);

        setText(cellKey, key);
        setText(cellValue, object[key]);
    }
}

function editInfo(array, object) {                  // setToLocalStorage
    clearContainer(infoWindow);

    let table = createElement('table', 'table', object, infoWindow);
    let buttonClose = createButton('Close', 'button', object, table); 
    buttonClose.classList.add('button__service');
    buttonClose.addEventListener('click', () => closeWindow(table));
    let buttonSave = createButton('Save', 'button', object, table);
    buttonSave.addEventListener('click', () => {
        changeInfo(array, object);
        let isValid = validateInputs(array);
        if (isValid) {
            updateCell(array, object);
            clearContainer(infoWindow);
            setToLocalStorage();
        } 
    });

    for (let key in object) {
        if (typeof object[key] === 'function') {
            continue;
        }
        let row = createElement('tr', 'table__row', object, table);
        let cellKey = createElement('td', 'table__cell', object, row);
        let cellValue = createElement('td', 'table__cell', object, row);
        let input = createInput(key, object[key], cellValue);

        setText(cellKey, key);
    }

    let inputId = document.querySelector('.Id');
    inputId.disabled = true;

    if (object.Car) {
        let inputCar = document.querySelector('.Car');
        inputCar.disabled = true;
    }
}

function changeInfo(array, object) {
    let inputs = document.querySelectorAll('.inputs');
    let inputsValues = Object.values(object);

    for (let i = 0; i < inputs.length; i++) {
        if (inputsValues[i] !== inputs[i].value) {
            inputsValues[i] = inputs[i].value;
        }
    }

    Object.keys(object).forEach(function(key, index) {
        object[key] = inputsValues[index];
        if (typeof object.Id === 'string') {
            object.Id = parseInt(inputs[index].value);
        }
        if (typeof object.Age === 'string') {
            object.Age = parseInt(inputs[index].value);
        }
        if (typeof object.Balance === 'string') {
            object.Balance = parseInt(inputs[index].value);
        }
        if (typeof object.Employees === 'string') {
            object.Employees = parseInt(inputs[index].value);
        }
        if (typeof object.Power === 'string') {
            object.Power = parseInt(inputs[index].value);
        }
        if (typeof object.Price === 'string') {
            object.Price = parseInt(inputs[index].value);
        }
    });
}

function addNewObject(array, object) {
    clearContainer(infoWindow);

    let table = createElement('table', 'table', object, infoWindow);

    let buttonClose = createButton('Close', 'button', object, table); 
    buttonClose.classList.add('button__service');
    buttonClose.addEventListener('click', () => closeWindow(table));

    let buttonSave = createButton('Save', 'button', object, table);
    buttonSave.addEventListener('click', () => pushNewObject(array, object));

    for (let key in object) {
        if (typeof object[key] === 'function') {
            continue;
        }
        let row = createElement('tr', 'table__row', object, table);
        let cellKey = createElement('td', 'table__cell', object, row);
        let cellValue = createElement('td', 'table__cell', object, row);
        let input = createInput(key, '', cellValue);

        setText(cellKey, key);
    }
}

function pushNewObject(array, object) {             // setToLocalStorage
    clearContainer(table);

    let newObject = {};
    newObject.__proto__ = new Method();
    let inputs = document.querySelectorAll('.inputs');

    for (let key in object) {
        if (typeof object[key] === 'function') {
            continue;
        }
        newObject[key] = object.key;
    }

    Object.keys(newObject).forEach(function(key, index) {
        newObject[key] = inputs[index].value;
        if (typeof newObject.Id === 'string') {
            newObject.Id = parseInt(inputs[index].value);
        }
        if (typeof newObject.Age === 'string') {
            newObject.Age = parseInt(inputs[index].value);
        }
        if (typeof newObject.Balance === 'string') {
            newObject.Balance = parseInt(inputs[index].value);
        }
        if (typeof newObject.Employees === 'string') {
            newObject.Employees = parseInt(inputs[index].value);
        }
        if (typeof newObject.Power === 'string') {
            newObject.Power = parseInt(inputs[index].value);
        }
        if (typeof newObject.Price === 'string') {
            newObject.Price = parseInt(inputs[index].value);
        }
    });

    let isValid = validateInputs(array);
    if (isValid) {
        array.push(newObject);
        createTable(array);
        clearContainer(infoWindow);
        setToLocalStorage();                          // setToLocalStorage
    }
}

function removeObject(array, object) {              // setToLocalStorage
    for(let i = 0; i < array.length; i++){
        if(array[i].Id === object.Id){
            array.splice([i], 1);
        }
    }

    clearContainer(infoWindow);
    clearContainer(table);
    createTable(array);
    setToLocalStorage();
}

function showCarsToBuy(currentObject, array) {
    let buttonClose = createButton('Close', 'button', array, infoBox);   
    buttonClose.classList.add('button__service');
    buttonClose.addEventListener('click', () => clearContainer(infoBox)); 

    array.forEach(function(object) {
        let tableRow = createElement('tr', 'table__row', object, infoBox);
        let tableCellId = createElement('td', 'table__cell', object, tableRow);
        let tableCellName = createElement('td', 'table__cell', object, tableRow);
        tableCellName.classList.add('cell__name');                                                
        let tableCellActions = createElement('td', 'table__cell', object, tableRow);
        let buttonView = createButton('View', 'button', object, tableCellActions);
        let buttonPurchase = createButton('Purchase', 'button', object, tableCellActions);

        setText(tableCellId, object.Id);
        setText(tableCellName, object.Name);
        if (array === cars) {
            setText(tableCellName, object.Brand);
        }

        tableRow.addEventListener('click', function(event) {
            let clickedButton = parseInt(event.target.getAttribute('data-id'));
            if (clickedButton) {
                const clickedObject = array.find(function(object) {
                    return object.Id === clickedButton;
                });
            }
        });

        buttonView.addEventListener('click', () => showInfo(object));
        buttonPurchase.addEventListener('click', () => {  
            currentCar = object;
            confirmPurchase(currentObject, object, currentCar);
        });   
    });
}

// ELEMENTS MANAGEMENT:
function createElement(elementTag, elementClass, object, parent) {
    let element = document.createElement(elementTag);
    element.setAttribute('data-id', object.Id);
    element.classList.add(elementClass);
    parent.append(element);
    return element;
}

function createButton(buttonValue, elementClass, object, parent) {
    let element = document.createElement('input');
    element.setAttribute('data-id', object.Id);
    element.setAttribute('type', 'button');
    element.setAttribute('value', buttonValue);
    element.classList.add(elementClass);
    parent.append(element);
    return element;
}

function createInput(key, value, parent) {
    let element = document.createElement('input');
    element.setAttribute('type', 'text');
    element.setAttribute('value', value);
    element.classList.add(key);
    element.classList.add('inputs');
    parent.append(element);
    return element;
}

function setText(element, value) {
    element.innerHTML = value;
}

// SERVICE FUNCTIONS:
function clearContainer(elementName) {
    elementName.innerHTML = '';
}

function closeWindow(elementName) {
    elementName.remove();
}

function updateCell(array, object) {
    let cellName = document.querySelector('[data-id="' + object.Id +'"] .cell__name');
    setText(cellName, object.Name);

    if (array === cars) {
        let cellName = document.querySelector('[data-id="' + object.Id +'"] .cell__name');
        setText(cellName, object.Brand);
    }
}

function confirm(array, object) {
    clearContainer(infoWindow);

    let box = createElement('div', 'info-window__box', object, infoWindow);
    let cell = createElement('div', 'info-window__cell', object, box);
    let buttonDelete = createButton('Delete', 'button', object, box);
    let buttonCancel = createButton('Cancel', 'button', object, box);

    buttonDelete.classList.add('button__service');
    buttonCancel.classList.add('button__service');

    buttonDelete.addEventListener('click', () => removeObject(array, object));
    buttonCancel.addEventListener('click', () => closeWindow(box));

    setText(cell, "Are you sure?");
}

function confirmPurchase(currentObject, object, currentCar) {
    clearContainer(infoWindow);

    let box = createElement('div', 'info-window__box', object, infoWindow);
    let cell = createElement('div', 'info-window__cell', object, box);
    let buttonPurchase = createButton('Purchase', 'button', object, box);
    let buttonCancel = createButton('Cancel', 'button', object, box);

    buttonPurchase.classList.add('button__service');
    buttonCancel.classList.add('button__service');

    buttonPurchase.addEventListener('click', () => {
        // console.log(currentCar);
        currentObject.buyCar(currentCar);
        clearContainer(infoWindow);                                                    // !
        // clearContainer(table);                                                      // !
        // createTable(users);                                                         // !
    });

    buttonCancel.addEventListener('click', () => closeWindow(box));

    setText(cell, "Are you sure?");
}

function messageNotEnoughMoney(currentObject, object) {
    clearContainer(infoWindow);

    let box = createElement('div', 'info-window__box', object, infoWindow);
    let cell = createElement('div', 'info-window__cell', object, box);
    let buttonOk = createButton('Oh, Okay :(', 'button', object, box);

    buttonOk.classList.add('button__service');
    buttonOk.addEventListener('click', () => closeWindow(box));

    setText(cell, "Not Enough Money");
}

function validateInputs(array) {
    let valid = true;
    // Users
    let inputId = document.querySelector('.Id');
    let inputName = document.querySelector('.Name');            
    let inputAge = document.querySelector('.Age');              
    let inputJob = document.querySelector('.Job');              
    let inputPhone = document.querySelector('.Phone');          
    let inputBalance = document.querySelector('.Balance');      
    // Companies
    let inputEmployees = document.querySelector('.Employees');  
    let inputArea = document.querySelector('.Area');
    let inputNumber = document.querySelector('.Number');
    // Cars
    let inputBrand = document.querySelector('.Brand');
    let inputModel = document.querySelector('.Model');
    let inputPower = document.querySelector('.Power');
    let inputPrice = document.querySelector('.Price');

    if ((array === users) || (array === companies)) {
        let patternName = /^[A-Z]{1}[a-z]{1,}$/;
        let resultName = patternName.test(inputName.value);

        let patternBalance = /^\d{1,}$/;
        let resultBalance = patternBalance.test(inputBalance.value);

        if (!resultName) {
            inputName.classList.add('incorrect');
            valid = false;
        } else {
            inputName.classList.remove('incorrect');
        }

        if (!resultBalance) {
            inputBalance.classList.add('incorrect');
            valid = false;
        } else {
            inputBalance.classList.remove('incorrect');
        }
    }
    
    if (array === users) {
        let patternAge = /^[0-9]{2}$/;
        let resultAge = patternAge.test(inputAge.value);
        let patternJob = /^[A-Z]{1}[a-z]{1,}$/;
        let resultJob = patternJob.test(inputJob.value);
        let patternPhone = /^[0][0-9]{2}[-][0-9]{3}[-][0-9]{2}[-][0-9]{2}$/;
        let resultPhone = patternPhone.test(inputPhone.value);

        if (!resultAge) {
            inputAge.classList.add('incorrect');
            valid = false;
        } else {
            inputAge.classList.remove('incorrect');
        }

        if (!resultJob) {
            inputJob.classList.add('incorrect');
            valid = false;
        } else {
            inputJob.classList.remove('incorrect');
        }
    
        if (!resultPhone) {
            inputPhone.classList.add('incorrect');
            valid = false;
        } else {
            inputPhone.classList.remove('incorrect');
        }
    }
    
    if (array === companies) {
        let patternEmployees = /^\d{1,}$/;
        let resultEmployees = patternEmployees.test(inputEmployees.value);
        let patternArea = /^[A-Z]{1}[a-z]{1,}$/;
        let resultArea = patternArea.test(inputArea.value);
        let patternNumber = /^[0][0-9]{2}[-][0-9]{3}[-][0-9]{2}[-][0-9]{2}$/;
        let resultNumber = patternNumber.test(inputNumber.value);

        if (!resultEmployees) {
            inputEmployees.classList.add('incorrect');
            valid = false;
        } else {
            inputEmployees.classList.remove('incorrect');
        }

        if (!resultArea) {
            inputArea.classList.add('incorrect');
            valid = false;
        } else {
            inputArea.classList.remove('incorrect');
        }

        if (!resultNumber) {
            inputNumber.classList.add('incorrect');
            valid = false;
        } else {
            inputNumber.classList.remove('incorrect');
        }
    }
    
    if (array === cars) {
        let patternAge = /^[0-9]{1,}$/;
        let resultAge = patternAge.test(inputAge.value);
        // let patternBrand = /^[A-Z]{1,}[a-z]{1,}$/;
        // let resultBrand = patternBrand.test(inputBrand.value);
        // let patternModel = /^[A-Z]{1}[a-z]{1,} \d{1,}$/; /^\W{1,}\d{1,}$/;
        // let resultModel = patternModel.test(inputModel.value);
        let patternPower = /^\d{1,}$/;
        let resultPower = patternPower.test(inputPower.value);
        let patternPrice = /^\d{1,}$/;
        let resultPrice = patternPrice.test(inputPrice.value);

        if (!inputBrand.value) {
            inputBrand.classList.add('incorrect');
            valid = false;
        } else {
            inputBrand.classList.remove('incorrect');
        }

        if (!inputModel.value) {
            inputModel.classList.add('incorrect');
            valid = false;
        } else {
            inputModel.classList.remove('incorrect');
        }

        if (!resultAge) {
            inputAge.classList.add('incorrect');
            valid = false;
        } else {
            inputAge.classList.remove('incorrect');
        }

        if (!resultPower) {
            inputPower.classList.add('incorrect');
            valid = false;
        } else {
            inputPower.classList.remove('incorrect');
        }

        if (!resultPrice) {
            inputPrice.classList.add('incorrect');
            valid = false;
        } else {
            inputPrice.classList.remove('incorrect');
        }
    }

    return valid;
}

// LOCAL STORAGE:
function setToLocalStorage() {
    let convertUsersToString = users.map(function(item) {
        return JSON.stringify(item);
    }); 
    let stringifiedUsers = convertUsersToString.join(';');
    localStorage.setItem('Users', stringifiedUsers);

    let convertCompaniesToString = companies.map(function(item) {
        return JSON.stringify(item);
    }); 
    let stringifiedCompanies = convertCompaniesToString.join(';');
    localStorage.setItem('Companies', stringifiedCompanies);

    let convertCarsToString = cars.map(function(item) {
        return JSON.stringify(item);
    }); 
    let stringifiedCars = convertCarsToString.join(';');
    localStorage.setItem('Cars', stringifiedCars);
}

function getFromLocalStorage() {
    if (!localStorage.getItem('Users')) {
        users = defaultUsers;
        return;
    }
    
    let parsedUsers = localStorage.getItem('Users').split(';');
    let usersArray = parsedUsers.map(item => JSON.parse(item));
    if (!usersArray) {
        users = defaultUsers;
        return;
    }
    
    for (let i = 0; i < usersArray.length; i++) {
        let values = Object.values(usersArray[i]);
        usersArray[i] = new Human();
        for (let key in usersArray[i]) {
            usersArray[i].Car = values[i];
        }
        Object.keys(usersArray[i]).forEach(function(key, index) {
            usersArray[i][key] = values[index];
        });
        usersArray[i].__proto__ = new Method();    
    }

    users = usersArray;
    console.log(users);

    if (!localStorage.getItem('Companies')) {
        companies = defaultCompanies;
        return;
    }
    
    let parsedCompanies = localStorage.getItem('Companies').split(';');
    let companiesArray = parsedCompanies.map(item => JSON.parse(item));
    if (!companiesArray) {
        companies = defaultCompanies;
        return;
    }
    for (let i = 0; i < companiesArray.length; i++) {
        let values = Object.values(companiesArray[i]);
        companiesArray[i] = new Company();
        for (let key in companiesArray[i]) {
            companiesArray[i].Car = values[i];
        }
        Object.keys(companiesArray[i]).forEach(function(key, index) {
            companiesArray[i][key] = values[index];
        });
        companiesArray[i].__proto__ = new Method();    
    }
    companies = companiesArray;
    console.log(companies);


    if (!localStorage.getItem('Cars')) {
        cars = defaultCars;
        return;
    }
    
    let parsedCars = localStorage.getItem('Cars').split(';');
    let carsArray = parsedCars.map(item => JSON.parse(item));
    if (!carsArray) {
        cars = defaultCars;
        return;
    }
    cars = carsArray;
    console.log(cars);

}