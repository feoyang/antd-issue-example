import { Modal, Flex, Typography } from 'antd';
import { ReactNode } from 'react';
import { modalStyle } from './style';

export interface SharedReportModalProps {
  children: ReactNode;
  title: string;
  open: boolean;
  onClose: () => void;
  bodyHeight: number;
  backgroundImg: string;
}

export const SharedReportModal = ({
  children,
  open,
  onClose,
  title,
  bodyHeight,
  backgroundImg,
}: SharedReportModalProps) => {
  const { styles } = modalStyle({
    modalBackgroundPng: backgroundImg,
    bodyHeight,
  });

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <Flex justify="center">
          <Typography.Title level={4} style={{ margin: 0 }}>
            {title}
          </Typography.Title>
        </Flex>
      }
      centered
      width={1080}
      classNames={{
        header: styles.modalHeader,
        content: styles.modalContent,
        body: styles.modalBody,
      }}
      footer={null}
    >
      {children}
    </Modal>
  );
};
