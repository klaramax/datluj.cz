import React, { useState, useEffect } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  onFinish: () => void;
}

const Wordbox: React.FC<IWordboxProp> = ({ word, onFinish }) => {
  // State for remaining letters of the word
  const [lettersLeft, setLettersLeft] = useState<string>(word);

  // State to indicate if the user made a mistake
  const [mistake, setMistake] = useState<boolean>(false);
  
  // useEffect to add and remove keyup event listener
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      setLettersLeft((prevLettersLeft) => {
        if (prevLettersLeft) {
          if (event.key === prevLettersLeft[0]) {
            setMistake(false);
            const newLettersLeft = prevLettersLeft.slice(1);
            if (newLettersLeft === "") {
              onFinish();
            }
            return newLettersLeft;
          } else {
            setMistake(true);
          }
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
    // Render the div with a dynamic class based on the mistake state
    <div className={`wordbox ${mistake ? 'wordbox--mistake' : ''}`}>
      {lettersLeft}
    </div>
  );
}

export default Wordbox;
