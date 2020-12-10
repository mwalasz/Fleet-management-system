export const spreadArray = (data) => {
    let drivers = [];
    data.forEach((driver) => {
        drivers = [...drivers, { ...driver.account, ...driver }];
    });

    return drivers;
};
