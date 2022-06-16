import React from 'react';

function Object(props) {
    return ( 
        <div className="object">
            <div className="squarediv"></div>
            <div className="text">
                <span className="name"> {props.name} </span>
                <span className="artist"> {props.title} </span>
            </div>
        </div>
    );
}

export default Object;