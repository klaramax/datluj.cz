import React, { useState, useEffect } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  active: boolean;
  onFinish: () => void;
  onMistake: () => void;
}

const Wordbox: React.FC<IWordboxProp> = ({ word, active, onFinish, onMistake }) => {
  // State for remaining letters of the word
  const [lettersLeft, setLettersLeft] = useState<string>(word);

  // State to indicate if the user made a mistake
  const [mistake, setMistake] = useState<boolean>(false);

  // State to track when onFinish should be called
  const [shouldFinish, setShouldFinish] = useState(false);

  // State to track when onMistake should be called
  const [shouldReportMistake, setShouldReportMistake] = useState(false);

  useEffect(() => {
    if (shouldFinish) {
      onFinish();
    }
  }, [shouldFinish, onFinish]);

  useEffect(() => {
    if (shouldReportMistake) {
      onMistake();
      setShouldReportMistake(false);
    }
  }, [shouldReportMistake, onMistake]);

  // useEffect to add and remove keyup event listener on active word
  useEffect(() => {
    if (!active) return;

    const handleKeyUp = (event: KeyboardEvent) => {
      setLettersLeft((prevLettersLeft) => {
        if (prevLettersLeft) {
          if (event.key === prevLettersLeft[0]) {
            setMistake(false);
            const newLettersLeft = prevLettersLeft.slice(1);
            if (newLettersLeft === "") {
              setShouldFinish(true);
            }
            return newLettersLeft;
          } else {
            setMistake(true);
            setShouldReportMistake(true);
          }
        }
        return prevLettersLeft;
      });
    };

    document.addEventListener('keyup', handleKeyUp);
    
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [active, onFinish]);

  return (
    // Render the div with a dynamic class based on the mistake state
    <div className={`wordbox ${mistake ? 'wordbox--mistake' : ''}`}>
      {lettersLeft}
    </div>
  );
}

export default Wordbox;
