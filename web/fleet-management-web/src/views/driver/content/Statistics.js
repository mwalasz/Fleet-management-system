import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../../utils/constans';
import { PieChart, Pie, Tooltip, Cell, Legend, Label } from 'recharts';

const randomizeColor = () => {
    let hex = '';
    while (hex.length < 6)
        hex += Math.random().toString(16).substr(-6).substr(-1);

    return `#${hex}`;
};

const Statistics = ({ user }) => {
    const [mileagePerVehicle, setMileagePerVehicle] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios
            .get(
                `${API_URL}/statistics/driver/get_mileage_per_vehicle_chart?mail=${user.email}`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: 'Bearer ' + user.token,
                    },
                }
            )
            .then((res) => {
                setLoading(false);
                const data = res.data.result;

                if (data) {
                    console.log('res.data.result');
                    console.log(data);
                    setMileagePerVehicle(data);
                }
            })
            .catch((err) => {
                setLoading(false);
                console.log(
                    `An error occurred while downloading user's vehicles: ${err}`
                );
            });
    }, []);

    const formatLabel = (entry) => {
        return `${entry.value} km`;
    };

    return (
        <>
            {mileagePerVehicle && (
                <PieChart width={730} height={250}>
                    <Pie
                        data={mileagePerVehicle}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={formatLabel}
                    >
                        {mileagePerVehicle.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={randomizeColor()}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(Statistics);
