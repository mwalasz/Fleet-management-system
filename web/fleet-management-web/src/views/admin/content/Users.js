import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewItemBar from '../../../components/NewItemBar';
import { DataGrid } from '@material-ui/data-grid';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { API_URL } from '../../../utils/constans';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faRedo } from '@fortawesome/free-solid-svg-icons';
import Checkbox from '@material-ui/core/Checkbox';

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
        { field: 'firstName', headerName: 'Imię', width: 130 },
        { field: 'lastName', headerName: 'Nazwisko', width: 160 },
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
            width: 190,
        },
        {
            field: 'role',
            headerName: 'Rola',
            width: 90,
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
        <div>
            <p>Users</p>
            <Checkbox
                color="default"
                onChange={handleChangeActiveness}
                checked={activeUsers}
            />
            <button onClick={() => setModalVisible(!modalVisible)}>
                dodaj
            </button>
            <DataGridWrapper>
                <DataGrid
                    loading={loading}
                    rows={users}
                    columns={columns}
                    pageSize={9}
                    disableSelectionOnClick
                    hideFooterRow
                />
            </DataGridWrapper>
            <NewItemBar isVisible={modalVisible} />
        </div>
    );
};

const DataGridWrapper = styled.div`
    margin-top: 10px;
    height: 800px;
    width: '100vw';
`;

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(Users);
