import styled from 'styled-components';
import { Form } from 'formik';

export const StyledWrapper = styled.div`
    border-left: 10px solid ${({ theme }) => theme.primaryColor};
    z-index: 999;
    position: fixed;
    display: flex;
    padding: 50px 90px;
    flex-direction: column;
    right: 0;
    top: 0;
    height: 100vh;
    width: 680px;
    background-color: white;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    transform: translate(${({ isVisible }) => (isVisible ? '0' : '100%')});
    transition: transform 0.25s ease-in-out;
`;

export const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
`;

export const TwoInputsInRowWrapper = styled.div`
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
`;

export const HeadingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;
