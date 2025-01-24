import { Button, Form, Grid, Input, theme, Typography, message } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import logo from "../../../../assets/leo_no_background.png";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import api from "../../../../service/auth.service";
import useAuth from "../../../../hooks/useAuth";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

const Content = () => {
  const { token } = useToken();
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const { login } = useAuth();

  const redirectLoginPage = () => {
    navigate("/login");
  };

  const onFinish = async (values: { name: string; email: string; password: string }) => {
    try {
      const response = await api.post("/register", values);

      sessionStorage.setItem("auth_data", JSON.stringify(response.data));
      login(response.data.user);

      message.success(response.data.message || "Registro realizado com sucesso!");
      navigate("/");
    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorResponse = (error as any)?.response?.data;
      message.error(errorResponse?.error || "Erro inesperado. Tente novamente.");
    }
  };

  return (
    <section
      className={styles.section}
      style={{
        height: screens.sm ? "60vh" : "auto",
        padding: screens.md ? `${token.sizeXXL}px 0px` : "50px",
      }}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={logo} alt="Logo" style={{ width: 100 }} />

          <Title
            className={styles.title}
            style={{
              fontSize: screens.md
                ? token.fontSizeHeading2
                : token.fontSizeHeading3,
            }}
          >
            Registre-se
          </Title>
        </div>
        <Form
          name="normal_signup"
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Por favor, insira seu Nome!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nome" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Por favor, insira um Email válido!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            extra="Sua senha precisa ter no mínimo 8 caracteres!"
            rules={[
              {
                required: true,
                message: "Por favor, insira sua Senha!",
              },
              {
                min: 8,
                message: "A senha deve ter no mínimo 8 caracteres!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Senha"
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block type="primary" htmlType="submit">
              Registre-se
            </Button>
            <div className={styles.signup}>
              <Text className={styles.text}>Já possui uma conta?</Text>{" "}
              <Link onClick={redirectLoginPage}>Entre</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default Content;
