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
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import TripModal from './TripModal';
import moment from 'moment';

const StyledIcon = styled(FontAwesomeIcon)`
    margin: 0px auto;
    cursor: pointer;
`;

const formatDate = (params, isStart) => {
    const date = isStart
        ? params.data.startTime
        : params.data.destinationArrivalTime;
    return <p>{date ? moment(date).format('HH:mm, D.M.YYYY') : '-'}</p>;
};

const Trips = ({ user }) => {
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [trips, setTrips] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState(null);

    useEffect(() => {
        console.log('user');
        console.log(user);
        setLoading(true);
        axios
            .get(`${API_URL}/drivers/get_all_trips?mail=${user.email}`, {
                withCredentials: true,
                headers: {
                    Authorization: 'Bearer ' + user.token,
                },
            })
            .then((res) => {
                setLoading(false);
                const data = res.data.result;

                if (data) {
                    console.log('res.data.result');
                    console.log(data);
                    setTrips(data);
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
            field: 'startPlace',
            headerName: 'Miejsce rozpoczęcia',
            width: 180,
        },
        {
            field: 'startTime',
            headerName: 'Czas rozpoczęcia',
            width: 150,
            sortable: false,
            renderCell: (params) => formatDate(params, true),
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
            renderCell: (params) => formatDate(params, false),
        },
        {
            field: 'distance',
            headerName: 'Dystans',
            width: 100,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'travelTime',
            headerName: 'Czas jazdy',
            width: 100,
            sortable: false,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'averageSpeed',
            headerName: 'Średnia prędkość',
            width: 100,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'maximumSpeed',
            headerName: 'Maks. prędkość',
            width: 100,
            align: 'center',
            headerAlign: 'center',
        },
        {
            headerAlign: 'center',
            field: 'open',
            headerName: 'Informacje',
            width: 130,
            sortable: false,
            renderCell: (params) => {
                return (
                    <StyledIcon
                        icon={faInfoCircle}
                        onClick={() => {
                            setSelectedTrip(params.data);
                            setModalVisible(!modalVisible);
                        }}
                    />
                );
            },
        },
    ];

    return (
        <ContentWrapper>
            <ContentHeader>
                <Title>{'Twoje trasy'}</Title>
            </ContentHeader>
            <ContentBody>
                <DataGridWrapper>
                    <DataGrid
                        loading={loading}
                        rows={trips}
                        columns={columns}
                        pageSize={parseInt(visualViewport.height / 80)}
                        disableSelectionOnClick
                        hideFooterRow
                    />
                </DataGridWrapper>
            </ContentBody>
            <TripModal
                wide
                trip={selectedTrip}
                isVisible={modalVisible}
                handleClose={() => setModalVisible(false)}
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
export default connect(mapStateToProps)(Trips);
