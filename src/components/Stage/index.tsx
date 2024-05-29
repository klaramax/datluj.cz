import { useState } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';


const generateWord = (size: number) => {
  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length)
    : size - 3;
  
  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }
  
  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

const Stage = () => {
  const initialWords = [generateWord(6), generateWord(6), generateWord(6)];
  const [words, setWords] = useState<string[]>(initialWords);

  const handleFinish = () => {
    setWords((prevWords) => {console.log('11111', prevWords)
      // Remove the first word
      const newWords = prevWords.slice(1);console.log('22222', newWords);console.log([...newWords, generateWord(6)])
      // Add a new word to the end of the array
      return [...newWords, generateWord(6)];
    });
  };

  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: 0</div>
      <div className="stage__words">
        {words.map((word, index) => (
          <Wordbox
            key={word}
            word={word}
            active={index === 0}
            onFinish={handleFinish}
          />
        ))}
      </div>
    </div>
  );
};

export default Stage;
