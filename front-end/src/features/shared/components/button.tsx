interface ButtonProps {
  children: string;
  type?: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-purple-500 hover:bg-purple-700 active:bg-purple-100 active:text-purple-700 text-white rounded-md py-2 px-4 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
