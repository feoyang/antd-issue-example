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
  const { styles: modalStyles } = createMissionModalStyle();

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      centered
      width={1000}
      classNames={{
        body: modalStyles.modalBody,
      }}
      title="待办任务"
      footer={null}
    >
      <Flex>

      </Flex>
      <Flex>
        <Flex>
          <Typography.Title level={4}>创建任务</Typography.Title>
        </Flex>
      </Flex>
    </Modal>
  );
};
