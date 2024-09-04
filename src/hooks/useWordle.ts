import { useState, useEffect } from "react";
import useFetch from "./useFetch";

export const useWordle = () => {
  const [guesses, setGuesses] = useState<string[][]>(Array.from({ length: 6 }, () => Array(5).fill("")));
  const [currentGuesses, setCurrentGuesses] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const { isLoading, data } = useFetch();
  const [word, setWord] = useState<string>("");

  useEffect(() => {
    if (data.length > 0) {
      initializeGame();
    }
  }, [data]);

  const initializeGame = () => {
    if (data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomWord = data[randomIndex];
      console.log("Случайно выбранное слово:", randomWord);
      setWord(randomWord);
      setGuesses(Array.from({ length: 6 }, () => Array(5).fill("")));
      setCurrentGuesses("");
      setCurrentIndex(0);
      setGameOver(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (gameOver) return;

    if (e.key === "Enter" && currentGuesses.length === 5) {
      if (currentGuesses === word) {
        alert(`Вы угадали слово ${word}`);
        setGameOver(true);
      } else {
        if (currentIndex < 5) {
          setCurrentIndex(currentIndex + 1);
          setCurrentGuesses("");
        } else {
          alert(`Вы проиграли. Правильное слово: ${word}`);
          setGameOver(true);
        }
      }
    } else if (e.key === "Backspace") {
      setCurrentGuesses(currentGuesses.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(e.key) && currentGuesses.length < 5) {
      setCurrentGuesses(currentGuesses + e.key.toUpperCase());
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => handleKeyPress(e);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentGuesses, currentIndex, gameOver]);

  useEffect(() => {
    const newGuesses = [...guesses];
    newGuesses[currentIndex] = currentGuesses.split("");
    setGuesses(newGuesses);
  }, [currentGuesses, currentIndex]);

  const getTileClass = (letter: string, col: number, row: number) => {
    if (letter === "") return "";
    
    if (word[col] === letter) {
      return "correct";
    }
    if (word.includes(letter)) {
      return "present";
    }
    return "incorrect";
  };
  

  return {
    word,
    isLoading,
    guesses,
    gameOver,
    currentGuesses,
    currentIndex,
    getTileClass,
    initializeGame,
  };
};





