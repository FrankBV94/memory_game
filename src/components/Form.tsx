import { useEffect, useRef } from "react";
import RegularButton from "./RegularButton";
import Select from "./Select";

interface FormProps {
  handleSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isFirstRender: boolean;
}

const Form: React.FC<FormProps> = ({
  handleSubmit,
  handleChange,
  isFirstRender,
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFirstRender && divRef.current) {
      divRef.current.focus();
    }
  }, []);

  return (
    <div
      className="card w-96 bg-base-100 card-xl shadow-sm"
      ref={divRef}
      tabIndex={-1}
    >
      <div className="card-body">
        <h2 className="card-title mb-4">
          Customize the game by selecting an emoji category and a number of
          memory cards.
        </h2>
        <form className="flex flex-col gap-4">
          <Select handleChange={handleChange} />
          <RegularButton handleClick={handleSubmit}>Start Game</RegularButton>
        </form>
      </div>
    </div>
  );
};

export default Form;
