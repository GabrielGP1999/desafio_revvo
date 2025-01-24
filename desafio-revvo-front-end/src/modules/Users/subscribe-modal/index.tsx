import Content from "./content";

type Props = {
  isVisible: boolean;
  handleOpenModal: () => void;
};

const SubscribeModal = ({ isVisible, handleOpenModal }: Props) => {

  return <Content isVisible={isVisible} onOpenModal={handleOpenModal} />;
};

export default SubscribeModal;
