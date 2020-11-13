import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../../redux/actions/authorization_actions";
// import LOGO from '../../../../images/logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faUser,
  faInfoCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const ManagerNavigation = ({ dispatch }) => {
  return (
    <Wrapper>
      <div>
        {/* <Logo><img src={LOGO}/></Logo> */}
        <NavLinksWrapper>
          <StyledNavLink exact to="/panel/vehicles">
            <FontAwesomeIcon icon={faCar} /> Pojazdy
          </StyledNavLink>
          <StyledNavLink exact to="/panel/drivers">
            <FontAwesomeIcon icon={faUser} /> Kierowcy
          </StyledNavLink>
          <StyledNavLink exact to="/panel/drivers">
            <FontAwesomeIcon icon={faInfoCircle} /> Informacje
          </StyledNavLink>
        </NavLinksWrapper>
      </div>
      <StyledLogout onClick={() => dispatch(logoutUser())}>
        <FontAwesomeIcon icon={faSignOutAlt} /> Wyloguj się
      </StyledLogout>
    </Wrapper>
  );
};

export default ManagerNavigation;

const StyledLogout = styled.button`
  display: block;
  width: 90%;
  margin: 0 auto;
  padding: 8px;
  padding-left: 20px;
  border-radius: 5px;
  color: ${({ theme }) => theme.thirdColor};
  font-size: ${({ theme }) => theme.font.M};
  font-weight: ${({ theme }) => theme.font.Regular};
  position: relative;
  margin-bottom: 10px;
  transition: all 0.3s;
  cursor: pointer;
  background: none;
  border: none;
  text-align: left;

  svg {
    min-width: 25px;
    margin-right: 10px;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  width: 90%;
  margin: 0 auto;
  padding: 10px;
  padding-left: 20px;
  border-radius: 5px;
  color: ${({ theme }) => theme.thirdColor};
  font-size: ${({ theme }) => theme.font.M};
  font-weight: ${({ theme }) => theme.font.Regular};
  position: relative;
  margin-bottom: 10px;
  transition: all 0.3s;
  cursor: pointer;
  text-decoration: none;

  svg {
    min-width: 25px;
    margin-right: 10px;
  }
  a {
    font-size: 13px;
    background: ${({ theme }) => theme.primaryColor};
    color: white;
    display: block;
    height: 22px;
    width: 25px;
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;

    svg {
      width: 13px;
      height: 13px;
      margin: 0px;
    }
  }
  &:hover {
    color: ${({ theme }) => theme.secondColor};
  }

  &.active {
    background: ${({ theme }) => theme.primaryBackground};
    color: ${({ theme }) => theme.primaryColor};
  }
`;

const NavLinksWrapper = styled.div``;

const Logo = styled.div`
  margin-top: 40px;
  padding: 0 20px;
  margin-bottom: 40px;
  img {
    max-height: 50px;
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
