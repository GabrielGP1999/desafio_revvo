import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Desculpe, a página que tentou acessar não existe"
      extra={<Button onClick={handleNavigate} type="primary">Voltar</Button>}
    />
  );
};

export default NotFound;
