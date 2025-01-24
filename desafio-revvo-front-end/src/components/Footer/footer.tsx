import styles from "./footer.module.css";
import logo from "../../assets/leo_no_background.png";
import { PinterestFilled, TwitterOutlined, YoutubeFilled } from "@ant-design/icons";

const Footer = () => {
  return (
    <>
    <footer className={styles.footer}>
      <div className={styles.footer__logo}>
        <img src={logo} alt="Logo" />
        <div>
          <span>
            Maecenas faucibus mollis interdum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </span>
        </div>
      </div>

      <div className={styles.footer__contact}>
        <h5>// CONTATO</h5>
        <div>
          <span>(21) 98765-3434</span>
          <span>contato@leolearning.com</span>
        </div>
      </div>

      <div className={styles.footer__media}>
        <h5>// REDES SOCIAIS</h5>
        <div>
          <TwitterOutlined />
          <YoutubeFilled />
          <PinterestFilled />
        </div>
      </div>
    </footer>
    <div className={styles.footer__copyright}>
      Copyright 2017 - All right reserved.
    </div>
  </>
  );
};

export default Footer;
