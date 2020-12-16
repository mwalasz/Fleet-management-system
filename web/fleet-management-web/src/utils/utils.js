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
