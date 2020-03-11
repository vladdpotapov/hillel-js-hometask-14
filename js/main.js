'use strict';

getFromLocalStorage();

buttonShowUsersList.addEventListener('click', () => {
    clearContainer(table);
    clearContainer(infoWindow);
    clearContainer(infoBox);
    createTable(users);
});

buttonShowCompaniesList.addEventListener('click', () => {
    clearContainer(table);
    clearContainer(infoWindow);
    clearContainer(infoBox);
    createTable(companies);
});

buttonShowCarsList.addEventListener('click', () => {
    clearContainer(table);
    clearContainer(infoWindow);
    clearContainer(infoBox);
    createTable(cars);
});