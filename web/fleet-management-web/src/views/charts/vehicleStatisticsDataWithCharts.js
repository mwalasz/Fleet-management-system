import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    LineChart,
    Line,
    CartesianGrid,
} from 'recharts';
import {
    formatDurationWithNoStyling,
    formatPriceWithNoStyling,
    formatPrice,
} from '../../utils/formating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { StyledGridRow } from '../../components/Grid';
import { randomizeColor } from '../../utils/utils';
import PieChartGridItem from '../../components/charts/PieChartGridItem';
import ChartTitle from '../../components/charts/ChartTitle';
import {
    CHART_WIDTH,
    REDUCED_CHART_WIDTH,
} from '../../components/charts/constans';
import RenderDrivingRows from '../../components/charts/RenderDrivingRows';

const VehicleStatisticsData = ({
    user,
    loadedStatisticsData,
    reducedSize,
    costSelected,
}) => {
    const [colors, setColors] = useState([]);
    const [drivingData, setDrivingData] = useState(null);
    const [costsData, setCostsData] = useState(null);

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

    const formatLabelPrice = (entry) => {
        return formatPriceWithNoStyling(entry.value);
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
                                <RenderDrivingRows data={drivingData.data} />
                            )}
                        </Grid>
                    </Grid>
                    {loadedStatisticsData && costSelected ? (
                        <Grid
                            item
                            container
                            justify="space-around"
                            alignItems="center"
                            direction="row"
                        >
                            <BarChartGridItem
                                title={'Miesięczny podział kosztów'}
                                reducedSize
                                data={costsData.charts.summary}
                                colors={colors}
                            />
                            <PieChartGridItem
                                title={
                                    'Stosunek kwoty wydanej na paliwo i eksploatację'
                                }
                                reducedSize
                                data={costsData.charts.ratio}
                                label={formatLabelPrice}
                                colors={colors}
                            />
                        </Grid>
                    ) : (
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

const BarChartGridItem = ({ title, reducedSize, data, label, colors }) => (
    <Grid item>
        <ChartTitle>{`${title}:`}</ChartTitle>
        <BarChart
            width={reducedSize ? REDUCED_CHART_WIDTH * 2 : CHART_WIDTH * 2}
            height={250}
            data={data}
        >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip formatter={formatPriceWithNoStyling} />
            <Legend
                formatter={(value, entry, index) => {
                    if (value === 'maintenances') return 'Naprawy';
                    else if (value === 'fuel') return 'Tankowania';
                    else return 'Błąd!';
                }}
            />
            <Bar type="monotone" dataKey="maintenances" fill={colors[0]} />
            <Bar
                type="monotone"
                dataKey="fuel"
                fill={colors[1]}
                label="paliwo"
            />
        </BarChart>
    </Grid>
);

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(VehicleStatisticsData);
