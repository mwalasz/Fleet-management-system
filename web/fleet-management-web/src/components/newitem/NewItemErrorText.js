import styled from 'styled-components';

const NewItemErrorText = styled.text`
    align-self: center;
    margin-left: '10px';
    font-size: '10px';
    color: ${({ theme }) => theme.red};
    font-weight: ${({ theme }) => theme.font.Bold};
`;

export default NewItemErrorText;
