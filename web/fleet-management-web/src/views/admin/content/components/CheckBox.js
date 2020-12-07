import React from 'react';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';

const CheckBox = ({ active, handleChangeActiveness, isUsers }) => (
    <FilterWrapper>
        <Checkbox
            color="default"
            onChange={handleChangeActiveness}
            checked={active}
        />
        <Text>
            {isUsers
                ? active
                    ? 'Odznacz, aby wyświetlić nieaktywnych użytkowników:'
                    : 'Zanacz, aby wyświetlić aktywnych użytkowników:'
                : active
                ? 'Odznacz, aby wyświetlić nieaktywne przedsiębiorstwa:'
                : 'Zanacz, aby wyświetlić aktywne przedsiębiorstwa:'}
        </Text>
    </FilterWrapper>
);

const Text = styled.text`
    font-size: ${({ theme }) => theme.font.M};
    font-weight: ${({ theme }) => theme.font.Regular};
    transition: all 0.3s;
    display: inline;
    margin: 10px;
`;

const FilterWrapper = styled.div`
    margin-bottom: 10px;
`;

export default CheckBox;
