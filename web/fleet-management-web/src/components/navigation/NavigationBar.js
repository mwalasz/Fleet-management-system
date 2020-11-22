import React from 'react';
import styled from 'styled-components';
import StyledLogout from './StyledLogout';
import { logoutUser } from '../../redux/actions/authorization_actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { defaultVehicleImagePath } from '../../utils/constans';
import { connect } from 'react-redux';

const NavigationBar = ({ dispatch, children, user }) => {
    return (
        <Wrapper>
            <div>
                <Logo>
                    <img src={defaultVehicleImagePath} />
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
    background: ${({ theme }) => theme.primaryBackground};
    height: 100%;
    min-width: 300px;
    max-width: 300px;
    height: 100vh;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding-bottom: 20px;
`;
