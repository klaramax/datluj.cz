import { useState } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import { v4 as uuidv4 } from 'uuid';
import './style.css';


interface WordItem {
  id: string;
  word: string;
}

const generateWord = (size: number): WordItem => {
  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length)
    : size - 3;
  
  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return { id: uuidv4(), word: '' };
  }
  
  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return { id: uuidv4(), word: words[wordIndex] };
};

const Stage = () => {
  const initialWords = [generateWord(6), generateWord(6), generateWord(6)];
  const [words, setWords] = useState<WordItem[]>(initialWords);

  const handleFinish = () => {
    setWords((prevWords) => {
      // Remove the first word
      const newWords = prevWords.slice(1);
      // Add a new word to the end of the array
      return [...newWords, generateWord(6)];
    });
  };

  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: 0</div>
      <div className="stage__words">
        {words.map((wordItem, index) => (
          <Wordbox
            key={wordItem.id}
            word={wordItem.word}
            active={index === 0}
            onFinish={handleFinish}
          />
        ))}
      </div>
    </div>
  );
};

export default Stage;
