import { ErrorWrapper } from './NewItemInput';
import styled from 'styled-components';

const Text = styled.h3`
    align-self: flex-start;
    line-height: 0px;
    color: ${({ theme }) => theme.primaryColor};
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
`;

const SelectWrapper = ({ title, errors, touched, children }) => (
    <Wrapper>
        <Text>{title}</Text>
        {errors && touched ? (
            <ErrorWrapper errors={errors} touched={touched}>
                {children}
            </ErrorWrapper>
        ) : (
            children
        )}
    </Wrapper>
);

export default SelectWrapper;
