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
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from 'recharts';
import { formatDurationWithNoStyling } from '../../../../../utils/formating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { StyledGrid, StyledGridRow } from '../../../../../components/Grid';

const Spinner = styled(FontAwesomeIcon)`
    color: ${({ theme }) => theme.primaryColor};
    display: block;
    width: 200px;
    height: 200px;
    margin: 30px auto;
`;

const DataWithCharts = ({ user }) => {
    const [dataPerVehicle, setDataPerVehicle] = useState(false);
    const [data, setData] = useState(false);
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
        const vehicleStatsPromise = axios
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
                const data = res.data.result;

                if (data) {
                    setColorPerVehicle(data);
                    setDataPerVehicle(data);
                }
            })
            .catch((err) => {
                console.log(
                    `An error occurred while downloading user's vehicles: ${err}`
                );
            });

        const driverStatsPromise = axios
            .get(`${API_URL}/statistics/driver/get?mail=${user.email}`, {
                withCredentials: true,
                headers: {
                    Authorization: 'Bearer ' + user.token,
                },
            })
            .then((res) => {
                const data = res.data.result;

                if (data) setData(data);
            })
            .catch((err) => {
                console.log(
                    `An error occurred while downloading user's vehicles: ${err}`
                );
            });

        Promise.all([vehicleStatsPromise, driverStatsPromise]).then(() =>
            setLoading(false)
        );
    }, []);

    const formatLabelDistance = (entry) => {
        return `${entry.value} km`;
    };

    const formatLabelDuration = (entry) => {
        return formatDurationWithNoStyling(entry.value);
    };

    return (
        <>
            {loading && <Spinner icon={faSpinner} spin size={'3x'} />}
            {!loading && data && (
                <Grid
                    container
                    direction="column"
                    justify="space-around"
                    alignItems="center"
                    spacing={7}
                >
                    <Grid
                        item
                        container
                        justify="space-around"
                        alignItems="center"
                        direction="row"
                    >
                        <Grid
                            item
                            container
                            direction="column"
                            justify="space-evenly"
                            alignItems="stretch"
                        >
                            <StyledGridRow
                                heading={'Liczba tras'}
                                text={data.numberOfTrips}
                            />
                            <StyledGridRow
                                heading={'Dystans'}
                                text={`${data.totalDistanceInKilometers.toFixed(
                                    2
                                )} km`}
                            />
                            <StyledGridRow
                                heading={'Czas'}
                                text={formatDurationWithNoStyling(
                                    data.totalDurationInSeconds
                                )}
                            />
                            <StyledGridRow
                                heading={'Średnia prędkość'}
                                text={`${data.averageSpeedInKilometersPerHour.toFixed(
                                    2
                                )} km/h`}
                            />
                            <StyledGridRow
                                heading={'Maks. prędkość'}
                                text={`${data.maximumSpeedInKilometersPerHour.toFixed(
                                    2
                                )} km/h`}
                            />
                        </Grid>
                    </Grid>
                    {dataPerVehicle && (
                        <Grid
                            item
                            container
                            justify="space-around"
                            alignItems="center"
                            direction="row"
                        >
                            <PieChartGridItem title={'Łączny dystans'}>
                                <Pie
                                    data={dataPerVehicle.distance}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label={formatLabelDistance}
                                >
                                    {dataPerVehicle.distance.map(
                                        (entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={colors[index]}
                                            />
                                        )
                                    )}
                                </Pie>
                            </PieChartGridItem>
                            <PieChartGridItem title={'Łączny czas użytku'}>
                                <Pie
                                    data={dataPerVehicle.duration}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label={formatLabelDuration}
                                >
                                    {dataPerVehicle.duration.map(
                                        (entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={colors[index]}
                                            />
                                        )
                                    )}
                                </Pie>
                            </PieChartGridItem>
                            <BarChartGridItem
                                title={'Porównanie prędkości'}
                                data={dataPerVehicle.speed}
                            />
                        </Grid>
                    )}
                </Grid>
            )}
        </>
    );
};

const BarChartGridItem = ({ data, title }) => (
    <Grid item>
        <ChartTitle>{`${title}:`}</ChartTitle>
        <BarChart width={500} height={250} data={data} maxBarSize={40}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
                label={{
                    value: 'V [km/h]',
                    angle: 270,
                    position: 'insideLeft',
                    offset: 10,
                }}
            />
            <Tooltip />
            <Legend
                formatter={(value, entry, index) => {
                    if (value === 'averageSpeed') return 'Średnia prędkość';
                    else if (value === 'maxSpeed') return 'Maksymalna';
                    else return 'Błąd!';
                }}
            />
            <Bar dataKey="averageSpeed" fill="#858383" />
            <Bar dataKey="maxSpeed" fill="#3676b5" />
        </BarChart>
    </Grid>
);

const PieChartGridItem = ({ children, title }) => (
    <Grid item>
        <ChartTitle>{`${title}:`}</ChartTitle>
        <PieChart width={500} height={250}>
            {children}
            <Tooltip />
            <Legend />
        </PieChart>
    </Grid>
);

const ChartTitle = styled.p`
    font-size: ${({ theme }) => theme.font.M};
    font-weight: ${({ theme }) => theme.font.Bold};
`;

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(DataWithCharts);
