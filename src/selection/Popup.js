import React from 'react';
import './Popup.css'

function Popup(props){
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h3>Send mentor request to {props.children}? </h3>
                <div className="btn-group">
                    <button className="btn btn-success" onClick={props.accept}>Send</button>
                    <button className="btn btn-danger" onClick={() => props.deny(false)}>Close</button>
                </div>
            </div>
        </div>
    ) : "";
}

export default Popup