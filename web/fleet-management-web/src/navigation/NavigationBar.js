import React from "react";
import styled from "styled-components";
import StyledLogout from "./components/StyledLogout";
import { logoutUser } from "../redux/actions/authorization_actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const NavigationBar = ({ dispatch, children }) => {
  return (
    <Wrapper>
      <div>
        <NavLinksWrapper>{children}</NavLinksWrapper>
      </div>
      <StyledLogout onClick={() => dispatch(logoutUser())}>
        <FontAwesomeIcon icon={faSignOutAlt} /> Wyloguj się
      </StyledLogout>
    </Wrapper>
  );
};

export default NavigationBar;

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
