interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <div className="button-wrapper">
      <button type="button" onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default Button;
