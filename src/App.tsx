import Stage from './components/Stage';
import React from "react";


const App: React.FC = () => {
    return (
        <div className="container">
            <div className="header-wrapper">
                <h1>Datlování</h1>
            </div>
            <Stage/>
        </div>
    );
};

export default App;