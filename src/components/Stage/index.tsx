import React, {useState} from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';
import keyboardImage from "../../images/keyboard.jpg";


interface WordItem {
    id: number;
    word: string;
}

let idCounter = 0;

const generateWord = (size: number): WordItem => {
    const sizeIndex = size === undefined
        ? Math.floor(Math.random() * wordList.length)
        : size - 3;

    if (sizeIndex < 0 || sizeIndex >= wordList.length) {
        return {id: idCounter, word: ''};
    }

    const words = wordList[sizeIndex];
    const wordIndex = Math.floor(Math.random() * words.length);
    console.log(idCounter++, words[wordIndex]);
    return {id: idCounter++, word: words[wordIndex]};
};

const Stage = () => {
    const initialWords = [generateWord(6), generateWord(6), generateWord(6)];
    const [words, setWords] = useState<WordItem[]>(initialWords);
    const [mistakes, setMistakes] = useState(0);
    const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
    const [totalKeystrokes, setTotalKeystrokes] = useState(0);

    const handleMistake = () => {
        setMistakes((prevMistakes) => prevMistakes + 1);
    };

    const handleCorrectKeystroke = () => {
        setCorrectKeystrokes((prevCorrectKeystrokes) => prevCorrectKeystrokes + 1);
    };

    const handleFinish = () => {
        setWords((prevWords) => {
            // Remove the first word
            const newWords = prevWords.slice(1);
            // Add a new word to the end of the array
            return [...newWords, generateWord(6)];
        });
    };

    const handleKeystroke = () => {
        setTotalKeystrokes((prevTotalKeystrokes) => prevTotalKeystrokes + 1);
    };

    const correctnessPercentage = (): number => {
        if (totalKeystrokes === 0) {
            return 0;
        }
        const percentage = (correctKeystrokes / totalKeystrokes) * 100;
        if (percentage === 100) {
            return 100;
        }
        if (percentage === 0) {
            return 0;
        }
        return parseFloat(percentage.toFixed(1));
    };

    return (
        <div className="stage">
            <div className="stage-main">

                {/* Display of mistakes */}
                <div className="stage__stats">
                    <div className="stage__stats--emoji" role="img" aria-label="Sad face">🥺</div>
                    <div className="stage__stats--counter">{mistakes}</div>
                </div>


                <div className="stage-middle">
                    {/* Display of correctness */}
                    <div className="stage__correctness">
                        Score: {correctnessPercentage()}%
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
                                onKeystroke={handleKeystroke}
                            />
                        ))}
                    </div>
                </div>

                {/* Display of correct keystrokes */}
                <div className="stage__stats">
                    <div className="stage__stats--emoji" role="img" aria-label="Happy face">🙂</div>
                    <div className="stage__stats--counter">{correctKeystrokes}</div>
                </div>

            </div>
            {/* Closing tag for stage-main */}
            <div className="keyboard-container">
                <img src={keyboardImage} alt="Keyboard animated image" className="keyboard"/>
            </div>
        </div>
    );
};

export default Stage;
