import styled, { css } from 'styled-components';
import {
    formatDateAndTime,
    formatPrice,
    formatDistance,
    formatSpeed,
    formatDuration,
    formatMileage,
} from './formating';
import { USER_ROLES_DESCRIPTION } from './constans';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowAltCircleLeft,
    faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';

export const REFUELINGS_COLUMNS = [
    {
        field: 'placeDescription',
        headerName: 'Miejsce',
        width: 300,
        sortable: false,
    },
    {
        field: 'time',
        headerName: 'Data',
        width: 150,
        sortable: false,
        renderCell: (params) => formatDateAndTime(params.data.time),
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
    {
        field: 'odometerMileage',
        headerName: 'Przebieg',
        width: 150,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => formatMileage(params.data.odometerMileage),
    },
];

export const VEHICLE_TRIPS_COLUMNS = [
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
        renderCell: (params) => formatDateAndTime(params.data.startTime),
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
        renderCell: (params) =>
            formatDateAndTime(params.data.destinationArrivalTime),
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
        renderCell: (params) => formatDuration(params.data.travelTime),
    },
    {
        field: 'averageSpeed',
        headerName: 'V avg',
        width: 120,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => formatSpeed(params.data.averageSpeed),
    },
    {
        field: 'maximumSpeed',
        headerName: 'V max',
        width: 120,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => formatSpeed(params.data.maximumSpeed),
    },
];

export const maintenancesColumns = [
    {
        field: 'maintenanceProviderDescription',
        headerName: 'Wykonawca',
        width: 200,
    },
    {
        field: 'description',
        headerName: 'Opis',
        width: 300,
    },
    {
        field: 'date',
        headerName: 'Data',
        width: 150,
        renderCell: (params) => formatDateAndTime(params.data.date),
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
        field: 'odometerMileage',
        headerName: 'Przebieg',
        width: 150,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => formatMileage(params.data.odometerMileage),
    },
    {
        field: 'usedParts',
        headerName: 'Części',
        width: 200,
        align: 'center',
        headerAlign: 'center',
    },
];

export const VEHICLES_CONDENSED_COLUMNS = [
    {
        field: 'brand',
        headerName: 'Marka',
        width: 180,
    },
    {
        field: 'model',
        headerName: 'Model',
        width: 150,
    },
    {
        field: 'yearOfProduction',
        headerName: 'Rok produkcji',
        width: 120,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
    },
    {
        field: 'licensePlate',
        headerName: 'Tablica rejestracyjna',
        width: 165,
        align: 'center',
        headerAlign: 'center',
    },
    {
        field: 'vin',
        headerName: 'Numer VIN',
        width: 215,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
    },
];

export const ADMIN_COMPANIES_COLUMNS = [
    { field: 'name', headerName: 'Nazwa', width: 150 },
    {
        field: 'description',
        headerName: 'Opis',
        width: 260,
        sortable: false,
    },
    {
        field: 'nip',
        headerName: 'Numer NIP',
        width: 130,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
    },
    {
        field: 'mail',
        headerName: 'Mail',
        width: 230,
    },
    {
        field: 'phoneNumber',
        headerName: 'Numer telefonu',
        type: 'number',
        width: 130,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
    },
    { field: 'address', headerName: 'Adres', width: 290, sortable: false },
    { field: 'manager', headerName: 'Kierownik', width: 200 },
];

export const ADMIN_USERS_COLUMNS = [
    { field: 'firstName', headerName: 'Imię', width: 230 },
    { field: 'lastName', headerName: 'Nazwisko', width: 260 },
    {
        field: 'phoneNumber',
        headerName: 'Numer telefonu',
        type: 'number',
        width: 130,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
    },
    {
        field: 'email',
        headerName: 'Mail',
        width: 320,
    },
    {
        field: 'role',
        headerName: 'Rola',
        width: 150,
        renderCell: (params) => {
            if (params.data.role === 'admin')
                return USER_ROLES_DESCRIPTION.admin;
            if (params.data.role === 'driver')
                return USER_ROLES_DESCRIPTION.driver;
            if (params.data.role === 'manager')
                return USER_ROLES_DESCRIPTION.manager;
        },
    },
];

