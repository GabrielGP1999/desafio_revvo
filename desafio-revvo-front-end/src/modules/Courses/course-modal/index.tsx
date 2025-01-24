import Content from "./content";

type Props = {
  isVisible: boolean;
  handleOpenModal: () => void;
  title: string;
  description: string;
  thumbnail: string;
};

const CourseModal = ({ isVisible, handleOpenModal, title, description, thumbnail }: Props) => {

  return <Content isVisible={isVisible} onOpenModal={handleOpenModal} title={title} description={description} thumbnail={thumbnail} />;
};

export default CourseModal;
