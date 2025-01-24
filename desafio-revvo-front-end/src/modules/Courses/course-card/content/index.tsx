import { Badge, Button, Card } from "antd";
import styles from "./index.module.css";
import SubscribeModal from "../../../Users/subscribe-modal";
import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import CourseModal from "../../course-modal";

type Props = {
  title: string;
  description: string;
  thumbnail: string;
  new_course: boolean;
};

const { Meta } = Card;

const Content = ({ title, description, thumbnail, new_course}: Props) => {
  const [subscribeModalIsVisible, setSubscribeModalIsVisible] = useState(false);
  const [courseModalIsVisible, setCourseModalIsVisible] = useState(false);
  const { isAuthenticated } = useAuth();


  const handleViewCourse = () => {
    if (isAuthenticated) {
      setCourseModalIsVisible(!courseModalIsVisible);
    } else {
      setSubscribeModalIsVisible(!subscribeModalIsVisible);
    }
    
  };

  const renderCourseModal = () => {
    return (
      <CourseModal isVisible={courseModalIsVisible} handleOpenModal={handleViewCourse} title={title} description={description} thumbnail={thumbnail}/>
    );
  };

  const renderSubscribeModal = () => {
    return (
      <SubscribeModal isVisible={subscribeModalIsVisible} handleOpenModal={handleViewCourse} />
    );
  };

  return (
    <>
      <Badge.Ribbon
        text="Novo"
        color="green"
        style={{ display: new_course ? "block" : "none" }}
      >
        <Card
          style={{ width: 350 }}
          className={styles.card__course}
          cover={
            <img
              alt="example"
              src={thumbnail}
              className={styles.thumbnail}
            />
          }
          actions={[
            <Button
              color="green"
              shape="round"
              onClick={handleViewCourse}
              variant="solid"
              style={{ width: "80%" }}
            >
              VER CURSO
            </Button>,
          ]}
        >
          <Meta title={title} description={<span className={styles.description}>{description}</span>} />
        </Card>
      </Badge.Ribbon>
      {renderSubscribeModal()}
      {renderCourseModal()}
    </>
  );
};

export default Content;
