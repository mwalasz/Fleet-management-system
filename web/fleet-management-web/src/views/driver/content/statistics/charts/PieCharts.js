import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../../../../utils/constans';
import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    Legend,
    Label,
    PolarAngleAxis,
    ResponsiveContainer,
} from 'recharts';
import { formatDurationWithNoStyling } from '../../../../../utils/formating';
import FontAwesome from 'react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

const PieCharts = ({ user }) => {
    const [dataPerVehicle, setDataPerVehicle] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [colors, setColors] = useState([]);

    const setColorPerVehicle = (data) => {
        const randomizeColor = () => {
            let hex = '';
            while (hex.length < 6)
                hex += Math.random().toString(16).substr(-6).substr(-1);

            return `#${hex}`;
        };

        let numOfItems = data.distance.length;
        let i = 0;
        while (i !== numOfItems) {
            colors[i] = randomizeColor();
            i++;
        }
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get(
                `${API_URL}/statistics/driver/get_data_per_vehicle_chart?mail=${user.email}`,
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

                    setColorPerVehicle(data);
                    setDataPerVehicle(data);
                }
            })
            .catch((err) => {
                setLoading(false);
                console.log(
                    `An error occurred while downloading user's vehicles: ${err}`
                );
            });
    }, []);

    const formatLabelDistance = (entry) => {
        return `${entry.value} km`;
    };

    const formatLabelDuration = (entry) => {
        return formatDurationWithNoStyling(entry.value);
    };

    return (
        <>
            {loading && <FontAwesome icon={faSpinner} spin />}
            {dataPerVehicle && (
                <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                >
                    <PieChartGridItem
                        title={'Łączny dystans przejechany pojazdem'}
                    >
                        <Pie
                            data={dataPerVehicle.distance}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label={formatLabelDistance}
                        >
                            {dataPerVehicle.distance.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[index]}
                                />
                            ))}
                        </Pie>
                    </PieChartGridItem>
                    <PieChartGridItem title={'Łączny czas użycia pojazdu'}>
                        <Pie
                            data={dataPerVehicle.duration}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label={formatLabelDuration}
                        >
                            {dataPerVehicle.duration.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[index]}
                                />
                            ))}
                        </Pie>
                    </PieChartGridItem>
                </Grid>
            )}
        </>
    );
};

const PieChartGridItem = ({ children, title }) => (
    <Grid item>
        <p>{`${title}:`}</p>
        <PieChart width={500} height={250}>
            {children}
            <Tooltip />
            <Legend />
        </PieChart>
    </Grid>
);

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(PieCharts);
