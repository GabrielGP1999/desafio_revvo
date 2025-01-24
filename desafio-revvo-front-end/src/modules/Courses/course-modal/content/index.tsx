import { Flex, Modal } from "antd";
import styles from "./index.module.css";

type Props = {
  isVisible: boolean;
  onOpenModal: () => void;
  title: string;
  description: string;
  thumbnail: string;
};

const Content = ({
  isVisible,
  onOpenModal,
  title,
  description,
  thumbnail,
}: Props) => {
  return (
    <>
      <Flex vertical gap="middle" align="flex-start">
        <Modal
          centered
          styles={{
            content: { padding: "0 0 20px 0", borderRadius: "15px" },
          }}
          open={isVisible}
          onCancel={onOpenModal}
          closeIcon={false}
          footer={false}
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
              src={thumbnail}
              alt="thumbnail"
              className={styles.modalImage}
            />
            <div className={styles.courseContent}>
              <h2 className={styles.modalTitle}>{title}</h2>
              <p className={styles.modalDescription}>{description}</p>
            </div>
            <button className={styles.modalActionBtn} onClick={onOpenModal}>
              Fechar
            </button>
          </div>
        </Modal>
      </Flex>
    </>
  );
};

export default Content;
