import moment from 'moment';

export const roundTo = (numOfPlaces, numberToRound) => {
    return numOfPlaces !== 0
        ? parseFloat(numberToRound).toFixed(numOfPlaces)
        : parseFloat(numberToRound);
};

export const formatTimeData = (time) => {
    if (time < 60) {
        return `${time} s`;
    } else if (time >= 60 && time < 3600) {
        const s = time % 60;
        const m = parseInt((time - s) / 60);

        return `${m} min, ${s} s`;
    } else {
        const minSecs = time % 3600;
        const h = (time - minSecs) / 3600;
        const s = time % 60;
        const m = (minSecs - s) / 60;

        return `${h} h, ${m} min, ${s} s`;
    }
};

export const formatDate = (date) => {
    if (date) {
        return moment(date).format('hh:mm, MM.DD.YYYY');
    }

    return 'Błąd!';
};

export const formatDistance = (distance) => {
    if (distance) {
        if (distance < 1000) {
            return `${roundTo(0, distance)} m`;
        } else {
            return `${roundTo(1, distance / 1000)} km`;
        }
    }

    return '0 km';
};

export const formatSpeed = (speed) => {
    return speed != null ? `${roundTo(1, speed)} km/h` : 'Błąd!';
};
