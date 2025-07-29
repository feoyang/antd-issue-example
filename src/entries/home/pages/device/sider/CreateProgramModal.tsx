import { Input, Form, Modal } from 'antd';
import { createProgramModalStyle } from '../style';

export interface CreateProgramModalProps {
  open: boolean;
  onCancel: () => void;
}

export const CreateProgramModal = ({
  open,
  onCancel,
}: CreateProgramModalProps) => {
  const { styles } = createProgramModalStyle();

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="创建程序"
      width={600}
      classNames={{
        body: styles.modalBody,
      }}
      centered
      footer={null}
    >
      <Form>
        <Form.Item label="任务名称" name="name">
          <Input placeholder="请输入任务名称" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
