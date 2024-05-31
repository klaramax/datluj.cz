import React from 'react';
import keyboardImage from './typing.jpg';
import './style.css';


const Keyboard: React.FC = () => {
    return (
        <div className="keyboard-container">
            <img src={keyboardImage} alt="Keyboard animated image" className="keyboard"/>;
        </div>
    )
};


export default Keyboard;
