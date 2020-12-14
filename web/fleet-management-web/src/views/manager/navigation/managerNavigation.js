import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faUser, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import NavigationBar from '../../../components/navigation/NavigationBar';
import StyledNavLink from '../../../components/navigation/StyledNavLink';
import { MANAGER_ROUTES } from '../../../utils/routes';

const ManagerNavigation = ({ dispatch }) => {
    return (
        <NavigationBar dispatch={dispatch}>
            <StyledNavLink exact to={MANAGER_ROUTES.vehicles}>
                <FontAwesomeIcon icon={faCar} /> Pojazdy
            </StyledNavLink>
            <StyledNavLink exact to={MANAGER_ROUTES.drivers}>
                <FontAwesomeIcon icon={faUser} /> Kierowcy
            </StyledNavLink>
            <StyledNavLink exact to={MANAGER_ROUTES.company}>
                <FontAwesomeIcon icon={faBriefcase} /> Przedsiębiorstwo
            </StyledNavLink>
        </NavigationBar>
    );
};

export default ManagerNavigation;
