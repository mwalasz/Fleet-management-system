import moment from 'moment';
import 'moment/locale/pl';

export const spreadArray = (data) => {
    let drivers = [];
    data.forEach((driver) => {
        drivers = [...drivers, { ...driver.account, ...driver }];
    });

    return drivers;
};

export const randomizeColor = () => {
    let hex = '';
    while (hex.length < 6)
        hex += Math.random().toString(16).substr(-6).substr(-1);
    return `#${hex}`;
};

export const checkVehicleDate = (dateToCheck) => {
    const difference = moment(dateToCheck).diff(moment.now(), 'days');

    if (difference < 0 || difference < 0) return 'error';
    else if (difference <= 14 || difference <= 14) return 'warning';
    return 'ok';
};

export const getTimeLeftToDate = (date) => {
    moment.locale('pl');
    return moment(date).from(moment.now());
};
