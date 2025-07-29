import { Modal } from 'antd';

export interface CreateMissionModalProps {
  open: boolean;
  onCancel: () => void;
}

export const CreateMissionModal = ({
  open,
  onCancel,
}: CreateMissionModalProps) => {

  return (
    <Modal open={open} onCancel={onCancel}>
      123
    </Modal>
  );
};
