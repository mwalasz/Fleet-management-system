export const API_URL = 'http://localhost:59657/api';

export const GOOGLE_MAPS_API_KEY = 'AIzaSyDaOHc_qSM6ZE4sP4GMTEgFonWOP478R-U';

export const GOOGLE_MAPS_URL = GOOGLE_MAPS_API_KEY
    ? `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`
    : 'https://maps.googleapis.com/maps/api/js?&v=3.exp&libraries=geometry,drawing,places';

export const DEFAULT_VEHICLE_IMAGE =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSEnzWRkeRjv7fTFRWTFnFj3WrUakycnYxhAg&usqp=CAU';

export const DEFAULT_USER_IMAGE =
    'https://cdn4.iconfinder.com/data/icons/instagram-ui-twotone/48/Paul-18-512.png';

export const USER_ROLES_DESCRIPTION = {
    manager: 'Kierownik',
    admin: 'Administrator',
    driver: 'Kierowca',
};

export const USER_ROLES = {
    manager: 'manager',
    admin: 'admin',
    driver: 'driver',
};
