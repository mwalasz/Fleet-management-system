import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { spreadArray } from '../../../../utils/utils';
import axios from 'axios';
import { connect } from 'react-redux';
import { API_URL } from '../../../../utils/constans';
import {
    DRIVER_VEHICLES_MANAGEMENT_COLUMNS,
    DRIVER_VEHICLES_MANAGEMENT_COLUMNS_REVERSED,
} from '../../../../utils/columns';

const DriverVehiclesModal = ({
    user,
    isVisible,
    handleClose,
    assignedVehicles,
    availableVehivles,
    driverToModifyMail,
}) => {
    const [loading, setLoading] = useState(false);
    const [assigned, setAssigned] = useState([]);
    const [available, setAvailable] = useState([]);

    useEffect(() => {
        if (availableVehivles && assignedVehicles) {
            setAssigned(assignedVehicles);
            setAvailable(
                availableVehivles.filter(
                    (x) => !assignedVehicles.find((y) => y.vin === x.vin)
                )
            );
        }
    }, [isVisible]);

    const handleSave = () => {
        if (window.confirm(`Czy napewno chcesz zapisać zmiany?`)) {
            setLoading(!loading);
            console.log({
                mail: driverToModifyMail,
                vehiclesVin: assigned.map((x) => x.vin),
            });
            axios
                .put(
                    `${API_URL}/drivers/change_available_vehicles`,
                    {
                        mail: driverToModifyMail,
                        vehiclesVin: assigned.map((x) => x.vin),
                    },
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
            title={`Zarządzanie pojazdami przydzielonymi kierowcy: `}
            wide
            button={
                <StyledButton accept loading onClick={() => handleSave()}>
                    zapisz
                </StyledButton>
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
                        <StyledHeader>Przydzielone:</StyledHeader>
                        <DataGrid
                            rows={assigned}
                            columns={
                                DRIVER_VEHICLES_MANAGEMENT_COLUMNS_REVERSED
                            }
                            disableSelectionOnClick
                            hideFooterRow
                            onRowClick={(args) => {
                                if (assigned) {
                                    setAssigned(
                                        assigned.filter(
                                            (x) => x.vin !== args.data.vin
                                        )
                                    );
                                    setAvailable([...available, args.data]);
                                }
                            }}
                        />
                    </DataGridWrapper>
                    <DataGridWrapper>
                        <StyledHeader>Dostępne:</StyledHeader>
                        <DataGrid
                            rows={available}
                            columns={DRIVER_VEHICLES_MANAGEMENT_COLUMNS}
                            disableSelectionOnClick
                            hideFooterRow
                            onRowClick={(args) => {
                                console.log(args.data);
                                if (assigned) {
                                    setAssigned([...assigned, args.data]);
                                    setAvailable(
                                        available.filter(
                                            (x) => x.vin !== args.data.vin
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

const StyledButton = styled(Button)`
    position: absolute;
    right: 0;
    top: 0;
    margin: 65px;
`;

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
export default connect(mapStateToProps)(DriverVehiclesModal);
