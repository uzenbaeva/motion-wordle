import { useEffect, useState } from "react";
const API_URL = 'https://piccolo-server.vercel.app/words';

const useFetch = () => {
  const [randomWord, setRandomWord] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchWords = async () => {
    let response;
    try {
      response = await fetch(API_URL);
      const data = await response.json();
      if (data.success){
        return data.data;
      }
    }
    catch (error){
      console.error('Error fetching data:', error);
    }
  };

  const getRandomWord = async () => {
    const words = await fetchWords();
    if (words){
      const randomIndex = Math.floor(Math.random() * words.length);
      return words[randomIndex];
    } 
    return '';
  };

  useEffect(() => {
    const fetchRandomWord = async () => {
      setIsLoading(true);
      const word = await getRandomWord();
      setIsLoading(false);
      setRandomWord(word);
    };
    fetchRandomWord();
  }, []);

  return {
    isLoading: isLoading,
    word: randomWord,
  };
}

export default useFetch;