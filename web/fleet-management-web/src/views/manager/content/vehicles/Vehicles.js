import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../utils/constans';
import styled from 'styled-components';
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
} from '@fortawesome/free-solid-svg-icons';
import VehicleInformationModal from '../../../../components/vehicleModals/VehicleInformationModal';
import VehicleMaintenancesModal from '../../../../components/vehicleModals/VehicleMaintenancesModal';
import VehicleTripsModal from '../../../../components/vehicleModals/VehicleTripsModal';
import VehicleRefuelingsModal from '../../../../components/vehicleModals/VehicleRefuelingsModal';
import { vehiclesCondensedColumns } from '../../../../utils/columns';
import { Checkbox } from '@material-ui/core';
import VehicleStatisticsModal from './modals/VehicleStatisticsModal';
import DGStyledIcon from '../../../../components/DGStyledIcon';

const Vehicles = ({ user }) => {
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [detailsModalVisible, setDetailsModalVisible] = useState(false);
    const [tripsModalVisible, setTripsModalVisible] = useState(false);
    const [refuelingsModalVisible, setRefuelingsModalVisible] = useState(false);
    const [maintenancesModalVisible, setMaintenancesModalVisible] = useState(
        false
    );
    const [statisticsModalVisible, setStatisticsModalVisible] = useState(false);
    const [activeVehicles, setActiveVehicles] = useState(true);
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

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

    const columnsButtons = [
        {
            headerAlign: 'center',
            field: 'open',
            headerName: 'Statystyki',
            width: 100,
            sortable: false,
            renderCell: (params) => {
                return (
                    <DGStyledIcon
                        icon={faChartBar}
                        onClick={() => {
                            console.log(params.data);
                            setSelectedVehicle(params.data);
                            setStatisticsModalVisible(!statisticsModalVisible);
                        }}
                    />
                );
            },
        },
        {
            headerAlign: 'center',
            field: 'open',
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
            field: 'open',
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
            field: 'open',
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
            field: 'open',
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
            field: 'open',
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

    return (
        <ContentWrapper>
            <ContentHeader>
                <Title>{'Pojazdy w Twoim przedsiębiorstwie'}</Title>
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
                            ...vehiclesCondensedColumns,
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
