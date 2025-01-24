import { useState, useEffect } from "react";
import { Divider } from "antd";
import styles from "./index.module.css";
import CarouselDefault from "../../../../components/CarouselDefault/carousel-default";
import CourseCard from "../../../Courses/course-card";
import NewCourseCard from "../../../Courses/new-course-card";
import SubscribeModal from "../../../Users/subscribe-modal";
import { useSearch } from "../../../../contexts/SearchContext";
import { useFetchCourses } from "../../../../hooks/useFetchCourses";
import useAuth from "../../../../hooks/useAuth";

const Content = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { courses, fetchCourses, loading, error } = useFetchCourses();
  const { searchTerm } = useSearch();
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const { user } = useAuth(); 

  const filteredByUser = courses?.filter(course => course?.user_id == user?.id);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchTerm, courses]);

  const handleOpenModal = () => {
    setIsVisible(!isVisible);
  };

  const renderSubscribeModal = () => (
    <SubscribeModal isVisible={isVisible} handleOpenModal={handleOpenModal} />
  );

  const handleAddCourse = async () => {
    await fetchCourses();
  };

  return (
    <div>
      {renderSubscribeModal()}
      <main className="home">

        <CarouselDefault courses={filteredByUser} onAddCourse={handleAddCourse}/> 
        <section className={styles.home__courses}>
          <div>
            <h1 className={styles.home__header}>TODOS CURSOS</h1>
            <Divider style={{ margin: "0" }} />
          </div>

          <div className={styles.home__grid}>
            {loading ? (
              <p className={styles.loading}>Carregando...</p>
            ) : error ? (
              <p className={styles.noCourses}>{error}</p>
            ) : filteredCourses.length > 0 ? (
              <>
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    title={course.title}
                    description={course.description}
                    thumbnail={course.thumbnail}
                    new_course={course.new_course}
                  />
                ))}
              </>
            ) : (
              <p className={styles.noCourses}>Nenhum curso encontrado.</p>
            )}
            <NewCourseCard onAddCourse={handleAddCourse} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Content;
