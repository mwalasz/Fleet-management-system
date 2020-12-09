import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';
import styled, { css } from 'styled-components';
import { Grid } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowAltCircleLeft,
    faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';

const DriverManagementModal = ({ isVisible, handleClose }) => {
    const [loading, setLoading] = useState(false);
    const [employed, setEmployed] = useState([
        { id: 1, name: 'kier1', mail: 'dupa@dusdfpa.pl' },
        { id: 2, name: 'kier2', mail: '22dupa@dupa.pl' },
    ]);
    const [unemployed, setUnemployed] = useState([
        { id: 3, name: 'kier3', mail: 'dupqwea@dupa.pl' },
        { id: 4, name: 'kier4', mail: '22dupa@dupfsda.pl' },
    ]);

    const columns = [
        {
            headerAlign: 'center',
            field: 'dupa',
            headerName: 'Zatrudnij',
            width: 130,
            sortable: false,
            renderCell: (params) => {
                return (
                    <StyledArrow
                        size={'lg'}
                        icon={faArrowAltCircleLeft}
                        green
                    />
                );
            },
        },
        {
            headerAlign: 'center',
            field: 'name',
            headerName: 'Imię',
            width: 130,
            sortable: false,
        },
        {
            headerAlign: 'center',
            field: 'mail',
            headerName: 'Mail',
            width: 130,
            sortable: false,
        },
    ];

    const reversedColumns = [
        {
            headerAlign: 'center',
            field: 'name',
            headerName: 'Imię',
            width: 130,
            sortable: false,
        },
        {
            headerAlign: 'center',
            field: 'mail',
            headerName: 'Mail',
            width: 130,
            sortable: false,
        },
        {
            headerAlign: 'center',
            field: 'dupa',
            headerName: 'Zwolnij',
            width: 130,
            sortable: false,
            renderCell: (params) => {
                return (
                    <StyledArrow size={'lg'} icon={faArrowAltCircleRight} red />
                );
            },
        },
    ];

    return (
        <Modal
            isLoading={loading}
            isVisible={isVisible}
            handleClose={handleClose}
            title={`Zarządzanie kierowcami: `}
            wide
            button={
                <StyledButton
                    accept
                    loading
                    onClick={() => setLoading(!loading)}
                >
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
                        <StyledHeader>Zatrudnieni:</StyledHeader>
                        <DataGrid
                            rows={employed}
                            columns={reversedColumns}
                            disableSelectionOnClick
                            hideFooterRow
                            onRowClick={(args) => {
                                setEmployed(
                                    employed.filter(
                                        (x) => x.mail !== args.data.mail
                                    )
                                );
                                setUnemployed([...unemployed, args.data]);
                            }}
                        />
                    </DataGridWrapper>
                    <DataGridWrapper>
                        <StyledHeader>Niezatrudnieni - dostępni:</StyledHeader>
                        <DataGrid
                            rows={unemployed}
                            columns={columns}
                            disableSelectionOnClick
                            hideFooterRow
                            onRowClick={(args) => {
                                console.log(args.data);
                                setEmployed([...employed, args.data]);
                                setUnemployed(
                                    unemployed.filter(
                                        (x) => x.mail !== args.data.mail
                                    )
                                );
                            }}
                        />
                    </DataGridWrapper>
                </Grid>
            </div>
        </Modal>
    );
};

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

export default DriverManagementModal;
