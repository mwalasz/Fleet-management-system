import React from 'react';

const Content = ({ children }) => {
    return (
        <div
            style={{
                flex: '1 1',
                padding: '20px 40px',
            }}
        >
            {children}
        </div>
    );
};

export default Content;
