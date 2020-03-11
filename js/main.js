'use strict';

// getFromLocalStorage();

buttonShowUsersList.addEventListener('click', () => {
    getFromLocalStorage();
    clearContainer(table);
    clearContainer(infoWindow);
    clearContainer(infoBox);
    createTable(users);
});

buttonShowCompaniesList.addEventListener('click', () => {
    getFromLocalStorage();
    clearContainer(table);
    clearContainer(infoWindow);
    clearContainer(infoBox);
    createTable(companies);
});

buttonShowCarsList.addEventListener('click', () => {
    getFromLocalStorage();
    clearContainer(table);
    clearContainer(infoWindow);
    clearContainer(infoBox);
    createTable(cars);
});