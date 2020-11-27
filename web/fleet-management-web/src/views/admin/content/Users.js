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

const Users = ({ user }) => {
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [activeUsers, setActiveUsers] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${API_URL}/users/get_all?activeUsers=${activeUsers}`, {
                withCredentials: true,
                headers: {
                    Authorization: 'Bearer ' + user.token,
                },
            })
            .then((res) => {
                setLoading(false);
                res.data.result.forEach((x) => {
                    x.id = x.email;
                });
                if (res.data.result) setUsers(res.data.result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [refresh]);

    const handleUpdateUserAvailability = (mail) => {
        if (
            window.confirm(
                `Czy chcesz ${
                    activeUsers ? 'usunąć' : 'aktywować'
                } użytkownika o emailu: ${mail} ?`
            )
        ) {
            axios
                .put(
                    `${API_URL}/users/change_availability?isActive=${!activeUsers}`,
                    [mail],
                    {
                        withCredentials: true,
                        headers: {
                            Authorization: 'Bearer ' + user.token,
                        },
                    }
                )
                .then((res) => {
                    console.log(res);
                    setRefresh(!refresh);
                })
                .catch((err) => console.log(err));
        }
    };

    const columns = [
        { field: 'firstName', headerName: 'Imię', width: 230 },
        { field: 'lastName', headerName: 'Nazwisko', width: 260 },
        {
            field: 'phoneNumber',
            headerName: 'Numer telefonu',
            type: 'number',
            width: 130,
            sortable: false,
        },
        {
            field: 'email',
            headerName: 'Mail',
            width: 320,
        },
        {
            field: 'role',
            headerName: 'Rola',
            width: 150,
            renderCell: (params) => {
                if (params.data.role === 'admin') return userRoles.admin;
                if (params.data.role === 'driver') return userRoles.driver;
                if (params.data.role === 'manager') return userRoles.manager;
            },
        },
        {
            field: 'remove',
            headerName: activeUsers ? 'Usuń' : 'Aktywuj',
            width: 90,
            sortable: false,
            renderCell: (params) => {
                return (
                    <FontAwesomeIcon
                        icon={activeUsers ? faTrash : faRedo}
                        onClick={() =>
                            handleUpdateUserAvailability(params.data.email)
                        }
                    />
                );
            },
        },
    ];

    const handleChangeActiveness = () => {
        setActiveUsers(!activeUsers);
        setRefresh(!refresh);
    };

    return (
        <>
            <ContentWrapper>
                <ContentHeader>
                    <Title>
                        {activeUsers
                            ? 'Aktywni Użytkownicy'
                            : 'Nieaktywni Użytkownicy'}
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
                    <FilterWrapper>
                        <Checkbox
                            color="default"
                            onChange={handleChangeActiveness}
                            checked={activeUsers}
                        />
                        <Text>
                            {activeUsers
                                ? 'Odznacz, aby wyświetlić nieaktywnych użytkowników:'
                                : 'Zanacz, aby wyświetlić aktywnych użytkowników:'}
                        </Text>
                    </FilterWrapper>
                    <DataGridWrapper>
                        <DataGrid
                            loading={loading}
                            rows={users}
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
    height: calc(100vh - 220px);
`;

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(Users);
