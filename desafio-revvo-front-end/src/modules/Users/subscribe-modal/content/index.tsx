import { Flex, Modal } from "antd";
import subscribeBackground from "../../../../assets/subscribe-backgroud.webp";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";

type Props = {
  isVisible: boolean;
  onOpenModal: () => void;
};

const Content = ({ isVisible, onOpenModal }: Props) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const redirectToRegisterPage = () => {
    navigate("/register");
  };

  return (
    <>
      {!isAuthenticated ? (
        <Flex vertical gap="middle" align="flex-start">
          <Modal
            centered
            styles={{
              content: { padding: "0 0 20px 0", borderRadius: "15px" },
            }}
            open={isVisible}
            onCancel={onOpenModal}
            closeIcon={false}
            footer={null}
            width={{
              xs: "90%",
              sm: "80%",
              md: "70%",
              lg: "60%",
              xl: "50%",
              xxl: "40%",
            }}
            className={styles.customModal}
          >
            <div style={{ padding: "0" }} className={styles.modalContent}>
              <button className={styles.modalCloseBtn} onClick={onOpenModal}>
                ✕
              </button>
              <img
                src={subscribeBackground}
                alt="Modal Header"
                className={styles.modalImage}
              />
              <h2 className={styles.modalTitle}>EGESTAS TORTOR VULPUTATE</h2>
              <p className={styles.modalDescription}>
                Aenean eu leo quam. Pellentesque ornare sem lacinia quam
                venenatis vestibulum. Donec ullamcorper nulla non metus auctor
                fringilla. Donec sed odio dui. Cras
              </p>
              <button
                className={styles.modalActionBtn}
                onClick={() => redirectToRegisterPage()}
              >
                INSCREVA-SE
              </button>
            </div>
          </Modal>
        </Flex>
      ) : null}
    </>
  );
};

export default Content;
