export const API_URL = 'http://localhost:59657/api';

export const GOOGLE_MAPS_API_KEY = '';

export const GOOGLE_MAPS_URL = GOOGLE_MAPS_API_KEY
    ? `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`
    : 'https://maps.googleapis.com/maps/api/js?&v=3.exp&libraries=geometry,drawing,places';

export const DEFAULT_VEHICLE_IMAGE =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSEnzWRkeRjv7fTFRWTFnFj3WrUakycnYxhAg&usqp=CAU';

export const DEFAULT_USER_IMAGE =
    'https://p.kindpng.com/picc/s/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png';

export const phoneNumberRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const onlyLettersRegex = /^[^\W\d]+$/;

export const userRoles = {
    manager: 'Kierownik',
    admin: 'Administrator',
    driver: 'Kierowca',
};
