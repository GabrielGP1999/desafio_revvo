import { Button, Form, Grid, Input, theme, Typography, Alert } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import logo from "../../../../assets/leo_no_background.png";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import api from "../../../../service/auth.service";
import useAuth from "../../../../hooks/useAuth";
import { useState } from "react";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Title, Text, Link } = Typography;

const Content = () => {
  const { token } = useToken();
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const redirectRegisterPage = () => {
    navigate("/register");
  };

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const response = await api.post("/login", values);

      sessionStorage.setItem("auth_data", JSON.stringify(response.data));
      
      login(response.data.user);

      setError(null);
      navigate("/");
    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorResponse = (error as any)?.response?.data;
      setError(
        errorResponse?.error === "Invalid credentials"
          ? "Credenciais inválidas. Verifique seu e-mail e senha."
          : errorResponse?.message || "Erro inesperado. Tente novamente."
      );
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
            Entre
          </Title>
        </div>
        <Form
          name="normal_login"
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          {/* Exibição do alerta de erro */}
          {error && (
            <Form.Item>
              <Alert
                message="Erro de Login"
                description={error}
                type="error"
                showIcon
                closable
                onClose={() => setError(null)}
              />
            </Form.Item>
          )}

          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Por favor, insira um Email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Por favor, insira sua Senha!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block type="primary" htmlType="submit">
              Entre
            </Button>
            <div className={styles.signup}>
              <Text className={styles.text}>Você não possui uma conta?</Text>{" "}
              <Link onClick={redirectRegisterPage}>Registre-se</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default Content;
