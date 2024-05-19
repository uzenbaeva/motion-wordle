import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import '../components/Tile/Tile.css';

const Wordly = () => {
  const { word, isLoading } = useFetch();
  const [guesses, setGuesses] = useState<string[]>(Array(5).fill(""));
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);


  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && currentGuess.length === 5) {
      if (currentGuess === word){
        alert("Congratulations! You guessed the word!");
      }
      else{
        if (currentRow < 5){
          setCurrentRow(currentRow + 1);
          setCurrentGuess("");
        }
        else{
          alert("Game is over!");
          setGameOver(true);
          resetGame();
        }
      }
    }
    else if (e.key === "Backspace"){
      setCurrentGuess(currentGuess.slice(0, -1));
    }
    else if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < 5) {
      setCurrentGuess(currentGuess + e.key.toUpperCase());
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => handleKeyPress(e);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentGuess, currentRow, isLoading, gameOver]);


  const getTileClass = (letter: string,  index: number) => {
    if (currentRow <= guesses.length){
      if (word[index] === letter){
        return "correct";
      }
      if (word.includes(letter)){
        return "present";
      }
      return "absent";
    }
    return "";
  }

  const resetGame = () => {
    setGuesses(Array(5).fill(""));
    setCurrentRow(0);
    setCurrentGuess("");
    setGameOver(false);
  }

  useEffect(() => {
    const newGuesses = [...guesses];
    newGuesses[currentRow] = currentGuess;
    setGuesses(newGuesses);
  }, [currentGuess, currentRow, isLoading, gameOver]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="container">
          {Array.from({ length: 5 }, (_, row) => (
            <div key={row} style={{ display: "flex" }}>
              {Array.from({ length: 5 }, (_, col) => {
                const index = row * 5 + col;
                const tileClass = (row < currentRow || gameOver) ? getTileClass(guesses[row][col], col) : '';
                const inputValue = guesses[row][col] || "";
                return (
                  <div className={`square ${tileClass}`} key={index}>
                    <input
                      type="text"
                      value={inputValue}
                      className="square__input"
                      readOnly
                    />
                  </div>
                );
              })}
            </div>
          ))}
          <pre>{word}</pre>
          {gameOver && <button onClick={resetGame}>Restart Game</button>}
        </div>
      )}
    </div>
  );
};

export default Wordly;