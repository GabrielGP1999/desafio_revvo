import { useState } from "react";
import styles from "./navBar.module.css";
import logo from "../../assets/leo_no_background.png";
import {
  CaretDownOutlined,
  LogoutOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Divider, Dropdown, Input, MenuProps } from "antd";
import MyAccountFormModal from "../../modules/Users/my-account-form-modal";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSearch } from "../../contexts/SearchContext";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMyAccountModalVisible, setIsMyAccountModalVisible] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { setSearchTerm } = useSearch();

  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleMenuClick = (key: string) => {
    if (key === "0") {
      setIsMyAccountModalVisible(true);
    } else if (key === "1") {
      logout();
    }
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <a onClick={(e) => e.preventDefault()} rel="noopener noreferrer">
          <UserOutlined />
          <span style={{ marginLeft: "4px" }}>Minha conta</span>
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a href="/" rel="noopener noreferrer">
          <LogoutOutlined />
          <span style={{ marginLeft: "4px" }}>Sair</span>
        </a>
      ),
      key: "1",
    },
  ];

  return (
    <header className={styles.navbar}>
      {/* Logo */}
      <img
        className={styles.navbar__logo}
        src={logo}
        alt="Logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      />
      {isAuthenticated ? (
        <div className={styles.input__search__login}>
          {/* Search Input */}

          <div className={styles.mobileItens}>
            <Input
              type="text"
              placeholder="Pesquisar cursos..."
              className={styles.input}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "13px 10px",
                border: "1px solid #b5b5b5",
                borderRadius: "23px",
                backgroundColor: "#efefef",
                width: "250px",
              }}
              suffix={
                <SearchOutlined
                  style={{ color: "#939393", fontSize: "22px" }}
                />
              }
            />

            <Divider
              type="vertical"
              style={{
                height: "3.4em",
                margin: "0 16px",
                borderLeft: "1px solid #b5b5b5",
              }}
            />
          </div>

          {/* User Dropdown */}
          <div className={styles.dropdown__user}>
            <Avatar className={styles.avatar} size={44} icon={<UserOutlined />} />
            <div className={styles.dropdown__user__align}>
              <span className={styles.welcome}>Seja bem-vindo</span>
              <Dropdown
                menu={{
                  items,
                  onClick: (info) => handleMenuClick(info.key),
                }}
                trigger={["click"]}
                onOpenChange={handleOpenChange}
              >
                <a
                  onClick={(e) => e.preventDefault()}
                  className={styles.dropdownTrigger}
                >
                  <span>
                    {user?.name || user?.email || "Usuário"}{" "}
                    <CaretDownOutlined
                      className={`${styles.arrow} ${
                        isOpen ? styles.arrowOpen : ""
                      }`}
                    />
                  </span>
                </a>
              </Dropdown>
            </div>
          </div>
        </div>
      ) : !isLoginPage ? (
        <Button
          type="primary"
          onClick={() => navigate("/login")}
          style={{
            backgroundColor: "#1890ff",
            borderColor: "#1890ff",
            color: "#fff",
            borderRadius: "5px",
            padding: "0 20px",
            fontWeight: "bold",
          }}
        >
          Entrar
        </Button>
      ) : null}

      {/* Modal Minha Conta */}
      <MyAccountFormModal
        visible={isMyAccountModalVisible}
        onClose={() => setIsMyAccountModalVisible(false)}
      />
    </header>
  );
};

export default NavBar;
