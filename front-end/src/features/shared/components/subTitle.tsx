interface SubtitleProps {
  title: string;
}
const Subtitle: React.FC<SubtitleProps> = ({ title }) => {
  return <h2 className="text-lg font-bold">{title}</h2>;
};

export default Subtitle;
