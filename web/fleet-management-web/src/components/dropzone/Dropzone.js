import React, { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const getBorderColor = (props) => {
    if (props.isDragAccept) return '#00e676';
    if (props.isDragReject) return '#ff1744';
    if (props.isDragActive) return '#2196f3';

    return null;
};

const DropzoneContainer = styled.div`
    margin: 20px 0px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    border-width: 2px;
    border-radius: 25px;
    border-color: ${(props) =>
        getBorderColor(props) || props.theme.primaryColor};
    border-style: dashed;
    background-color: ${({ theme }) => theme.primaryBackground};
    color: ${({ theme }) => theme.primaryColor};
    font-weight: ${({ theme }) => theme.font.Bold};
    outline: none;
    transition: border 0.24s ease-in-out;
    &:hover {
        cursor: pointer;
    }
`;

const Dropzone = ({ isVisible, setImage }) => {
    const [imgBase64, setImgBase64] = useState([]);
    const [isFileTooBig, setIsFileTooBig] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        setIsFileTooBig(false);
        try {
            acceptedFiles.forEach((file) => {
                const reader = new FileReader();
                reader.onabort = () => console.log('file reading was aborted');
                reader.onerror = () => console.log('file reading has failed');
                reader.onload = () => {
                    const binaryStr = reader.result;
                    let base64 = btoa(
                        String.fromCharCode(...new Uint8Array(binaryStr))
                    );
                    setImage(base64);
                    setImgBase64(base64);
                };
                reader.readAsArrayBuffer(file);
            });
        } catch (error) {
            console.log('Error while reading image data:', error);
        }
    }, []);

    const onDropRejected = (args) => {
        setIsFileTooBig(true);
    };

    const {
        getRootProps,
        getInputProps,
        acceptedFiles,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        maxFiles: 1,
        maxSize: 120000,
        accept: 'image/jpeg, image/png',
        multiple: false,
        onDropRejected,
        onDrop,
    });

    const renderText = () => {
        let text;
        if (isFileTooBig) {
            text =
                'Dodany plik nie jest zdjęciem lub jest za duży! Spróbuj ponownie..';
        } else if (acceptedFiles[0]) {
            return (
                <p>
                    {`Dodano: ${acceptedFiles[0].name} [${acceptedFiles[0].size}B] `}
                    {<FontAwesomeIcon icon={faCheckCircle} />}
                </p>
            );
        } else {
            text = 'Kliknij tutaj lub przeciągnij zdjęcie, aby je dodać';
        }

        return <p>{text}</p>;
    };

    return (
        <DropzoneContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragAccept={isDragAccept}
            isDragReject={isDragReject}
        >
            <input {...getInputProps()} />
            {renderText()}
        </DropzoneContainer>
    );
};

export default Dropzone;
