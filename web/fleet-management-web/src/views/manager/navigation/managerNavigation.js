import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faUser, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import NavigationBar from '../../../components/navigation/NavigationBar';
import StyledNavLink from '../../../components/navigation/StyledNavLink';
import { ManagerRoutes } from '../../../utils/routes';

const ManagerNavigation = ({ dispatch }) => {
    return (
        <NavigationBar dispatch={dispatch}>
            <StyledNavLink exact to={ManagerRoutes.vehicles}>
                <FontAwesomeIcon icon={faCar} /> Pojazdy
            </StyledNavLink>
            <StyledNavLink exact to={ManagerRoutes.drivers}>
                <FontAwesomeIcon icon={faUser} /> Kierowcy
            </StyledNavLink>
            <StyledNavLink exact to={ManagerRoutes.informations}>
                <FontAwesomeIcon icon={faInfoCircle} /> Informacje
            </StyledNavLink>
        </NavigationBar>
    );
};

export default ManagerNavigation;
