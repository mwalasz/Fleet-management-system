import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../../redux/actions/authorization_actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faUsers, faHome } from "@fortawesome/free-solid-svg-icons";

const AdminNavigation = ({ dispatch }) => {
  return (
    <Wrapper>
      <div>
        {/* <Logo>
          <img src={require("../../../assets/logo.png")} />
        </Logo> */}
        <NavLinksWrapper>
          <StyledNavLink exact to="/panel/vehicles">
            <FontAwesomeIcon icon={faCar} /> Pojazdy
          </StyledNavLink>
          <StyledNavLink exact to="/panel/users">
            <FontAwesomeIcon icon={faUsers} /> Użytkownicy
          </StyledNavLink>
          <StyledNavLink exact to="/panel/companies">
            <FontAwesomeIcon icon={faHome} /> Firmy
          </StyledNavLink>
        </NavLinksWrapper>
      </div>
      <StyledLogout onClick={() => dispatch(logoutUser())}>
        {/* <FontAwesomeIcon icon={faSignOutAlt}/> Wyloguj się */}
        <p>{"Wyloguj się"}</p>
      </StyledLogout>
    </Wrapper>
  );
};

export default AdminNavigation;

const StyledLogout = styled.button`
  display: block;
  width: 90%;
  margin: 0 auto;
  padding: 8px;
  padding-left: 20px;
  border-radius: 5px;
  color: "blue";
  font-size: 10px;
  font-weight: 300;
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
  padding: 8px;
  padding-left: 20px;
  border-radius: 5px;
  color: "blue";
  font-size: 10px;
  font-weight: 300;
  position: relative;
  margin-bottom: 10px;
  transition: all 0.3s;
  cursor: pointer;

  svg {
    min-width: 25px;
    margin-right: 10px;
  }
  a {
    font-size: 13px;
    background: "yellow";
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
    color: "red";
  }

  &.active {
    /* background: ${({ theme }) => theme.primaryBackground};
    color:${({ theme }) => theme.primaryColor}; */
  }
`;

const NavLinksWrapper = styled.div`
  height: 100%;
`;

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
  background: white;
  height: 100%;
  min-width: 300px;
  max-width: 300px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-bottom: 20px;
`;
