import React, { useState, useEffect, useMemo } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';
import keyboardImage from './klavesnice.png';
import errorSound from './error-sound.wav';
import soundOnImage from './sound-on.png';
import soundOffImage from './sound-off.png';

interface WordItem {
  id: number;
  word: string;
}

let idCounter = 0;

const generateWord = (size: number): WordItem => {
  const sizeIndex =
    size === undefined ? Math.floor(Math.random() * wordList.length) : size - 3;

  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return { id: idCounter, word: '' };
  }

  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return { id: idCounter++, word: words[wordIndex] };
};

const Stage: React.FC = () => {
  const initialWords = [generateWord(6), generateWord(6), generateWord(6)];
  const [words, setWords] = useState<WordItem[]>(initialWords);
  const [mistakes, setMistakes] = useState<number>(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState<number>(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [kpm, setKpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);

  const updateKpm = (keystrokes: number) => {
    if (startTime) {
      const elapsedTime = Date.now() - startTime;
      const minutes = elapsedTime / 60000;
      setKpm(parseFloat((keystrokes / minutes).toFixed(0)));
    }
  };

  const calculateAccuracy = (
    correctKeystrokes: number,
    totalKeystrokes: number
  ): number => {
    if (totalKeystrokes === 0) {
      return 0;
    }
    const percentage = (correctKeystrokes / totalKeystrokes) * 100;
    return parseFloat(percentage.toFixed(1));
  };

  // Create and memoize an Audio object for the error sound, ensuring it is only created once when the component mounts
  const errorAudio = useMemo(() => new Audio(errorSound), []);

  const playErrorSound = () => {
    if (isSoundOn) {
      errorAudio.play();
    }
  };

  const handleMistake = () => {
    setMistakes((prevMistakes) => prevMistakes + 1);
    playErrorSound();
    setTotalKeystrokes((prevTotalKeystrokes) => {
      const newTotalKeystrokes = prevTotalKeystrokes + 1;
      updateKpm(newTotalKeystrokes);
      setAccuracy(calculateAccuracy(correctKeystrokes, newTotalKeystrokes));
      return newTotalKeystrokes;
    });
  };

  const handleCorrectKeystroke = () => {
    setCorrectKeystrokes((prevCorrectKeystrokes) => prevCorrectKeystrokes + 1);
    setTotalKeystrokes((prevTotalKeystrokes) => {
      const newTotalKeystrokes = prevTotalKeystrokes + 1;
      updateKpm(newTotalKeystrokes);
      setAccuracy(calculateAccuracy(correctKeystrokes + 1, newTotalKeystrokes));
      return newTotalKeystrokes;
    });
  };

  const handleFinish = () => {
    setWords((prevWords) => {
      // Remove the first word
      const newWords = prevWords.slice(1);
      // Add a new word to the end of the array
      return [...newWords, generateWord(6)];
    });
  };

  useEffect(() => {
    if (totalKeystrokes > 0 && !startTime) {
      setStartTime(Date.now());
    }
  }, [totalKeystrokes, startTime]);

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        updateKpm(totalKeystrokes);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, totalKeystrokes]);

  return (
    <div className="stage">
      <div className="stage-main">
        {/* Display of mistakes */}
        <div className="stage__stats">
          <div className="stage__stats--emoji" role="img" aria-label="Sad face">
            🥺
          </div>
          <div className="stage__stats--counter">{mistakes}</div>
        </div>

        <div className="stage-middle">
          {/* Display of accuracy */}
          <div className="stage__accuracy">
            <span>Přesnost: </span>
            <span>{accuracy}%</span>
          </div>

          {/* Display of KPM */}
          <div className="stage__stats">
            <div className="stage__stats--kpm">
              <span>Úhozů za minutu: </span>
              <span>{kpm}</span>
            </div>
          </div>
          <div className="stage__words">
            {words.map((wordItem, index) => (
              <Wordbox
                key={wordItem.id}
                word={wordItem.word}
                active={index === 0}
                onFinish={handleFinish}
                onMistake={handleMistake}
                onCorrectKeystroke={handleCorrectKeystroke}
              />
            ))}
          </div>
        </div>

        {/* Display of correct keystrokes */}
        <div className="stage__stats">
          <div
            className="stage__stats--emoji"
            role="img"
            aria-label="Happy face"
          >
            🙂
          </div>
          <div className="stage__stats--counter">{correctKeystrokes}</div>
        </div>
      </div>
      {/* Closing tag for stage-main */}

      <div className="buttons-row">
        <div className="restart-button__wrapper">
          <button
            onClick={() => window.location.reload()}
            className="restart-button"
          >
            Začít znovu
          </button>
          <img
            onClick={() => setIsSoundOn((prevState) => !prevState)}
            src={isSoundOn ? soundOnImage : soundOffImage}
            className="sound-on"
            alt="Sound icon"
          />
        </div>
      </div>
      <div className="keyboard-container">
        <img
          src={keyboardImage}
          alt="Keyboard animated image"
          className="keyboard"
        />
      </div>
    </div>
  );
};

export default Stage;
