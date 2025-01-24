import { message } from "antd";
import Content from "./content";
import { createNewCourse } from "../service";
import useAuth from "../../../hooks/useAuth";

type Props = {
  isVisible: boolean;
  handleCloseModal: () => void;
  onAddCourse: () => void;
};

const NewCourseForm = ({ isVisible, handleCloseModal, onAddCourse }: Props) => {
  const { user } = useAuth();

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (values: { title: string; description: string; image: File; user_id: string }) => {
    try {
      const base64Image = await convertToBase64(values.image);

      const data = {
        title: values.title,
        description: values.description,
        image: base64Image,
        user_id: user?.id, 
      };

      await createNewCourse(data);
      await onAddCourse();

      message.success("Curso adicionado com sucesso!");
    } catch (error) {
      message.error("Erro ao adicionar o curso.");
      console.error(error);
    }
  };

  return <Content isVisible={isVisible} handleClose={handleCloseModal} handleSubmit={handleSubmit} />;
};

export default NewCourseForm;
