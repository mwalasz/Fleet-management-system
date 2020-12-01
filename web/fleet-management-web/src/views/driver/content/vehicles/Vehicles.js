import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../utils/constans';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import Button from '../../../../components/Button';
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
    faRoute,
    faTools,
} from '@fortawesome/free-solid-svg-icons';
import VehicleInformationModal from './modals/VehicleInformationModal';
import VehicleMaintenancesModal from './modals/VehicleMaintenancesModal';
import VehicleTripsModal from './modals/VehicleTripsModal';
import VehicleRefuelingsModal from './modals/VehicleRefuelingsModal';

const StyledIcon = styled(FontAwesomeIcon)`
    margin: 0px auto;
    cursor: pointer;
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
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    useEffect(() => {
        console.log('user');
        console.log(user);
        setLoading(true);
        axios
            .get(
                `${API_URL}/drivers/get_assigned_vehicles?mail=${user.email}&extended=true`,
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

    const columns = [
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
            width: 190,
            sortable: false,
            align: 'center',
            headerAlign: 'center',
        },
        {
            headerAlign: 'center',
            field: 'open',
            headerName: 'Szczegóły',
            width: 100,
            sortable: false,
            renderCell: (params) => {
                return (
                    <StyledIcon
                        icon={faInfoCircle}
                        onClick={() => {
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
                    <StyledIcon
                        icon={faRoute}
                        onClick={() => {
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
                    <StyledIcon
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
                    <StyledIcon
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
    ];

    return (
        <ContentWrapper>
            <ContentHeader>
                <Title>{'Twoje przydzielone pojazdy'}</Title>
                {/* <Button
                        wide
                        secondary
                        onClick={() => setModalVisible(!modalVisible)}
                    >
                        POJAZD
                    </Button> */}
            </ContentHeader>
            <ContentBody>
                <DataGridWrapper>
                    <DataGrid
                        loading={loading}
                        rows={vehicles}
                        columns={columns}
                        pageSize={parseInt(visualViewport.height / 80)}
                        disableSelectionOnClick
                        hideFooterRow
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
