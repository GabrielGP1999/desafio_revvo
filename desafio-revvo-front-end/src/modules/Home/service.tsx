import api from "../../service/api";
import { Courses } from "./types";

export const getCoursesAPI = async (): Promise<Courses> => {
  try {
    const response = await api.get('/courses', {
      headers: {
        Accept: 'application/json',
      },
      responseType: 'json',
    });

    return response.data as unknown as Courses ?? [];
  } catch (err) {
    return Promise.reject(err);
  }
};
