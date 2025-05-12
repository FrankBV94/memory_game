import { useEffect, useRef } from "react";
import RegularButton from "./RegularButton";

interface GameOverProps {
  handleClick: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ handleClick }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.focus();
    }
  }, []);

  return (
    <div className="wrapper wrapper--accent" tabIndex={0} ref={divRef}>
      <p className="p--large">You've matched all the memory cards!</p>
      <RegularButton handleClick={handleClick}>Play again</RegularButton>
    </div>
  );
};

export default GameOver;
