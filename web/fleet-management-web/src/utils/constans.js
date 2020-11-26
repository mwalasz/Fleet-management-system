export const API_URL = 'http://localhost:59657/api';

export const defaultVehicleImagePath =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSEnzWRkeRjv7fTFRWTFnFj3WrUakycnYxhAg&usqp=CAU';

export const phoneNumberRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const onlyLettersRegex = /^[^\W\d]+$/;

export const userRoles = {
    manager: 'Kierownik',
    admin: 'Administrator',
    driver: 'Kierowca',
};
