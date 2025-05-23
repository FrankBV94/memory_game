import { data } from "../data/data";
import Option from "./Option";

interface SelectProps {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ handleChange }) => {
  const selectEl = Object.entries(data).map(([key, value]) => (
    <div key={key} className="form__inner-wrapper">
      <label htmlFor={key}>Select a {key}</label>
      <select name={key} id={key} onChange={handleChange} className="select">
        <Option valueArray={value} />
      </select>
    </div>
  ));

  return <>{selectEl}</>;
};

export default Select;
