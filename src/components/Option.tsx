interface OptionProps {
  valueArray: { name?: string; value: string }[];
}

const Option: React.FC<OptionProps> = ({ valueArray }) => {
  const optionEl = valueArray.map(({ name, value }) => (
    <option key={value} value={value}>
      {name ? name : value}
    </option>
  ));

  return <>{optionEl}</>;
};

export default Option;
