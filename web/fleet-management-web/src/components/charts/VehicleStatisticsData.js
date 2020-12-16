import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../utils/constans';
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
import { formatDurationWithNoStyling } from '../../utils/formating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { StyledGrid, StyledGridRow } from '../Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '../../components/Button';

const Spinner = styled(FontAwesomeIcon)`
    color: ${({ theme }) => theme.primaryColor};
    display: block;
    width: 200px;
    height: 200px;
    margin: 30px auto;
`;

const CHART_WIDTH = 500;
const REDUCED_CHART_WIDTH = 400;

const VehicleStatisticsData = ({ user, loadedStatisticsData, reducedSize }) => {
    const [loading, setLoading] = useState(false);
    const [colors, setColors] = useState([]);
    const [statisticsData, setStatisticsData] = useState(null);
    const [isCostActive, setIsCostActive] = useState(false);
    const PIE_CHARTS_RADIUS = reducedSize ? 60 : 80;

    const setColorPerVehicle = (data) => {
        if (data) {
            const randomizeColor = () => {
                let hex = '';
                while (hex.length < 6)
                    hex += Math.random().toString(16).substr(-6).substr(-1);
                return `#${hex}`;
            };

            let numOfItems = data.duration.length;
            let i = 0;
            while (i !== numOfItems) {
                colors[i] = randomizeColor();
                i++;
            }
        }
    };

    useEffect(() => {
        if (!loadedStatisticsData) {
            console.log('loadedStatisticsData', loadedStatisticsData);
            // setColorPerVehicle(data.perVehicleData);
            // setStatisticsData(data);
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
            {
                <div style={{ margin: '20px' }}>
                    <ButtonGroup
                        color="primary"
                        aria-label="outlined primary button group"
                    >
                        <Button
                            selected={isCostActive}
                            secondary
                            onClick={() => setIsCostActive(true)}
                        >
                            koszty
                        </Button>
                        <Button
                            selected={!isCostActive}
                            secondary
                            onClick={() => setIsCostActive(false)}
                        >
                            eksploatacja
                        </Button>
                    </ButtonGroup>
                </div>
            }
            {loadedStatisticsData && (
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
                            {isCostActive ? (
                                <>
                                    <StyledGridRow
                                        heading={'Sumaryczne koszty obsługi'}
                                        text={
                                            loadedStatisticsData.costs.data
                                                .totalCost
                                        }
                                    />
                                    <StyledGridRow
                                        heading={
                                            'Liczba wszystkich serwisów i napraw'
                                        }
                                        text={
                                            loadedStatisticsData.costs.data
                                                .maintenancesNumber
                                        }
                                        noBottomLine
                                    />
                                    <StyledGridRow
                                        heading={
                                            'Średni koszt serwisów i napraw'
                                        }
                                        text={
                                            loadedStatisticsData.costs.data
                                                .maintenancesAverageCost
                                        }
                                        noBottomLine
                                    />
                                    <StyledGridRow
                                        heading={
                                            'Łączny koszt serwisów i napraw'
                                        }
                                        text={
                                            loadedStatisticsData.costs.data
                                                .maintenancesCost
                                        }
                                    />
                                    <StyledGridRow
                                        heading={'Liczba wszystkich tankowań'}
                                        text={
                                            loadedStatisticsData.costs.data
                                                .refuelingsNumber
                                        }
                                        noBottomLine
                                    />
                                    <StyledGridRow
                                        heading={'Średni koszt tankowań'}
                                        text={
                                            loadedStatisticsData.costs.data
                                                .refuelingsAverageCost
                                        }
                                        noBottomLine
                                    />
                                    <StyledGridRow
                                        heading={'Łączny koszt tankowań'}
                                        text={
                                            loadedStatisticsData.costs.data
                                                .refuelingsCost
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <StyledGridRow
                                        heading={'Liczba tras'}
                                        text={
                                            loadedStatisticsData.driving.data
                                                .numberOfTrips
                                        }
                                    />
                                    <StyledGridRow
                                        heading={'Dystans'}
                                        text={`${loadedStatisticsData.driving.data.totalDistanceInKilometers.toFixed(
                                            2
                                        )} km`}
                                    />
                                    <StyledGridRow
                                        heading={'Czas'}
                                        text={formatDurationWithNoStyling(
                                            loadedStatisticsData.driving.data
                                                .totalDurationInSeconds
                                        )}
                                    />
                                    <StyledGridRow
                                        heading={'Średnia prędkość'}
                                        text={`${loadedStatisticsData.driving.data.averageSpeedInKilometersPerHour.toFixed(
                                            2
                                        )} km/h`}
                                    />
                                    <StyledGridRow
                                        heading={'Maks. prędkość'}
                                        text={`${loadedStatisticsData.driving.data.maximumSpeedInKilometersPerHour.toFixed(
                                            2
                                        )} km/h`}
                                    />
                                </>
                            )}
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
                                title={'Łączny dystans'}
                                reducedSize
                            >
                                <Pie
                                    data={
                                        statisticsData.perVehicleData.distance
                                    }
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={PIE_CHARTS_RADIUS}
                                    label={formatLabelDistance}
                                >
                                    {statisticsData.perVehicleData.distance.map(
                                        (entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={colors[index]}
                                            />
                                        )
                                    )}
                                </Pie>
                            </PieChartGridItem>
                            <PieChartGridItem
                                title={'Łączny czas użytku'}
                                reducedSize
                            >
                                <Pie
                                    data={
                                        statisticsData.perVehicleData.duration
                                    }
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={PIE_CHARTS_RADIUS}
                                    label={formatLabelDuration}
                                >
                                    {statisticsData.perVehicleData.duration.map(
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

const PieChartGridItem = ({ children, title, reducedSize }) => (
    <Grid item>
        <ChartTitle>{`${title}:`}</ChartTitle>
        <PieChart
            width={reducedSize ? REDUCED_CHART_WIDTH : CHART_WIDTH}
            height={250}
        >
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
export default connect(mapStateToProps)(VehicleStatisticsData);
