import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faInfo, faRoute } from '@fortawesome/free-solid-svg-icons';
import NavigationBar from '../../../components/navigation/NavigationBar';
import StyledNavLink from '../../../components/navigation/StyledNavLink';
import { DriverRoutes } from '../../../utils/routes';

const DriverNavigation = ({ dispatch }) => {
    return (
        <NavigationBar dispatch={dispatch}>
            <StyledNavLink exact to={DriverRoutes.vehicles}>
                <FontAwesomeIcon icon={faCar} /> Pojazdy
            </StyledNavLink>
            <StyledNavLink exact to={DriverRoutes.statistics}>
                <FontAwesomeIcon icon={faInfo} /> Twoje statystyki
            </StyledNavLink>
            <StyledNavLink exact to={DriverRoutes.trips}>
                <FontAwesomeIcon icon={faRoute} /> Twoje trasy
            </StyledNavLink>
        </NavigationBar>
    );
};

export default DriverNavigation;
