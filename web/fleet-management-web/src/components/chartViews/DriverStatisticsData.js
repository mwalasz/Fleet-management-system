import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../utils/constans';
import {
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from 'recharts';
import { formatDurationWithNoStyling } from '../../utils/formating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { StyledGrid, StyledGridRow } from '../Grid';
import { randomizeColor } from '../../utils/utils';
import PieChartGridItem from '../charts/PieChartGridItem';
import ChartTitle from '../charts/ChartTitle';
import { CHART_WIDTH, REDUCED_CHART_WIDTH } from '../charts/constans';
import RenderDrivingRows from '../charts/RenderDrivingRows';

const Spinner = styled(FontAwesomeIcon)`
    color: ${({ theme }) => theme.primaryColor};
    display: block;
    width: 200px;
    height: 200px;
    margin: 30px auto;
`;

const DriverStatisticsData = ({ user, loadedStatisticsData, reducedSize }) => {
    const [loading, setLoading] = useState(false);
    const [colors, setColors] = useState([]);
    const [statisticsData, setStatisticsData] = useState(null);

    const setColorPerVehicle = (data) => {
        if (data) {
            let i = 0;
            while (i !== data.duration.length) colors[i++] = randomizeColor();
        }
    };

    useEffect(() => {
        if (!loadedStatisticsData) {
            setLoading(true);
            axios
                .get(
                    `${API_URL}/statistics/driver/get_all?mail=${user.email}`,
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
                        setColorPerVehicle(data.perVehicleData);
                        setStatisticsData(data);
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(
                        `An error occurred while downloading user's vehicles: ${err}`
                    );
                });
        } else {
            setColorPerVehicle(loadedStatisticsData.perVehicleData);
            setStatisticsData(loadedStatisticsData);
        }
    }, [loadedStatisticsData]);

    const formatLabelDistance = (entry) => {
        return `${entry.value} km`;
    };

    const formatLabelDuration = (entry) => {
        return formatDurationWithNoStyling(entry.value);
    };

    return (
        <>
            {loading && <Spinner icon={faSpinner} spin size={'3x'} />}
            {!loading && statisticsData && statisticsData.driverData && (
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
                            <RenderDrivingRows
                                data={statisticsData.driverData}
                            />
                        </Grid>
                    </Grid>
                    {statisticsData && statisticsData.perVehicleData && (
                        <Grid
                            item
                            container
                            justify="space-around"
                            alignItems="center"
                            direction="row"
                        >
                            <PieChartGridItem
                                title={'Łączny czas dystans'}
                                reducedSize
                                data={statisticsData.perVehicleData.distance}
                                label={formatLabelDistance}
                                colors={colors}
                            />
                            <PieChartGridItem
                                title={'Łączny czas użytku'}
                                reducedSize
                                data={statisticsData.perVehicleData.duration}
                                label={formatLabelDuration}
                                colors={colors}
                            />
                            <BarChartGridItem
                                reducedSize
                                title={'Porównanie prędkości'}
                                data={statisticsData.perVehicleData.speed}
                            />
                        </Grid>
                    )}
                </Grid>
            )}
        </>
    );
};

const BarChartGridItem = ({ data, title, reducedSize }) => (
    <Grid item>
        <ChartTitle>{`${title}:`}</ChartTitle>
        <BarChart
            width={reducedSize ? REDUCED_CHART_WIDTH : CHART_WIDTH}
            height={250}
            data={data}
            maxBarSize={40}
        >
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

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(DriverStatisticsData);
