import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
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
import {
    formatDurationWithNoStyling,
    formatPrice,
} from '../../utils/formating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { StyledGrid, StyledGridRow } from '../Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '../Button';
import { randomizeColor } from '../../utils/utils';
import PieChartGridItem from '../charts/PieChartGridItem';
import ChartTitle from '../charts/ChartTitle';
import { CHART_WIDTH, REDUCED_CHART_WIDTH } from '../charts/constans';

const VehicleStatisticsData = ({ user, loadedStatisticsData, reducedSize }) => {
    const [colors, setColors] = useState([]);
    const [drivingData, setDrivingData] = useState(null);
    const [costsData, setCostsData] = useState(null);
    const [isCostActive, setIsCostActive] = useState(false);
    const PIE_CHARTS_RADIUS = reducedSize ? 60 : 80;

    const setColorPerDriver = (data) => {
        if (data) {
            let i = 0;
            while (i !== data.duration.length) colors[i++] = randomizeColor();
        }
    };

    useEffect(() => {
        if (loadedStatisticsData) {
            setColorPerDriver(loadedStatisticsData.driving.charts);
            setDrivingData(loadedStatisticsData.driving);
            setCostsData(loadedStatisticsData.costs);
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
                <div style={{ marginBottom: '20px' }}>
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
            {drivingData && costsData && (
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
                                        text={formatPrice(
                                            costsData.data.totalCost
                                        )}
                                    />
                                    <StyledGridRow
                                        heading={
                                            'Liczba wszystkich serwisów i napraw'
                                        }
                                        text={costsData.data.maintenancesNumber}
                                        noBottomLine
                                    />
                                    <StyledGridRow
                                        heading={
                                            'Średni koszt serwisów i napraw'
                                        }
                                        text={formatPrice(
                                            costsData.data
                                                .maintenancesAverageCost
                                        )}
                                        noBottomLine
                                    />
                                    <StyledGridRow
                                        heading={
                                            'Łączny koszt serwisów i napraw'
                                        }
                                        text={formatPrice(
                                            costsData.data.maintenancesCost
                                        )}
                                    />
                                    <StyledGridRow
                                        heading={'Liczba wszystkich tankowań'}
                                        text={costsData.data.refuelingsNumber}
                                        noBottomLine
                                    />
                                    <StyledGridRow
                                        heading={'Średni koszt tankowań'}
                                        text={formatPrice(
                                            costsData.data.refuelingsAverageCost
                                        )}
                                        noBottomLine
                                    />
                                    <StyledGridRow
                                        heading={'Łączny koszt tankowań'}
                                        text={formatPrice(
                                            costsData.data.refuelingsCost
                                        )}
                                    />
                                </>
                            ) : (
                                <>
                                    <StyledGridRow
                                        heading={'Liczba tras'}
                                        text={drivingData.data.numberOfTrips}
                                    />
                                    <StyledGridRow
                                        heading={'Dystans'}
                                        text={`${drivingData.data.totalDistanceInKilometers.toFixed(
                                            2
                                        )} km`}
                                    />
                                    <StyledGridRow
                                        heading={'Czas'}
                                        text={formatDurationWithNoStyling(
                                            drivingData.data
                                                .totalDurationInSeconds
                                        )}
                                    />
                                    <StyledGridRow
                                        heading={'Średnia prędkość'}
                                        text={`${drivingData.data.averageSpeedInKilometersPerHour.toFixed(
                                            2
                                        )} km/h`}
                                    />
                                    <StyledGridRow
                                        heading={'Maks. prędkość'}
                                        text={`${drivingData.data.maximumSpeedInKilometersPerHour.toFixed(
                                            2
                                        )} km/h`}
                                    />
                                </>
                            )}
                        </Grid>
                    </Grid>
                    {isCostActive && loadedStatisticsData && (
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
                                    data={drivingData.charts.distance}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={PIE_CHARTS_RADIUS}
                                    label={formatLabelDistance}
                                >
                                    {drivingData.charts.distance.map(
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
                                    data={drivingData.charts.duration}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={PIE_CHARTS_RADIUS}
                                    label={formatLabelDuration}
                                >
                                    {drivingData.charts.duration.map(
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
                                title={'Łączna liczba użyć'}
                                reducedSize
                            >
                                <Pie
                                    data={drivingData.charts.usages}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={PIE_CHARTS_RADIUS}
                                    label={(entry) => entry.value}
                                >
                                    {drivingData.charts.duration.map(
                                        (entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={colors[index]}
                                            />
                                        )
                                    )}
                                </Pie>
                            </PieChartGridItem>
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
export default connect(mapStateToProps)(VehicleStatisticsData);
