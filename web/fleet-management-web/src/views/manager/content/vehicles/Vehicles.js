import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../utils/constans';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import Title from '../../../../components/Title';
import {
    ContentWrapper,
    ContentBody,
    ContentHeader,
} from '../../../../components/PageContents';
import { DataGrid } from '@material-ui/data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGasPump,
    faInfoCircle,
    faRedoAlt,
    faRoute,
    faTools,
    faTrashAlt,
    faChartBar,
    faSpinner,
    faExclamationTriangle,
    faExclamationCircle,
    faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import VehicleInformationModal from '../../../../components/vehicleModals/VehicleInformationModal';
import VehicleMaintenancesModal from '../../../../components/vehicleModals/VehicleMaintenancesModal';
import VehicleTripsModal from '../../../../components/vehicleModals/VehicleTripsModal';
import VehicleRefuelingsModal from '../../../../components/vehicleModals/VehicleRefuelingsModal';
import { VEHICLES_CONDENSED_COLUMNS } from '../../../../utils/columns';
import { Checkbox } from '@material-ui/core';
import VehicleStatisticsModal from './modals/VehicleStatisticsModal';
import { withStyles } from '@material-ui/core/styles';
import NewVehicleModal from '../../../../components/newitem/newvehicle/NewVehicleModal';
import DGStyledIcon from '../../../../components/DGStyledIcon';
import Button from '../../../../components/Button';
import { Spinner, TitleWrapper } from '../components/common';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#0D77BB',
        fontSize: theme.typography.pxToRem(15),
        border: '3px solid rgb(54,118,181)',
        maxWidth: '300px',
        textAlign: 'center',
    },
}))(Tooltip);

const DateStatusIcon = ({ warning, error, dateType }) => {
    return (
        <HtmlTooltip
            enterDelay={200}
            leaveDelay={200}
            style={{ fontSize: '20px' }}
            title={
                (warning && `Zbliża się ważna data - ${dateType}!`) ||
                (error && `Minęła ważna data - ${dateType}!`) ||
                'Wszystko w terminie!'
            }
        >
            <p
                style={{
                    whitespace: 'nowrap',
                    overflow: 'hidden',
                    textoverflow: 'ellipsis',
                    fontSize: '16px',
                }}
            >
                <StyledStatusIcon
                    warning={warning}
                    error={error}
                    icon={
                        (warning && faExclamationTriangle) ||
                        (error && faExclamationCircle) ||
                        faCheckCircle
                    }
                />
            </p>
        </HtmlTooltip>
    );
};

const StyledStatusIcon = styled(FontAwesomeIcon)`
    color: ${({ theme }) => theme.green};
    white-space: 'nowrap';
    overflow: hidden;
    text-overflow: ellipsis;

    ${({ warning }) =>
        warning &&
        css`
            color: ${({ theme }) => theme.yellow};
        `};

    ${({ error }) =>
        error &&
        css`
            color: ${({ theme }) => theme.red};
        `};
`;

