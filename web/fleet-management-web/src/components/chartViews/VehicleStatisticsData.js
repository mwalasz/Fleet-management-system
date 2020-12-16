import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    Tooltip,
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

const VehicleStatisticsData = ({
    user,
    loadedStatisticsData,
    reducedSize,
    costSelected,
}) => {
    const [colors, setColors] = useState([]);
    const [drivingData, setDrivingData] = useState(null);
    const [costsData, setCostsData] = useState(null);
    const [isCostActive, setIsCostActive] = useState(false);

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
                            {costSelected ? (
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
                    {!costSelected && loadedStatisticsData && (
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
                                data={drivingData.charts.distance}
                                label={formatLabelDistance}
                                colors={colors}
                            />
                            <PieChartGridItem
                                title={'Łączny czas użytku'}
                                reducedSize
                                data={drivingData.charts.duration}
                                label={formatLabelDuration}
                                colors={colors}
                            />
                            <PieChartGridItem
                                title={'Łączna liczba użyć'}
                                reducedSize
                                data={drivingData.charts.usages}
                                label={(entry) => entry.value}
                                colors={colors}
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
export default connect(mapStateToProps)(VehicleStatisticsData);
