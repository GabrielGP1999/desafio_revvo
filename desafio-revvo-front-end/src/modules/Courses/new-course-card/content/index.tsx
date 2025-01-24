import { Card } from "antd";
import folderAddCourse from "../../../../assets/folder-no-background.png";
import styles from "./index.module.css";
import NewCourseForm from "../../new-course-form";
import { useState } from "react";
import SubscribeModal from "../../../Users/subscribe-modal";
import useAuth from "../../../../hooks/useAuth";

type Props = {
  onAddCourse: () => void;
}

const Content = ({ onAddCourse }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <Card
        className={styles.card__new_course}
        onClick={handleModal}
        style={{ cursor: "pointer" }}
      >
        <div>
          <img src={folderAddCourse} alt="folder-no-bg" />
        </div>
        <div className={styles.card__new_course_label}>
          <h1>ADICIONAR</h1>
          <h1>CURSO</h1>
        </div>
      </Card>

      {isAuthenticated ? (
        <NewCourseForm
          isVisible={isModalVisible}
          handleCloseModal={handleModal}
          onAddCourse={onAddCourse}
        />
      ) : (
        <SubscribeModal
          isVisible={isModalVisible}
          handleOpenModal={handleModal}
        />
      )}
    </>
  );
};

export default Content;
