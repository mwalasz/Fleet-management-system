import React from 'react';
import styled from 'styled-components';
import StyledLogout from './StyledLogout';
import { logoutUser } from '../../redux/actions/authorization_actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { API_URL, DEFAULT_USER_IMAGE, USER_ROLES } from '../../utils/constans';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const NavigationBar = ({ dispatch, children, user }) => {
    const [avatar, setAvatar] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${API_URL}/images/download?mail=${user.email}`, {
                withCredentials: true,
                headers: {
                    Authorization: 'Bearer ' + user.token,
                },
            })
            .then((res) => {
                setLoading(false);
                const data = res.data.result;

                if (data) {
                    setAvatar(data);
                }
            })
            .catch((err) => {
                setLoading(false);
                console.log(
                    `An error occurred while downloading user's avatar: ${err}`
                );
            });
    }, []);

    return (
        <Wrapper>
            <div>
                <UserDataWrapper>
                    {loading ? (
                        <Spinner icon={faSpinner} spin size={'2x'} />
                    ) : (
                        <Avatar
                            src={avatar ? avatar : DEFAULT_USER_IMAGE}
                            alt={'Avatar'}
                        />
                    )}
                    <Text>
                        {user
                            ? `${user.firstName} ${user.lastName}`
                            : 'Imię Nazwisko'}
                    </Text>
                    <SmallText>
                        {user ? getRoleText(user.role) : 'rola'}
                    </SmallText>
                </UserDataWrapper>
                <NavLinksWrapper>{children}</NavLinksWrapper>
            </div>
            <StyledLogout onClick={() => dispatch(logoutUser())}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Wyloguj się
            </StyledLogout>
        </Wrapper>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(NavigationBar);

const getRoleText = (role) => {
    switch (role) {
        case 'admin':
            return USER_ROLES.admin;
        case 'driver':
            return USER_ROLES.driver;
        case 'manager':
            return USER_ROLES.manager;

        default:
            return '';
    }
};

const NavLinksWrapper = styled.div``;

const UserDataWrapper = styled.div`
    justify-content: center;
`;

const Spinner = styled(FontAwesomeIcon)`
    display: block;
    width: 200px;
    height: 200px;
    margin: 30px auto;
`;

const SmallText = styled.div`
    margin-bottom: 30px;
    color: ${({ theme }) => theme.primaryColor};
    font-size: ${({ theme }) => theme.font.S};
    font-weight: ${({ theme }) => theme.font.Light};
    position: relative;
    transition: all 0.3s;
    text-align: center;
`;

const Text = styled.div`
    color: ${({ theme }) => theme.primaryColor};
    font-size: ${({ theme }) => theme.font.XL};
    font-weight: ${({ theme }) => theme.font.Regular};
    position: relative;
    transition: all 0.3s;
    text-align: center;
`;

const Avatar = styled.img`
    display: block;
    margin: 30px auto;
    border-radius: 60px;
    background-color: white;
    object-fit: cover;
    width: 200px;
    height: 200px;
`;

const Wrapper = styled.div`
    box-shadow: 5px 0 10px rgba(0, 0, 0, 0.1);
    background: ${({ theme }) => theme.primaryBackground};
    height: 100%;
    min-width: 300px;
    max-width: 300px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;
