import { Drawer } from 'antd';

export interface ReportProps {
  open: boolean;
  onClose: () => void;
}

export const Report = ({
  open,
  onClose,
}: ReportProps) => {
  return (
    <Drawer
      closable
      destroyOnHidden
      title={<p>Loading Drawer</p>}
      placement="right"
      open={open}
      onClose={onClose}
      width="100%"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};
