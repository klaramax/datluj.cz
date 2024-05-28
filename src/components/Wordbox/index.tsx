import React, { useState, useEffect } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  onFinish: () => void;
}

const Wordbox: React.FC<IWordboxProp> = ({ word, onFinish }) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);
  
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      setLettersLeft((prevLettersLeft) => {
        if (prevLettersLeft && event.key === prevLettersLeft[0]) {
          const newLettersLeft = prevLettersLeft.slice(1);
          if (newLettersLeft === "") {
            onFinish();
          }
          return newLettersLeft;
        }
        return prevLettersLeft;
      });
    };

    document.addEventListener('keyup', handleKeyUp);
    
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [onFinish]);

  return (
    <div className="wordbox">{lettersLeft}</div>
  );
}

export default Wordbox;
