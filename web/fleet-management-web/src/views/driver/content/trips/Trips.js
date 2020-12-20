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
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import TripModal from './TripModal';
import { VEHICLE_TRIPS_COLUMNS } from '../../../../utils/columns';

const StyledIcon = styled(FontAwesomeIcon)`
    margin: 0px auto;
    cursor: pointer;
`;

const Trips = ({ user }) => {
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [trips, setTrips] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState(null);

    useEffect(() => {
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
                setLoading(false);
                console.log(
                    `An error occurred while downloading user's vehicles: ${err}`
                );
            });
    }, [refresh]);

    const columnsButton = [
        {
            headerAlign: 'center',
            field: 'open',
            headerName: 'Otwórz mapę',
            width: 130,
            sortable: false,
            renderCell: (params) => {
                return (
                    params.data.locationHistory.length !== 0 && (
                        <StyledIcon
                            icon={faMapMarkedAlt}
                            onClick={() => {
                                setSelectedTrip(params.data);
                                setModalVisible(!modalVisible);
                            }}
                        />
                    )
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
                        columns={[...VEHICLE_TRIPS_COLUMNS, ...columnsButton]}
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
