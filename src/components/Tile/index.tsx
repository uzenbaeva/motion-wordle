import '../styles/Tile.css';

export const Tile = ({
  index, 
  inputValue,
  tileClass,
}: {
  index: number,
  inputValue: string,
  tileClass: string,
}) => {
  return (
    <div className={`square ${tileClass}`} key={index}>
      <input
        type="text"
        value={inputValue}
        className="square__input"
        readOnly
        disabled
      />
    </div>
  );
}