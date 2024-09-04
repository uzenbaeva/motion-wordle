import { useEffect, useState } from "react";

const API_URL = 'https://piccolo-server.vercel.app/words';

interface FetchData {
  success: boolean;
  data: string[];
}

const useFetch = () => {
  const [data, setData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      const result: FetchData = await response.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    isLoading,
    data,
  };
}

export default useFetch;