import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const Input = (props) => {
    const { error, errorText } = props;

    if (error) {
        return (
            <Wrapper>
                <TextField
                    error
                    id="outlined-secondary"
                    label="Outlined secondary"
                    variant="outlined"
                    color="secondary"
                    helperText={errorText}
                    {...props}
                />
            </Wrapper>
        );
    } else {
        return (
            <Wrapper>
                <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    {...props}
                />
            </Wrapper>
        );
    }
};

export default Input;

const Wrapper = styled.div`
    .MuiFormControl-root {
        width: 100%;
    }
    .MuiOutlinedInput-input {
        padding: 12px 18px;
    }
    .MuiInputLabel-outlined {
        transform: translate(14px, 15px) scale(1);
    }
`;
