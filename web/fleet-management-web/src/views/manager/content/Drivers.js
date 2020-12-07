import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewUserModal from '../../../components/newitem/newuser/NewUserModal';
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import { API_URL } from '../../../utils/constans';
import {
    faTrash,
    faSpinner,
    faChartBar,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../components/Button';
import Title from '../../../components/Title';
import {
    ContentWrapper,
    ContentBody,
    ContentHeader,
} from '../../../components/PageContents';
import { MANAGER_DRIVERS_COLUMNS } from '../../../utils/columns';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Drivers = ({ user }) => {
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [statisticsLoading, setStatisticsLoading] = useState(false);
    const [statisticsData, setStatisticsData] = useState({});
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [companyName, setCompanyName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const columnsButton = [
        {
            headerAlign: 'center',
            field: 'open',
            headerName: 'Statystyki',
            width: 130,
            sortable: false,
            renderCell: (params) => {
                return statisticsLoading &&
                    params.data.email === selectedDriver ? (
                    <Spinner icon={faSpinner} spin size={'2x'} />
                ) : (
                    <StyledIcon
                        size={'lg'}
                        icon={faChartBar}
                        onClick={() => {
                            setSelectedDriver(params.data.email);
                            setStatisticsLoading(true);
                            loadDriverStats(params.data.email);
                            // setModalVisible(!modalVisible);
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
                    let drivers = [];
                    data.drivers.forEach((driver) => {
                        drivers = [
                            ...drivers,
                            { ...driver.account, ...driver },
                        ];
                    });

                    setCompanyName(data.name);
                    setDrivers(drivers);
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
                setStatisticsLoading(false);
                const data = res.data.result;

                if (data) {
                    setStatisticsData(data);
                }
            })
            .catch((err) => {
                setStatisticsLoading(false);
                console.log(
                    `An error occurred while downloading user's vehicles: ${err}`
                );
            });
    };

    return (
        <ContentWrapper>
            <ContentHeader>
                <Title>
                    {companyName
                        ? `Kierowcy jeżdżący dla ${companyName}`
                        : 'Kierowcy w przedsiębiorstwie'}
                </Title>
                <Button
                    wide
                    secondary
                    onClick={() => setModalVisible(!modalVisible)}
                >
                    DODAJ
                </Button>
            </ContentHeader>
            <ContentBody>
                <DataGridWrapper>
                    <DataGrid
                        loading={loading}
                        rows={drivers}
                        columns={[...MANAGER_DRIVERS_COLUMNS, ...columnsButton]}
                        pageSize={parseInt(visualViewport.height / 80)}
                        disableSelectionOnClick
                        hideFooterRow
                    />
                </DataGridWrapper>
            </ContentBody>
            {/* <NewUserModal
                isVisible={modalVisible}
                handleClose={() => setModalVisible(false)}
                setRefresh={() => setRefresh(!refresh)}
            /> */}
        </ContentWrapper>
    );
};

const Spinner = styled(FontAwesomeIcon)`
    color: ${({ theme }) => theme.primaryColor};
    display: block;
    width: 200px;
    height: 200px;
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
