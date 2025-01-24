import { useState, useEffect } from "react";
import { Carousel, Button } from "antd";
import backgroundImage from "../../assets/background_carousel.png";
import { Course, Courses } from "../../modules/Home/types";
import useAuth from "../../hooks/useAuth";
import NewCourseForm from "../../modules/Courses/new-course-form";
import SubscribeModal from "../../modules/Users/subscribe-modal";
import CourseModal from "../../modules/Courses/course-modal";

type Props = {
  courses: Courses;
  onAddCourse: () => void;
};

const CarouselDefault = ({ courses, onAddCourse }: Props) => {
  const { user, isAuthenticated } = useAuth();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false); 
  const [isCourseModalVisible, setIsCourseModalVisible] = useState(false);
  const [userCourses, setUserCourses] = useState<Courses>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course>(null);

  useEffect(() => {
    if (user?.id) {
      const filteredCourses = courses.filter((course) => course.user_id === user.id);
      setUserCourses(filteredCourses);
    }
  }, [user, courses]);

  const handleCreateModalOpen = () => {
    setIsCreateModalVisible(true);
  };

  const handleCreateModalClose = () => {
    setIsCreateModalVisible(false);
  };

  const handleCourseModalOpen = (course: Course) => {
    setSelectedCourse(course); 
    setIsCourseModalVisible(true); 
  };

  const handleCourseModalClose = () => {
    setIsCourseModalVisible(false); 
    setSelectedCourse(null); 
  }

  return (
    <div>
      <Carousel arrows infinite={true}>
        {userCourses.length > 0 ? (
          userCourses.map((course) => (
            <div key={course.id}>
              <div
                style={{
                  margin: 0,
                  height: "400px",
                  position: "relative",
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "10%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    maxWidth: "400px",
                  }}
                >
                  <h2 style={{ marginBottom: "10px", fontSize: "24px" }}>
                    {course.title}
                  </h2>
                  <p style={{ marginBottom: "20px" }}>{course.description}</p>
                  <Button
                    type="primary"
                    onClick={() => handleCourseModalOpen(course)} 
                  >
                    VER MEU CURSO
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <div
              style={{
                margin: 0,
                height: "400px",
                position: "relative",
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "10%",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "#fff",
                  padding: "20px",
                  borderRadius: "8px",
                  maxWidth: "400px",
                }}
              >
                <h2 style={{ marginBottom: "10px", fontSize: "24px" }}>
                  Crie seu primeiro curso!
                </h2>
                <p style={{ marginBottom: "20px" }}>
                  Você ainda não tem cursos. Que tal começar a criar um?
                </p>
                <Button
                  type="primary"
                  onClick={handleCreateModalOpen}
                >
                  Criar Curso
                </Button>
              </div>
            </div>
          </div>
        )}
      </Carousel>

      {isAuthenticated ? (
        <NewCourseForm
          isVisible={isCreateModalVisible}
          handleCloseModal={handleCreateModalClose}
          onAddCourse={onAddCourse}
        />
      ) : (
        <SubscribeModal
          isVisible={isCreateModalVisible}
          handleOpenModal={handleCreateModalClose}
        />
      )}

      {/* Modal de detalhes do curso */}
      {selectedCourse && (
        <CourseModal
          isVisible={isCourseModalVisible}
          handleOpenModal={handleCourseModalClose}
          title={selectedCourse.title}
          description={selectedCourse.description}
          thumbnail={selectedCourse.thumbnail}
        />
      )}
    </div>
  );
};

export default CarouselDefault;
