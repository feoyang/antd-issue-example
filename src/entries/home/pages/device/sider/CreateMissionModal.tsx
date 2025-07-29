import { Flex, Typography, Modal, List, message, Input, Table } from 'antd';
import { useRequest } from 'ahooks';
import classNames from 'classnames';
import { useState } from 'react';
import { createMissionModalStyle } from '../style';
import { requestGatewayListByPage, requestProgramListByGatewayId } from '../../../../../services/requests/xlyk-device';

export interface CreateMissionModalProps {
  open: boolean;
  onCancel: () => void;
}

export const CreateMissionModal = ({
  open,
  onCancel,
}: CreateMissionModalProps) => {
  const { styles } = createMissionModalStyle();
  const [selectedGatewayId, setSelectedGatewayId] = useState<number | undefined>(undefined);

  const {
    data: gatewayListByPage,
    loading: requestGatewayListByPageLoading,
  } = useRequest(requestGatewayListByPage, {
    onError: (error) => {
      message.error(error.message);
    },
  });

  const {
    data: programListByGatewayId,
    loading: requestProgramListByGatewayIdLoading,
  } = useRequest(requestProgramListByGatewayId, {
    onError: (error) => {
      message.error(error.message);
    },
  });

  const handleSearch = (value: string) => {
    message.info(`搜索：${value}`);
  };

  const handleGatewayListClick = (id: number) => {
    setSelectedGatewayId(id);
  };

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
        <Flex className={styles.leftWrapper} vertical gap="small">
          <Input.Search
            placeholder="请输入网关名称"
            onSearch={handleSearch}
          />
          <List
            loading={requestGatewayListByPageLoading}
            pagination={{ position: 'bottom', align: 'center' }}
            dataSource={gatewayListByPage?.list}
            renderItem={(item) => (
              <List.Item
                className={classNames('gateway-item', { selected: selectedGatewayId === item.Gatewayid })}
                onClick={() => handleGatewayListClick(item.Gatewayid)}
              >
                <List.Item.Meta
                  title={item.Gatewayname}
                  description={
                    <div>
                      <Typography.Text type="secondary">sn：</Typography.Text>
                      <Typography.Text>{item.Gatewaysn}</Typography.Text>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Flex>
        <div className={styles.rightWrapper}>
          <Table
            loading={requestProgramListByGatewayIdLoading}
            dataSource={programListByGatewayId?.list}
          />
        </div>
      </Flex>
    </Modal>
  );
};
