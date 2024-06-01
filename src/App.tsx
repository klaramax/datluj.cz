import Stage from './components/Stage';
import keyboardImage from "./typing.jpg";
import React from "react";


const App: React.FC = () => {
  return (
    <div className="container">
      <h1>Datlování</h1>
      <Stage />
        <div className="keyboard-container">
            <img src={keyboardImage} alt="Keyboard animated image" className="keyboard"/>;
        </div>
    </div>
  );
};

export default App;