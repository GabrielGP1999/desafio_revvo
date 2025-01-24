export type Courses = {
  id: number;
  user_id: string;
  title: string;
  description: string;
  thumbnail: string;
  new_course: boolean;
}[];

export type Course = {
  id: number;
  user_id: string;
  title: string;
  description: string;
  thumbnail: string;
  new_course: boolean;
} | null;
