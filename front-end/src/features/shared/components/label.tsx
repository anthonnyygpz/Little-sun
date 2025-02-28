interface LabelProps {
  className?: string;
  text: string;
}

const Label: React.FC<LabelProps> = ({ className = "", text }) => {
  return <label className={className}>{text}</label>;
};

export default Label;
