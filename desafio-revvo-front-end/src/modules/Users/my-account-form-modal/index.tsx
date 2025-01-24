import { useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

interface MyAccountFormModalProps {
  visible: boolean;
  onClose: () => void;
}

const MyAccountFormModal = ({
  visible,
  onClose,
}: MyAccountFormModalProps) => {
  const [form] = Form.useForm();
  const { user, login } = useAuth();

  useEffect(() => {
    if (visible && user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
      });
    }
  }, [visible, user, form]);

  const handleSave = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          const userId = user?.id || JSON.parse(sessionStorage.getItem("auth_data") || "{}").user?.id;

          if (!userId) {
            throw new Error("ID do usuário não encontrado.");
          }

          const response = await axios.put('http://localhost:8000/user', {
            id: userId,
            name: values.name,
            email: values.email,
            password: values.password || "",
          });

          const updatedUser = response.data.user;
          login(updatedUser);

          message.success(response.data.message || "Dados atualizados com sucesso!");
          onClose();
        } catch (err: unknown) {
          message.error("Erro inesperado. Tente novamente.");
          console.error(err);
      }
      })
      .catch((error) => {
        console.error("Erro de validação:", error);
      });
  };

  return (
    <Modal
      title="Editar Conta"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Salvar
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Nome"
          name="name"
          rules={[{ required: true, message: "Por favor, insira seu nome!" }]}
        >
          <Input placeholder="Seu nome" />
        </Form.Item>
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            { type: "email", message: "Insira um e-mail válido!" },
          ]}
        >
          <Input disabled={true} placeholder="Seu e-mail" />
        </Form.Item>
        <Form.Item
          label="Defina sua Senha"
          name="password"
          extra="Sua senha precisa ter no mínimo 8 caracteres!"
          rules={[
            { required: true, min: 8, message: "A senha deve ter no mínimo 8 caracteres!" },
          ]}
        >
          <Input.Password placeholder="Sua senha" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MyAccountFormModal;
