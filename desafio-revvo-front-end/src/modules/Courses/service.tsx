import api from "../../service/api";
import { Course } from "./types";

export const createNewCourse = async (values: Course) => {
  try {
    const response = await api.post('/course', values);
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
};
