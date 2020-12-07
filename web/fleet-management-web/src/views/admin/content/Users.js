import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewUserModal from '../../../components/newitem/newuser/NewUserModal';
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import { API_URL } from '../../../utils/constans';
import { faTrash, faRedo } from '@fortawesome/free-solid-svg-icons';
import CheckBox from './components/CheckBox';
import { DataGridWrapper, StyledIcon } from './components/Common';
import Button from '../../../components/Button';
import Title from '../../../components/Title';
import {
    ContentWrapper,
    ContentBody,
    ContentHeader,
} from '../../../components/PageContents';
import { ADMIN_USERS_COLUMNS } from '../../../utils/columns';

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

    const columnsButton = [
        {
            headerAlign: 'center',
            field: 'remove',
            headerName: activeUsers ? 'Usuń' : 'Aktywuj',
            width: 90,
            sortable: false,
            renderCell: (params) => {
                return (
                    <StyledIcon
                        icon={activeUsers ? faTrash : faRedo}
                        onClick={() =>
                            handleUpdateUserAvailability(params.data.email)
                        }
                    />
                );
            },
        },
    ];

    return (
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
                <CheckBox
                    isUsers
                    active={activeUsers}
                    handleChangeActiveness={() => {
                        setActiveUsers(!activeUsers);
                        setRefresh(!refresh);
                    }}
                />
                <DataGridWrapper>
                    <DataGrid
                        loading={loading}
                        rows={users}
                        columns={[...ADMIN_USERS_COLUMNS, ...columnsButton]}
                        pageSize={parseInt(visualViewport.height / 80)}
                        disableSelectionOnClick
                        hideFooterRow
                    />
                </DataGridWrapper>
            </ContentBody>
            <NewUserModal
                isVisible={modalVisible}
                handleClose={() => setModalVisible(false)}
                setRefresh={() => setRefresh(!refresh)}
            />
        </ContentWrapper>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(Users);
