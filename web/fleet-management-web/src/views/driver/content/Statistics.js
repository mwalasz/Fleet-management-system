import Axios from 'axios';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { API_URL } from '../../../utils/constans';
import { connect } from 'react-redux';
import { useState } from 'react';

const getColor = (props) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isDragActive) {
        return '#2196f3';
    }
    return '#eeeeee';
};

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-color: ${(props) => getColor(props)};
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border 0.24s ease-in-out;
`;

const MyDropzone = ({ token }) => {
    const [binaryImg, setBinaryImg] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result;
                console.log(binaryStr);
                setBinaryImg(
                    btoa(String.fromCharCode(...new Uint8Array(binaryStr)))
                );
            };
            reader.readAsArrayBuffer(file);
        });
    }, []);

    const {
        getRootProps,
        getInputProps,
        acceptedFiles,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        accept: 'image/jpeg, image/png',
        onDrop,
    });

    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));
    return (
        <>
            <Container
                {...getRootProps()}
                isDragActive={isDragActive}
                isDragAccept={isDragAccept}
                isDragReject={isDragReject}
            >
                <input {...getInputProps()} />
                <p>Przeciągnij tutaj zdjęcie lub kliknij by je wybrać</p>
                <aside>
                    <h4>Files</h4>
                    <ul>{files}</ul>
                </aside>
            </Container>

            <button
                onClick={() => {
                    console.log('file', acceptedFiles[0]);
                    Axios.post(
                        `${API_URL}/users/upload_avatar`,
                        {
                            mail: 'admin@poczta.pl',
                            imageBase64: binaryImg,
                        },
                        {
                            withCredentials: true,
                            headers: {
                                Authorization: 'Bearer ' + token,
                            },
                        }
                    );
                }}
            >
                wyslij
            </button>
        </>
    );
};

const Statistics = ({ user }) => {
    return (
        <>
            <MyDropzone token={user.token} />
            <p>Statistics</p>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(Statistics);
