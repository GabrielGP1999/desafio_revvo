import Content from "./content";

type Props = {
    title: string;
    description: string;
    thumbnail: string;
    new_course: boolean;
};

const CourseCard = ({ title, description, thumbnail, new_course }: Props) => {
  return (
    <Content 
    title={title}
    description={description}
    thumbnail={thumbnail}
    new_course={new_course}
    />
  );
};

export default CourseCard;
