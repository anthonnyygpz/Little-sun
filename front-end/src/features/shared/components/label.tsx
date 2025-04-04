interface LabelProps {
  className?: string;
  text: string;
  id?: string;
}

const Label: React.FC<LabelProps> = ({ className = "", text, id }) => {
  return (
    <label className={`block text-sm font-medium ${className}`} htmlFor={id}>
      {text}
    </label>
  );
};

export default Label;
