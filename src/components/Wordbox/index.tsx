import React, { useState, useEffect } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
}

const Wordbox: React.FC<IWordboxProp> = ({ word }) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);
  
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      setLettersLeft((prevLettersLeft) => {
        if (prevLettersLeft && event.key === prevLettersLeft[0]) {
          return prevLettersLeft.slice(1);
        }
        return prevLettersLeft;
      });
    };

    document.addEventListener('keyup', handleKeyUp);
    
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="wordbox">{lettersLeft}</div>
  );
}

export default Wordbox;
