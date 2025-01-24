import { useState, useCallback } from "react";
import { getCoursesAPI } from "../modules/Home/service";

type Course = {
  id: number;
  user_id: string;
  title: string;
  description: string;
  thumbnail: string;
  new_course: boolean;
};

export const useFetchCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getCoursesAPI();
      setCourses(response);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err || "Erro ao carregar os cursos");
    } finally {
      setLoading(false);
    }
  }, []);

  return { courses, fetchCourses, loading, error };
};
