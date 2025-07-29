import { Flex, Typography, Modal, List, message, Input, Table, TableProps, Space, Tag } from 'antd';
import { useRequest } from 'ahooks';
import classNames from 'classnames';
import { useState } from 'react';
import { createMissionModalStyle } from '../style';
import {
  requestGatewayListByPage,
  requestProgramListByGatewayId,
  RequestProgramListByGatewayIdData,
} from '../../../../../services/requests/xlyk-device';

const columns: TableProps<RequestProgramListByGatewayIdData>['columns'] = [
  {
    title: '名称',
    dataIndex: 'programName',
    key: 'programName',
  },
  {
    title: '同步状态',
    dataIndex: 'syncFlag',
    key: 'syncFlag',
    render: (flag: number) => (
      <Tag color={flag === 0 ? 'orange' : flag === 1 ? 'blue' : 'green'}>
        {flag === 0 ? '待同步' : flag === 1 ? '同步中' : '同步成功'}
      </Tag>
    ),
  },
  {
    title: '运行状态',
    dataIndex: 'runStatus',
    key: 'runStatus',
    render: (status: number) => (
      <Tag color={status === 0 ? 'orange' : status === 1 ? 'blue' : 'green'}>
        {status === 0 ? '未运行' : status === 1 ? '正在运行' : '暂停'}
      </Tag>
    ),
  },
  {
    title: '运行总时长',
    key: 'runTotalTimes',
    dataIndex: 'runTotalTimes',
    render: (times: number) => <Typography.Text>{times}秒</Typography.Text>,
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>查看</a>
        <a>删除</a>
      </Space>
    ),
  },
];


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
    run: runRequestProgramListByGatewayId,
  } = useRequest(requestProgramListByGatewayId, {
    manual: true,
    onError: (error) => {
      message.error(error.message);
    },
  });

  const handleSearch = (value: string) => {
    message.info(`搜索：${value}`);
  };

  const handleGatewayListClick = (id: number) => {
    // 更新列表选中状态
    setSelectedGatewayId(id);
    runRequestProgramListByGatewayId(id);
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
          <Table<RequestProgramListByGatewayIdData>
            loading={requestProgramListByGatewayIdLoading}
            dataSource={programListByGatewayId?.list}
            columns={columns}
          />
        </div>
      </Flex>
    </Modal>
  );
};
