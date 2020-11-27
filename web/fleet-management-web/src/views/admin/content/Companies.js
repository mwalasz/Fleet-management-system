import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewItemBar from '../../../components/NewItemBar';
import { DataGrid } from '@material-ui/data-grid';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { API_URL, userRoles } from '../../../utils/constans';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faRedo } from '@fortawesome/free-solid-svg-icons';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '../../../components/Button';
import Title from '../../../components/Title';
import {
    ContentWrapper,
    ContentBody,
    ContentHeader,
} from '../../../components/PageContents';

const Companies = ({ user }) => {
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${API_URL}/companies/get_all`, {
                withCredentials: true,
                headers: {
                    Authorization: 'Bearer ' + user.token,
                },
            })
            .then((res) => {
                setLoading(false);
                console.log(res);
                res.data.result.forEach((x) => {
                    x.id = x.nip;
                    const manager = x.managerAccount.account;
                    x.manager = `${manager.firstName} ${manager.lastName}`;
                });
                if (res.data.result) setCompanies(res.data.result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [refresh]);

    const columns = [
        { field: 'name', headerName: 'Nazwa', width: 150 },
        {
            field: 'description',
            headerName: 'Opis',
            width: 260,
            sortable: false,
        },
        { field: 'nip', headerName: 'Numer NIP', width: 130, sortable: false },
        {
            field: 'mail',
            headerName: 'Mail',
            width: 320,
        },
        {
            field: 'phoneNumber',
            headerName: 'Numer telefonu',
            type: 'number',
            width: 130,
            sortable: false,
        },
        { field: 'address', headerName: 'Adres', width: 200, sortable: false },
        { field: 'manager', headerName: 'Kierownik', width: 200 },
    ];

    return (
        <>
            <ContentWrapper>
                <ContentHeader>
                    <Title>{'Przedsiębiorstwa'}</Title>
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
                            rows={companies}
                            columns={columns}
                            pageSize={parseInt(visualViewport.height / 80)}
                            disableSelectionOnClick
                            hideFooterRow
                        />
                    </DataGridWrapper>
                </ContentBody>
                <NewItemBar
                    isVisible={modalVisible}
                    handleClose={() => setModalVisible(false)}
                    setRefresh={() => setRefresh(!refresh)}
                />
            </ContentWrapper>
        </>
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
    height: calc(100vh - 168px);
`;

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(Companies);
