interface SubTittleProps {
  text: string;
}
const SubTittle: React.FC<SubTittleProps> = ({ text }) => {
  return (
    <div>
      <h2>{text}</h2>
    </div>
  );
};

export default SubTittle;
