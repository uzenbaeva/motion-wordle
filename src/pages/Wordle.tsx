import React from "react";
import { useWordle } from "../hooks/useWordle";
import { Tile } from "../components/Tile";
import "./Wordle.css";

const WordG = () => {
  const {
    word,
    isLoading,
    guesses,
    gameOver,
    currentGuesses,
    currentIndex,
    getTileClass,
    initializeGame,
  } = useWordle();
  console.log(word);

  return (
    <div className="word-container">
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <div>
          {Array.from({ length: 6 }, (_, row) => (
            <div key={row} className="row">
              {Array.from({ length: 5 }, (_, col) => {
                const index = row * 5 + col;
                const inputValue = guesses[row][col] || "";
                const tileClass =
                  currentIndex > row || gameOver ? getTileClass(inputValue, col, row) : "";
                return (
                  <Tile
                    key={index}
                    index={index}
                    inputValue={inputValue}
                    tileClass={tileClass}
                  />
                );
              })}
            </div>
          ))}
          {gameOver && currentGuesses !== word && (
            <div>
              <p>Правильное слово: {word}</p>
              <button onClick={initializeGame}>Начать заново</button>
            </div>
          )}
          {gameOver && currentGuesses === word && (
            <div>
              <button onClick={initializeGame}>Начать заново</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WordG;









