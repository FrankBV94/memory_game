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
    <div className="form-container" ref={divRef} tabIndex={-1}>
      <p className="p--regular">
        Customize the game by selecting an emoji category and a number of memory
        cards.
      </p>
      <form className="wrapper">
        <Select handleChange={handleChange} />
        <RegularButton handleClick={handleSubmit}>Start Game</RegularButton>
      </form>
    </div>
  );
};

export default Form;
