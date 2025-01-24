import { useEffect, useState } from "react";
import { getCoursesAPI } from "../service";
import Content from "./content";
import { Courses } from "../types";

const Home = () => {
  const [coursesResponse, setCoursesResponse] = useState<Courses>([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response: Courses = await getCoursesAPI();
        setCoursesResponse(response);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    getCourses();
  }, []);

  return <Content courses={coursesResponse} />;
};

export default Home;
