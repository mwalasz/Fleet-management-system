import React from 'react';
import styled from 'styled-components';
import StyledLogout from './StyledLogout';
import { logoutUser } from '../../redux/actions/authorization_actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import {
    API_URL,
    DEFAULT_USER_IMAGE,
    DEFAULT_VEHICLE_IMAGE,
} from '../../utils/constans';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const NavigationBar = ({ dispatch, children, user }) => {
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${API_URL}/users/download_avatar?mail=${user.email}`, {
                withCredentials: true,
                headers: {
                    Authorization: 'Bearer ' + user.token,
                },
            })
            .then((res) => {
                setLoading(false);
                const data = res.data.result;

                if (data) {
                    setImage(data);
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
                <Logo>
                    {loading ? (
                        <FontAwesomeIcon icon={faSpinner} spin />
                    ) : (
                        <img
                            src={image ? image : DEFAULT_USER_IMAGE}
                            alt={'Avatar'}
                        />
                    )}
                    <Text>
                        {user
                            ? `${user.firstName} ${user.lastName}`
                            : 'Imię Nazwisko'}
                    </Text>
                </Logo>
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

const NavLinksWrapper = styled.div``;

const Text = styled.div`
    margin-top: 20px;
    color: ${({ theme }) => theme.thirdColor};
    font-size: ${({ theme }) => theme.font.L};
    font-weight: ${({ theme }) => theme.font.Regular};
    position: relative;
    transition: all 0.3s;
    text-align: center;
`;

const Logo = styled.div`
    margin: 40px;
    padding: 0 20px;
    img {
        border-radius: 60px;
        max-height: 400px;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
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
