import Content from "./content";

type Props = {
  onAddCourse: () => void
}

const NewCourseCard = ({ onAddCourse }: Props) => {
  return (
    <Content onAddCourse={onAddCourse}/>
  );
};

export default NewCourseCard;
