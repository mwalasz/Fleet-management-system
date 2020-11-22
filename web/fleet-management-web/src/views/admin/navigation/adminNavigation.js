import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faUsers, faIndustry } from '@fortawesome/free-solid-svg-icons';
import NavigationBar from '../../../navigation/NavigationBar';
import StyledNavLink from '../../../navigation/components/StyledNavLink';

const AdminNavigation = ({ dispatch }) => {
    return (
        <NavigationBar dispatch={dispatch}>
            <StyledNavLink exact to="/panel/vehicles">
                <FontAwesomeIcon icon={faCar} /> Pojazdy
            </StyledNavLink>
            <StyledNavLink exact to="/panel/users">
                <FontAwesomeIcon icon={faUsers} /> Użytkownicy
            </StyledNavLink>
            <StyledNavLink exact to="/panel/companies">
                <FontAwesomeIcon icon={faIndustry} /> Firmy
            </StyledNavLink>
        </NavigationBar>
    );
};

export default AdminNavigation;
