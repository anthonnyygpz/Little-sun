interface TitleProps {
  title: string;
}

export const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div className="items-center justify-center flex">
      <h1 className="text-purple-500 text-4xl font-bold">{title}</h1>
    </div>
  );
};
