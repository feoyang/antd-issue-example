import { Flex, Typography, Modal } from 'antd';
import { createMissionModalStyle } from '../style';

export interface CreateMissionModalProps {
  open: boolean;
  onCancel: () => void;
}

export const CreateMissionModal = ({
  open,
  onCancel,
}: CreateMissionModalProps) => {
  const { styles } = createMissionModalStyle();

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      centered
      width={1000}
      classNames={{
        body: styles.modalBody,
      }}
      title="待办任务"
      footer={null}
    >
      <Flex className={styles.totalWrapper}>
        <div className={styles.leftWrapper}>
          <Flex>
            <Typography.Title level={4}>创建任务</Typography.Title>
          </Flex>
        </div>
        <div className={styles.rightWrapper}>
          <Flex>
            <Typography.Title level={4}>创建任务</Typography.Title>
          </Flex>
        </div>
      </Flex>
    </Modal>
  );
};
