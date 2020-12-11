import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import { API_URL } from '../../../../utils/constans';
import {
    faSpinner,
    faChartBar,
    faCarSide,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../components/Button';
import Title from '../../../../components/Title';
import {
    ContentWrapper,
    ContentBody,
    ContentHeader,
} from '../../../../components/PageContents';
import { MANAGER_DRIVERS_COLUMNS } from '../../../../utils/columns';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DriverStatisticsModal from './modals/DriverStatisticsModal';
import DriverManagementModal from './modals/DriverManagementModal';
import { spreadArray } from '../../../../utils/utils';
import DriverVehiclesModal from './modals/DriverVehiclesModal';

const Drivers = ({ user }) => {
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);

    const [managementLoading, setManagementLoading] = useState(false);
    const [managementData, setManagementData] = useState(null);
    const [managementModalVisible, setManagementModalVisible] = useState(false);

    const [statisticsLoading, setStatisticsLoading] = useState(false);
    const [statisticsData, setStatisticsData] = useState(null);
    const [statsModalVisible, setStatsModalVisible] = useState(false);

    const [vehiclesLoading, setVehiclesLoading] = useState(false);
    const [vehiclesData, setVehiclesData] = useState(null);
    const [vehiclesModalVisible, setVehiclesModalVisible] = useState(false);

    const [driverAccounts, setDriverAccounts] = useState([]);
    const [selectedDriverMail, setSelectedDriverMail] = useState('');
    const [selectedDriverDescription, setSelectedDriverDescription] = useState(
        ''
    );
    const [company, setCompany] = useState(null);

    const [lastSelectedOption, setLastSelectedOption] = useState('');
    const options = {
        stats: 'stats',
        vehicles: 'vehicles',
    };

    const columnsButton = [
        {
            headerAlign: 'center',
            field: 'vehicles',
            headerName: 'Pojazdy',
            width: 130,
            sortable: false,
            renderCell: (params) => {
                return vehiclesLoading &&
                    params.data.email === selectedDriverMail ? (
                    <Spinner icon={faSpinner} spin size={'2x'} />
                ) : (
                    <StyledIcon
                        size={'lg'}
                        icon={faCarSide}
                        onClick={() => {
                            setLastSelectedOption(options.vehicles);
                            setSelectedDriverMail(params.data.email);
                            setSelectedDriverDescription(
                                `${params.data.firstName} ${params.data.lastName} [${params.data.email}]`
                            );

                            if (
                                params.data.email !== selectedDriverMail ||
                                lastSelectedOption !== options.vehicles
                            ) {
                                setVehiclesLoading(true);
                                loadDriverVehicles(params.data.email);
                            } else {
                                setVehiclesModalVisible(true);
                            }
                        }}
                    />
                );
            },
        },
        {
            headerAlign: 'center',
            field: 'open',
            headerName: 'Statystyki',
            width: 130,
            sortable: false,
            renderCell: (params) => {
                return statisticsLoading &&
                    params.data.email === selectedDriverMail ? (
                    <Spinner icon={faSpinner} spin size={'2x'} />
                ) : (
                    <StyledIcon
                        size={'lg'}
                        icon={faChartBar}
                        onClick={() => {
                            setLastSelectedOption(options.stats);
                            setSelectedDriverMail(params.data.email);
                            setSelectedDriverDescription(
                                `${params.data.firstName} ${params.data.lastName} [${params.data.email}]`
                            );
                            if (
                                params.data.email !== selectedDriverMail ||
                                lastSelectedOption !== options.stats
                            ) {
                                setStatisticsLoading(true);
                                loadDriverStats(params.data.email);
                            } else {
                                setStatsModalVisible(true);
                            }
                        }}
                    />
                );
            },
        },
    ];

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${API_URL}/managers/get_company?mail=${user.email}`, {
                withCredentials: true,
                headers: {
                    Authorization: 'Bearer ' + user.token,
                },
            })
            .then((res) => {
                setLoading(false);
                const data = res.data.result;

                if (data) {
                    console.log('company info', data);
                    console.log(data);
                    data.vehicles.forEach((vehicle) => {
                        vehicle.id = vehicle.vin;
                    });
                    setCompany(data);
                    setDriverAccounts(spreadArray(data.drivers));
                }
            })
            .catch((err) => {
                setLoading(false);
                console.log(
                    `An error occurred while downloading user's vehicles: ${err}`
                );
            });
    }, [refresh]);

    const loadDriverStats = (driverMail) => {
        axios
            .get(`${API_URL}/statistics/driver/get_all?mail=${driverMail}`, {
                withCredentials: true,
                headers: {
                    Authorization: 'Bearer ' + user.token,
                },
            })
            .then((res) => {
                const data = res.data.result;

                if (data) {
                    console.log(data);
                    setStatisticsData(data);
                    setTimeout(() => {
                        setStatisticsLoading(false);
                        setStatsModalVisible(true);
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

    const loadDriverVehicles = (driverMail) => {
        setVehiclesLoading(true);
        axios
            .get(
                `${API_URL}/drivers/get_assigned_vehicles?mail=${driverMail}`,
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
                    data.forEach((vehicle) => {
                        vehicle.id = vehicle.vin;
                    });
                    setVehiclesData(data);
                    setTimeout(() => {
                        setVehiclesLoading(false);
                        setVehiclesModalVisible(true);
                    }, 500);
                }
            })
            .catch((err) => {
                setManagementLoading(false);
                console.log(
                    `An error occurred while downloading user's vehicles: ${err}`
                );
            });
    };

    const loadManagementData = () => {
        setManagementLoading(true);
        if (company) {
            axios
                .get(
                    `${API_URL}/companies/get_employed_and_unemployed?nip=${company.nip}`,
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
                        setManagementData(data);
                        setTimeout(() => {
                            setManagementLoading(false);
                            setManagementModalVisible(true);
                        }, 500);
                    }
                })
                .catch((err) => {
                    setManagementLoading(false);
                    console.log(
                        `An error occurred while downloading user's vehicles: ${err}`
                    );
                });
        }
    };

    const TitleWrapper = styled.div`
        display: flex;
        flex-direction: row;
    `;

    return (
        <ContentWrapper>
            <ContentHeader>
                <TitleWrapper>
                    <Title margin>
                        {company
                            ? `Kierowcy jeżdżący dla ${company.name}`
                            : 'Kierowcy w przedsiębiorstwie'}
                    </Title>
                    {managementLoading && (
                        <Spinner icon={faSpinner} spin size={'lg'} />
                    )}
                </TitleWrapper>
                <Button
                    ultraWide
                    secondary
                    onClick={() => loadManagementData()}
                >
                    zarządzaj kierowcami
                </Button>
            </ContentHeader>
            <ContentBody>
                <DataGridWrapper>
                    <DataGrid
                        loading={loading}
                        rows={driverAccounts}
                        columns={[...MANAGER_DRIVERS_COLUMNS, ...columnsButton]}
                        pageSize={parseInt(visualViewport.height / 80)}
                        disableSelectionOnClick
                        hideFooterRow
                    />
                </DataGridWrapper>
            </ContentBody>
            <DriverStatisticsModal
                key={selectedDriverMail ? 1 : 0}
                driverDescription={selectedDriverDescription}
                driverStatistics={statisticsData}
                isVisible={statsModalVisible}
                handleClose={() => {
                    setStatsModalVisible(false);
                }}
            />
            <DriverManagementModal
                isVisible={managementModalVisible}
                managementData={managementData ? managementData : null}
                handleClose={() => {
                    setManagementModalVisible(false);
                    setTimeout(() => setRefresh(!refresh), 500);
                }}
                nip={company ? company.nip : ''}
            />
            <DriverVehiclesModal
                isVisible={vehiclesModalVisible}
                assignedVehicles={vehiclesData ? vehiclesData : null}
                availableVehivles={company ? company.vehicles : null}
                handleClose={() => {
                    setVehiclesModalVisible(false);
                    setTimeout(() => setRefresh(!refresh), 500);
                }}
                driverToModifyMail={selectedDriverMail}
            />
        </ContentWrapper>
    );
};

const Spinner = styled(FontAwesomeIcon)`
    color: ${({ theme }) => theme.primaryColor};
    display: block;
    margin: 30px auto;
`;

const StyledIcon = styled(FontAwesomeIcon)`
    margin: 0px auto;
    cursor: pointer;
`;

const DataGridWrapper = styled.div`
    height: calc(100vh - 220px);
`;

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(Drivers);
