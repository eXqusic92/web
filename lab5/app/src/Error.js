function Error(props) {
    return (
        <div className="alert-shown">
            <span className="closebtn" onClick={props.handleCloseClick}>&times;</span> 
            <strong>Error!</strong> {props.message}
        </div>
    );
}

export default Error;