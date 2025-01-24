import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { NewCourseFormValues } from "../../types";
import useAuth from "../../../../hooks/useAuth";

const Content = ({
  isVisible,
  handleClose,
  handleSubmit,
}: {
  isVisible: boolean;
  handleClose: () => void;
  handleSubmit: (values: NewCourseFormValues) => Promise<void>;
}) => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
    try {
      
      const values = await form.validateFields();
      const imageFile = values.image[0]?.originFileObj;

      if (!imageFile) {
        throw new Error("Imagem é obrigatória");
      }
     
      if (!user?.id) {
        throw new Error("Usuário não encontrado.");
      }

      setIsSubmitting(true);

      const id = user.id;

      await handleSubmit({
        title: values.title,
        description: values.description,
        image: imageFile,
        user_id: id,
      });
      form.resetFields();
      
      handleClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title="Adicionar Novo Curso"
      open={isVisible}
      onCancel={handleClose}
      footer={[
        <Button key="cancel" onClick={handleClose}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={onSubmit}
          loading={isSubmitting}
        >
          Adicionar
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="image"
          label="Imagem do Curso"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Por favor, envie uma imagem!" }]}
        >
          <Upload
            name="image"
            listType="picture"
            accept="image/*"
            maxCount={1}
            beforeUpload={(file) => {
              const isImage = file.type.startsWith("image/");
              if (!isImage) {
                message.error("Apenas arquivos de imagem são permitidos!");
              }
              return isImage || Upload.LIST_IGNORE;
            }}
          >
            <Button icon={<UploadOutlined />}>Selecionar Imagem</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="title"
          label="Título do Curso"
          rules={[{ required: true, message: "Por favor, insira o título!" }]}
        >
          <Input placeholder="Digite o título do curso" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Descrição"
          rules={[{ required: true, message: "Por favor, insira a descrição!" }]}
        >
          <Input.TextArea placeholder="Digite a descrição do curso" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Content;
