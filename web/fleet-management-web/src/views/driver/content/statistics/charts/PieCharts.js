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
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from 'recharts';
import {
    formatDurationWithNoStyling,
    formatDuration,
} from '../../../../../utils/formating';
import FontAwesome from 'react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { StyledGrid, StyledGridRow } from '../../../../../components/Grid';

const PieCharts = ({ user }) => {
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

    const data1 = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
        },
    ];

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

        axios
            .get(`${API_URL}/statistics/driver/get?mail=${user.email}`, {
                withCredentials: true,
                headers: {
                    Authorization: 'Bearer ' + user.token,
                },
            })
            .then((res) => {
                setLoading(false);
                const data = res.data.result;

                if (data) {
                    console.log('res.data.result');
                    console.log(data);
                    setData(data);
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
            {dataPerVehicle && data && (
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
                    <Grid
                        item
                        container
                        justify="space-around"
                        alignItems="center"
                        direction="row"
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
                        <BarChartGridItem
                            title={'Porównania prędkości'}
                            data={dataPerVehicle.speed}
                        />
                    </Grid>
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
export default connect(mapStateToProps)(PieCharts);
