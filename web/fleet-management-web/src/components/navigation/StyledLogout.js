import styled from 'styled-components';

const StyledLogout = styled.button`
    display: block;
    width: 90%;
    margin: 0 auto;
    padding: 10px;
    padding-left: 20px;
    border-radius: 15px;
    color: ${({ theme }) => theme.thirdColor};
    font-size: ${({ theme }) => theme.font.M};
    font-weight: ${({ theme }) => theme.font.Regular};
    position: relative;
    margin-bottom: 15px;
    transition: all 0.3s;
    cursor: pointer;
    background: none;
    border: none;
    text-align: left;

    svg {
        min-width: 25px;
        margin-right: 10px;
    }
    &:hover {
        color: ${({ theme }) => theme.primaryColor};
        background: ${({ theme }) => theme.primaryBackground};
        font-weight: bold;
    }
`;

export default StyledLogout;
