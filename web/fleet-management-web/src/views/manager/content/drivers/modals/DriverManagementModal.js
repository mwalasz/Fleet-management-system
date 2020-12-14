import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Modal from '../../../../../components/Modal';
import Button from '../../../../../components/Button';
import ModalAddButton from '../../../../../components/modal/ModalAddButton';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { spreadArray } from '../../../../../utils/utils';
import axios from 'axios';
import { connect } from 'react-redux';
import { API_URL } from '../../../../../utils/constans';
import {
    DRIVER_MANAGEMENT_COLUMNS,
    DRIVER_MANAGEMENT_COLUMNS_REVERSED,
} from '../../../../../utils/columns';

const DriverManagementModal = ({
    user,
    isVisible,
    handleClose,
    managementData,
    nip,
}) => {
    const [loading, setLoading] = useState(false);
    const [employed, setEmployed] = useState([]);
    const [unemployed, setUnemployed] = useState([]);

    useEffect(() => {
        if (managementData !== null) {
            setEmployed(spreadArray(managementData.employed));
            setUnemployed(spreadArray(managementData.unemployed));
            console.log(employed);
        }
    }, [isVisible]);

    const handleSave = () => {
        if (window.confirm(`Czy napewno chcesz zapisać zmiany?`)) {
            setLoading(!loading);
            console.log({ nip, driverMails: employed.map((x) => x.email) });
            axios
                .put(
                    `${API_URL}/companies/update_drivers`,
                    { nip, driverMails: employed.map((x) => x.email) },
                    {
                        withCredentials: true,
                        headers: {
                            Authorization: 'Bearer ' + user.token,
                        },
                    }
                )
                .then((res) => {
                    console.log(res);
                    setLoading(false);
                    handleClose();
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                });
        }
    };

    return (
        <Modal
            isLoading={loading}
            isVisible={isVisible}
            handleClose={handleClose}
            title={`Zarządzanie kierowcami: `}
            wide
            button={
                <ModalAddButton
                    accept
                    loading
                    onClick={() => handleSave()}
                    title={'zapisz'}
                />
            }
        >
            <div style={{ marginTop: '20px' }}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={5}
                >
                    <DataGridWrapper>
                        <StyledHeader>Zatrudnieni:</StyledHeader>
                        <DataGrid
                            rows={employed}
                            columns={DRIVER_MANAGEMENT_COLUMNS_REVERSED}
                            disableSelectionOnClick
                            hideFooterRow
                            onRowClick={(args) => {
                                if (managementData) {
                                    setEmployed(
                                        employed.filter(
                                            (x) => x.email !== args.data.email
                                        )
                                    );
                                    setUnemployed([...unemployed, args.data]);
                                }
                            }}
                        />
                    </DataGridWrapper>
                    <DataGridWrapper>
                        <StyledHeader>Niezatrudnieni - dostępni:</StyledHeader>
                        <DataGrid
                            rows={unemployed}
                            columns={DRIVER_MANAGEMENT_COLUMNS}
                            disableSelectionOnClick
                            hideFooterRow
                            onRowClick={(args) => {
                                console.log(args.data);
                                if (managementData) {
                                    setEmployed([...employed, args.data]);
                                    setUnemployed(
                                        unemployed.filter(
                                            (x) => x.email !== args.data.email
                                        )
                                    );
                                }
                            }}
                        />
                    </DataGridWrapper>
                </Grid>
            </div>
        </Modal>
    );
};

const StyledHeader = styled.p`
    display: block;
    text-align: center;
    font-weight: ${({ theme }) => theme.font.Bold};
    color: ${({ theme }) => theme.primaryColor};
`;

const DataGridWrapper = styled.div`
    height: calc(100vh - 220px);
    width: 450px;
    margin: 20px;
`;

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(DriverManagementModal);