export const MANAGER_DRIVERS_COLUMNS = [
    { field: 'firstName', headerName: 'Imię', width: 230 },
    { field: 'lastName', headerName: 'Nazwisko', width: 260 },
    {
        field: 'phoneNumber',
        headerName: 'Numer telefonu',
        type: 'number',
        width: 130,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
    },
    {
        field: 'email',
        headerName: 'Mail',
        width: 320,
    },
    {
        field: 'drivingLicenseNumber',
        headerName: 'Prawo jazdy',
        width: 130,
        align: 'center',
        headerAlign: 'center',
    },
];

export const DRIVER_MANAGEMENT_COLUMNS = [
    {
        headerAlign: 'center',
        field: 'hire',
        headerName: 'Zatrudnij',
        width: 100,
        sortable: false,
        renderCell: (params) => {
            return (
                <StyledArrow size={'lg'} icon={faArrowAltCircleLeft} green />
            );
        },
    },
    {
        headerAlign: 'center',
        field: 'lastName',
        headerName: 'Nazwisko',
        width: 130,
        sortable: false,
    },
    {
        headerAlign: 'center',
        field: 'email',
        headerName: 'Mail',
        width: 200,
        sortable: false,
    },
];

export const DRIVER_MANAGEMENT_COLUMNS_REVERSED = [
    {
        headerAlign: 'center',
        field: 'lastName',
        headerName: 'Nazwisko',
        width: 130,
        sortable: false,
    },
    {
        headerAlign: 'center',
        field: 'email',
        headerName: 'Mail',
        width: 200,
        sortable: false,
    },
    {
        headerAlign: 'center',
        field: 'button',
        headerName: 'Zwolnij',
        width: 80,
        sortable: false,
        renderCell: (params) => {
            return <StyledArrow size={'lg'} icon={faArrowAltCircleRight} red />;
        },
    },
];

export const DRIVER_VEHICLES_MANAGEMENT_COLUMNS = [
    {
        headerAlign: 'center',
        field: 'button',
        headerName: 'Dodaj',
        width: 75,
        sortable: false,
        renderCell: (params) => {
            return (
                <StyledArrow size={'lg'} icon={faArrowAltCircleLeft} green />
            );
        },
    },
    {
        field: 'brand',
        headerName: 'Marka',
        width: 140,
    },
    {
        field: 'model',
        headerName: 'Model',
        width: 110,
    },
    {
        field: 'licensePlate',
        headerName: 'Tablica',
        width: 110,
        align: 'center',
        headerAlign: 'center',
    },
];

export const DRIVER_VEHICLES_MANAGEMENT_COLUMNS_REVERSED = [
    {
        field: 'brand',
        headerName: 'Marka',
        width: 140,
    },
    {
        field: 'model',
        headerName: 'Model',
        width: 110,
    },
    {
        field: 'licensePlate',
        headerName: 'Tablica',
        width: 110,
        align: 'center',
        headerAlign: 'center',
    },
    {
        headerAlign: 'center',
        field: 'button',
        headerName: 'Usuń',
        width: 67,
        sortable: false,
        renderCell: (params) => {
            return <StyledArrow size={'lg'} icon={faArrowAltCircleRight} red />;
        },
    },
];

const StyledArrow = styled(FontAwesomeIcon)`
    margin: 0px auto;
    color: ${({ theme }) => theme.red};

    ${({ green }) =>
        green &&
        css`
            color: ${({ theme }) => theme.green};
        `};

    ${({ red }) =>
        red &&
        css`
            color: ${({ theme }) => theme.red};
        `};
`;