const Vehicles = ({ user }) => {
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);

    const [detailsModalVisible, setDetailsModalVisible] = useState(false);
    const [tripsModalVisible, setTripsModalVisible] = useState(false);
    const [refuelingsModalVisible, setRefuelingsModalVisible] = useState(false);
    const [maintenancesModalVisible, setMaintenancesModalVisible] = useState(
        false
    );
    const [newVehicleModalVisible, setNewVehicleModalVisible] = useState(false);

    const [activeVehicles, setActiveVehicles] = useState(true);
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const [dataForNewVehicleLoading, setDataForNewVehicleLoading] = useState(
        false
    );
    const [dataForNewVehicle, setDataForNewVehicle] = useState(null);

    const [statisticsModalVisible, setStatisticsModalVisible] = useState(false);
    const [statisticsLoading, setStatisticsLoading] = useState(false);
    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
        console.log('user');
        console.log(user);
        setLoading(true);
        axios
            .get(
                `${API_URL}/companies/get_vehicles?managerMail=${user.email}&extended=true&active=${activeVehicles}`,
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
                    data.forEach((vehicle) => {
                        vehicle.id = vehicle.vin;
                    });
                    setVehicles(data);
                }
            })
            .catch((err) => {
                console.log(
                    `An error occurred while downloading user's vehicles: ${err}`
                );
            });
    }, [refresh]);

    const handleVehicleActiveness = (vehicle) => {
        const vin = vehicle.vin;
        if (
            window.confirm(
                `Czy napewno chcesz ${
                    activeVehicles ? 'usunąć' : 'aktywować'
                } pojazd o numerze vin: ${vin}?`
            )
        ) {
            axios
                .put(
                    `${API_URL}/vehicles/change_availability?managerMail=${
                        user.email
                    }&isActive=${!activeVehicles}`,
                    [vin],
                    {
                        withCredentials: true,
                        headers: {
                            Authorization: 'Bearer ' + user.token,
                        },
                    }
                )
                .then((res) => {
                    setLoading(false);
                    setRefresh(!refresh);
                })
                .catch((err) => {
                    console.log(
                        `An error occurred while removing vehicle [${vin}]: ${err}`
                    );
                });
        }
    };

    const loadVehicleStatistics = (vin) => {
        setStatisticsLoading(true);
        axios
            .get(
                `${API_URL}/statistics/vehicle/get_all_per_vehicle?vin=${vin}`,
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
                    console.log(data);
                    setStatistics(data);
                    setTimeout(() => {
                        setStatisticsLoading(false);
                        setStatisticsModalVisible(true);
                    }, 500);
                }
            })
            .catch((err) => {
                setStatisticsLoading(false);
                console.log(
                    `An error occurred while downloading user's vehicles: ${err}`
                );
            });
    };

    const checkDate = (dateToCheck) => {
        const difference = moment(dateToCheck).diff(moment.now(), 'days');

        if (difference < 0 || difference < 0) return 'error';
        else if (difference <= 14 || difference <= 14) return 'warning';
        return 'ok';
    };

    const statusColumn = {
        field: 'more',
        width: 50,
        sortable: true,
        renderHeader: () => {
            return <span style={{ color: 'white' }}>status</span>;
        },
        renderCell: (params) => {
            const insurance = checkDate(params.data.insuranceExpirationDate);
            const inspection = checkDate(params.data.technicalInspectionDate);

            return (
                <DateStatusIcon
                    error={insurance === 'error' || inspection === 'error'}
                    warning={
                        insurance === 'warning' || inspection === ' warning'
                    }
                    dateType={
                        insurance !== 'ok'
                            ? 'opłata ubezpieczenia'
                            : inspection !== 'ok'
                            ? 'wykonanie przeglądu'
                            : ''
                    }
                />
            );
        },
    };

    const columnsButtons = [
        {
            headerAlign: 'center',
            field: 'stats',
            headerName: 'Statystyki',
            width: 100,
            sortable: false,
            renderCell: (params) => {
                return statisticsLoading &&
                    selectedVehicle &&
                    params.data.vin === selectedVehicle.vin ? (
                    <Spinner
                        icon={faSpinner}
                        spin
                        size={'2x'}
                        style={{ display: 'block', margin: '30px auto' }}
                    />
                ) : (
                    <DGStyledIcon
                        icon={faChartBar}
                        onClick={() => {
                            console.log(params.data);
                            setSelectedVehicle(params.data);
                            setStatisticsLoading(true);
                            loadVehicleStatistics(params.data.vin);
                        }}
                    />
                );
            },
        },
        {
            headerAlign: 'center',
            field: 'more',
            headerName: 'Szczegóły',
            width: 100,
            sortable: false,
            renderCell: (params) => {
                return (
                    <DGStyledIcon
                        icon={faInfoCircle}
                        onClick={() => {
                            console.log(params.data);
                            setSelectedVehicle(params.data);
                            setDetailsModalVisible(!detailsModalVisible);
                        }}
                    />
                );
            },
        },
        {
            headerAlign: 'center',
            field: 'trips',
            headerName: 'Trasy',
            width: 100,
            sortable: false,
            renderCell: (params) => {
                return (
                    <DGStyledIcon
                        icon={faRoute}
                        onClick={() => {
                            console.log(params.data);
                            setSelectedVehicle(params.data);
                            setTripsModalVisible(!tripsModalVisible);
                        }}
                    />
                );
            },
        },
        {
            headerAlign: 'center',
            field: 'refuels',
            headerName: 'Tankowania',
            width: 140,
            sortable: false,
            renderCell: (params) => {
                return (
                    <DGStyledIcon
                        icon={faGasPump}
                        onClick={() => {
                            setSelectedVehicle(params.data);
                            setRefuelingsModalVisible(!refuelingsModalVisible);
                        }}
                    />
                );
            },
        },
        {
            headerAlign: 'center',
            field: 'services',
            headerName: 'Serwisy',
            width: 100,
            sortable: false,
            renderCell: (params) => {
                return (
                    <DGStyledIcon
                        icon={faTools}
                        onClick={() => {
                            setSelectedVehicle(params.data);
                            setMaintenancesModalVisible(
                                !maintenancesModalVisible
                            );
                        }}
                    />
                );
            },
        },
        {
            headerAlign: 'center',
            field: 'delete',
            headerName: activeVehicles ? 'Usuń' : 'Aktywuj',
            width: 100,
            sortable: false,
            renderCell: (params) => {
                return (
                    <DGStyledIcon
                        icon={activeVehicles ? faTrashAlt : faRedoAlt}
                        onClick={() => {
                            setSelectedVehicle(params.data);
                            handleVehicleActiveness(params.data);
                        }}
                    />
                );
            },
        },
    ];

    const getVehicleName = () => {
        return selectedVehicle
            ? `${selectedVehicle.brand} ${selectedVehicle.model}`
            : '';
    };

    return (
        <ContentWrapper>
            <ContentHeader>
                <TitleWrapper>
                    <Title>{'Pojazdy w Twoim przedsiębiorstwie'}</Title>
                    {dataForNewVehicleLoading && (
                        <Spinner icon={faSpinner} spin size={'lg'} />
                    )}
                </TitleWrapper>
                <Button
                    wide
                    secondary
                    onClick={() => setNewVehicleModalVisible(true)}
                >
                    DODAJ
                </Button>
            </ContentHeader>
            <ContentBody>
                <FilterWrapper>
                    <Checkbox
                        color="default"
                        onChange={() => {
                            setActiveVehicles(!activeVehicles);
                            setRefresh(!refresh);
                        }}
                        checked={activeVehicles}
                    />
                    <Text>
                        {activeVehicles
                            ? 'Odznacz, aby wyświetlić nieaktywne pojazdy:'
                            : 'Zanacz, aby wyświetlić aktywne pojazdy:'}
                    </Text>
                </FilterWrapper>
                <DataGridWrapper>
                    <DataGrid
                        loading={loading}
                        rows={vehicles}
                        columns={[
                            statusColumn,
                            ...VEHICLES_CONDENSED_COLUMNS,
                            ...columnsButtons,
                        ]}
                        pageSize={parseInt(visualViewport.height / 80)}
                        hideFooterRow
                        disableSelectionOnClick
                    />
                </DataGridWrapper>
            </ContentBody>
            <VehicleInformationModal
                wide
                vehicle={selectedVehicle}
                isVisible={detailsModalVisible}
                handleClose={() => setDetailsModalVisible(false)}
                setRefresh={() => setRefresh(!refresh)}
            />
            <VehicleMaintenancesModal
                wide
                vehicle={selectedVehicle}
                isVisible={maintenancesModalVisible}
                handleClose={() => setMaintenancesModalVisible(false)}
                setRefresh={() => setRefresh(!refresh)}
            />
            <VehicleTripsModal
                wide
                vehicle={selectedVehicle}
                isVisible={tripsModalVisible}
                handleClose={() => setTripsModalVisible(false)}
                setRefresh={() => setRefresh(!refresh)}
            />
            <VehicleRefuelingsModal
                wide
                vehicle={selectedVehicle}
                isVisible={refuelingsModalVisible}
                handleClose={() => setRefuelingsModalVisible(false)}
                setRefresh={() => setRefresh(!refresh)}
            />
            <VehicleStatisticsModal
                isVisible={statisticsModalVisible}
                handleClose={() => setStatisticsModalVisible(false)}
                vehicleStatistics={statistics}
                vehicleDescription={getVehicleName()}
            />
            <NewVehicleModal
                data={dataForNewVehicle ? setDataForNewVehicle : null}
                isVisible={newVehicleModalVisible}
                handleClose={() => setNewVehicleModalVisible(false)}
                setRefresh={() => setRefresh(!refresh)}
            />
        </ContentWrapper>
    );
};

const Text = styled.text`
    font-size: ${({ theme }) => theme.font.M};
    font-weight: ${({ theme }) => theme.font.Regular};
    transition: all 0.3s;
    display: inline;
    margin: 10px;
`;

const FilterWrapper = styled.div`
    margin-bottom: 10px;
`;

const DataGridWrapper = styled.div`
    height: calc(100vh - 220px);
`;

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(Vehicles);
