interface SubtitleProps {
  title: string;
}
const Subtitle: React.FC<SubtitleProps> = ({ title }) => {
  return <h2>{title}</h2>;
};

export default Subtitle;
