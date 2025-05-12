interface RegularButtonProps {
  handleClick: (e: React.FormEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

const RegularButton: React.FC<RegularButtonProps> = ({
  handleClick,
  children,
}) => {
  return (
    <button className="btn btn-primary" onClick={handleClick}>
      {children}
    </button>
  );
};

export default RegularButton;
