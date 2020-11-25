import styled from 'styled-components';

export const ContentWrapper = styled.div`
    width: calc(100vw - 300px - 80px);
    height: calc(100vh - 300px);
`;

export const ContentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ContentBody = styled.div`
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    background: white;
`;
