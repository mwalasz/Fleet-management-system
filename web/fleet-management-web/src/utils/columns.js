import styled from 'styled-components';
import {
    formatDate,
    formatPrice,
    formatDistance,
    formatSpeed,
    formatTimeData,
} from './formating';

export const refuelingsColumns = [
    {
        field: 'placeDescription',
        headerName: 'Miejsce',
        width: 300,
        sortable: false,
    },
    {
        field: 'time',
        headerName: 'Czas',
        width: 150,
        sortable: false,
        renderCell: (params) => formatDate(params.data.time),
    },
    {
        field: 'cost',
        headerName: 'Koszt',
        width: 100,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => formatPrice(params.data.cost),
    },
    {
        field: 'liters',
        headerName: 'Litry',
        width: 100,
        align: 'center',
        headerAlign: 'center',
    },
    {
        field: 'costPerLiter',
        headerName: 'l/zł',
        width: 100,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => formatPrice(params.data.costPerLiter),
    },
];

export const tripsColumns = [
    {
        field: 'startPlace',
        headerName: 'Miejsce rozpoczęcia',
        width: 180,
    },
    {
        field: 'startTime',
        headerName: 'Czas rozpoczęcia',
        width: 150,
        sortable: false,
        renderCell: (params) => formatDate(params.data.startTime),
    },
    {
        field: 'destinationPlace',
        headerName: 'Cel',
        width: 180,
    },
    {
        field: 'destinationArrivalTime',
        headerName: 'Czas zakończenia',
        width: 165,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        renderCell: (params) => formatDate(params.data.destinationArrivalTime),
    },
    {
        field: 'distance',
        headerName: 'Dystans',
        width: 100,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => formatDistance(params.data.distance),
    },
    {
        field: 'travelTime',
        headerName: 'Czas jazdy',
        width: 150,
        sortable: false,
        headerAlign: 'center',
        renderCell: (params) => formatTimeData(params.data.travelTime),
    },
    {
        field: 'averageSpeed',
        headerName: 'Śr. prędkość',
        width: 120,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => formatSpeed(params.data.averageSpeed),
    },
    {
        field: 'maximumSpeed',
        headerName: 'Maks. prędkość',
        width: 140,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => formatSpeed(params.data.maximumSpeed),
    },
];
