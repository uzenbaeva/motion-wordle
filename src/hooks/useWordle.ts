import { useState, useEffect } from "react"
import useFetch from "./useFetch";
export const useWordle = () => {

  const [guesses, setGuesses] = useState<string[]>(Array(5).fill(""));
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const {isLoading, word} = useFetch();

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && currentGuess.length === 5) {
      if (currentGuess === word) {
        alert(`Siz jenildiniz... Secret soz: ${word}`);
        setGameOver(true);
      }else{
        if (currentIndex <  4) {
          setCurrentIndex(currentIndex + 1);
          setCurrentGuess("");
        }else{
          handleGameOver();
        }
      }
    }
    else if (e.key === 'Backspace') {
      setCurrentGuess(currentGuess.slice(0, -1));
    }
    else if (/^[a-zA-Z]$/.test(e.key) &&  currentGuess.length < 5) {
      setCurrentGuess(currentGuess + e.key.toUpperCase());
    }
  }

  const handleGameOver = () => {
    setCurrentGuess("");
    setGuesses(Array(5).fill(""));
    setCurrentIndex(0);
    setGameOver(true);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => handleKeyPress(e);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isLoading, currentGuess, currentIndex, gameOver]);

  useEffect(() => {
    const newGuesses = [...guesses];
    newGuesses[currentIndex] = currentGuess;
    setGuesses(newGuesses);

  }, [isLoading, currentGuess, currentIndex, gameOver]);

  const getTileClass = (letter: string, index: number) => {
    if (currentIndex < guesses.length){
      if (word[index] === letter){
        return "correct";
      }
      if (word.includes(letter)){
        return "present";
      }
      return "incorrect";
    }
    return "";
  } 


  return {
    word,
    isLoading,
    guesses,
    gameOver,
    currentGuess,
    currentIndex,
    getTileClass,
    handleGameOver,
  }
}