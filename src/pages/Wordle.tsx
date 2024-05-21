import { Tile } from "../components";
import { useWordle } from "../hooks/useWordle";

const Wordly = () => {
  const {isLoading, word, guesses, gameOver, currentIndex, getTileClass, handleGameOver} = useWordle();

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {Array.from({ length: 5 }, (_, row) => (
            <div key={row} style={{ display: "flex" }}>
              {Array.from({ length: 5 }, (_, col) => {
                const index = row * 5 + col;
                const inputValue = guesses[row][col] || "";
                const tileClass = currentIndex > row ? getTileClass(inputValue, col) : "";
                return (
                  <Tile 
                    index={index}
                    inputValue={inputValue}
                    tileClass={tileClass}
                    />
                );
              })}
            </div>
          ))}
          <pre>{word}</pre>
          {gameOver && (
            <button onClick={handleGameOver}>
              Restart
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Wordly;