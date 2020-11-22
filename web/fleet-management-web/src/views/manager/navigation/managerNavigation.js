import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faUser, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import NavigationBar from "../../../navigation/NavigationBar";
import StyledNavLink from "../../../navigation/components/StyledNavLink";

const ManagerNavigation = ({ dispatch }) => {
  return (
    <NavigationBar dispatch={dispatch}>
      <StyledNavLink exact to="/panel/vehicles">
        <FontAwesomeIcon icon={faCar} /> Pojazdy
      </StyledNavLink>
      <StyledNavLink exact to="/panel/drivers">
        <FontAwesomeIcon icon={faUser} /> Kierowcy
      </StyledNavLink>
      <StyledNavLink exact to="/panel/drivers">
        <FontAwesomeIcon icon={faInfoCircle} /> Informacje
      </StyledNavLink>
    </NavigationBar>
  );
};

export default ManagerNavigation;
