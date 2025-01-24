export type Course = {
  title: string;
  description: string;
  image: string;
  user_id?: string;
};

export type NewCourseFormValues = {
  title: string;
  description: string;
  image: File;
  user_id: string;
};
