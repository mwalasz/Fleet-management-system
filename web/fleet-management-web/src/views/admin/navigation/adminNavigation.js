import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faIndustry } from '@fortawesome/free-solid-svg-icons';
import NavigationBar from '../../../components/navigation/NavigationBar';
import StyledNavLink from '../../../components/navigation/StyledNavLink';
import { ADMIN_ROUTES } from '../../../utils/routes';

const AdminNavigation = ({ dispatch }) => {
    return (
        <NavigationBar dispatch={dispatch}>
            <StyledNavLink exact to={ADMIN_ROUTES.users}>
                <FontAwesomeIcon icon={faUsers} /> Użytkownicy
            </StyledNavLink>
            <StyledNavLink exact to={ADMIN_ROUTES.companies}>
                <FontAwesomeIcon icon={faIndustry} /> Przedsiębiorstwa
            </StyledNavLink>
        </NavigationBar>
    );
};

export default AdminNavigation;
