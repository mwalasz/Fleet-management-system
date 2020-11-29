import styled from 'styled-components';
import { Form } from 'formik';

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
