import React from 'react';

function Success(props) {
    return (
        <div className="alert-shown" style={{backgroundColor: '#F9D268', color: 'black'}}>
            <span className="closebtn" onClick={props.handleCloseClick}>&times;</span> 
            <strong>Success!</strong> {props.message}
        </div>
    );
}

export default Success;