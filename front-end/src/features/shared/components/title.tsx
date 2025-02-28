interface TitleProps {
  title: string;
  className: string;
}

export const Title: React.FC<TitleProps> = ({ className, title }) => {
  return (
    <div className={className}>
      <h1>{title}</h1>
    </div>
  );
};
