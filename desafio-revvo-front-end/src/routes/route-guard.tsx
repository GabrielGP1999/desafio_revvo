import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { notification } from "antd";

interface AuthProviderProps {
  children: ReactNode;
}

const RouteGuard = ({ children }: AuthProviderProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {

      notification.destroy();
      notification.error({
        message: "Ops, Acesso negado!",
        description:
          "Você precisa estar logado para ver este conteúdo.",
      });

      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default RouteGuard;
