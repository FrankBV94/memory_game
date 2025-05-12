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
    <div
      className="card w-96 bg-base-100 card-lg shadow-sm"
      tabIndex={0}
      ref={divRef}
    >
      <div className="card-body">
        <h2 className="card-title">You've matched all the memory cards!</h2>

        <div className="justify-end card-actions">
          <RegularButton handleClick={handleClick}>Play again</RegularButton>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
