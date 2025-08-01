import {
  Button,
  Card,
  Col,
  Dropdown,
  Flex,
  MenuProps,
  message,
  Pagination,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { DownOutlined, PlusOutlined, ScanOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { LeftWrapper, RightWrapper } from '../../layout/style';
import { BoxContainer } from '../../../../components/BoxContainer';
import { requestGatewayListByPage } from '../../../../services/requests/xlyk-device';
import waterFertilizerPng from '../../assets/device-water-fertilizer.png';
import waterFertilizeIconPng from '../../assets/device-water-fertilizer-icon.png';
import { Sider } from './sider';
import { deviceStyle } from './style';

const { Text } = Typography;

const items: MenuProps['items'] = [
  {
    label: '莲花山莲花镇莲花村智慧农业项目',
    key: '1',
  },
  {
    label: '花果山花果镇花果村智慧农业项目',
    key: '2',
  },
];

export const Device = () => {
  const { styles } = deviceStyle();
  const [project, setProject] = useState<string>('');

  const { data: gatewayListByPage, loading: requestGatewayListByPageLoading } = useRequest(requestGatewayListByPage, {
    onError: (error) => {
      message.error(error.message);
    },
  });


  const handleMenuClick: MenuProps['onClick'] = (info) => {
    const selectedItem = items?.find(item => item?.key === info.key);
    if (selectedItem && 'label' in selectedItem) {
      setProject(selectedItem.label as string);
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
    selectable: true,
    defaultSelectedKeys: ['1'],
  };

  useEffect(() => {
    // 使用类型断言来安全地访问label属性
    const firstItem = items[0] as { label: string; key: string };
    setProject(firstItem?.label || '');
  }, []);

  return (
    <>
      <LeftWrapper>
        <Flex justify="space-between" align="center" className={styles.topContainer}>
          <Flex align="center">
            <Dropdown menu={menuProps} trigger={['click']}>
              <Button size="large" type="primary">
                <Space>
                  项目
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            <Text className="text-container">{project}</Text>
          </Flex>
          <Space>
            <Button icon={<PlusOutlined /> } type="primary" size="large">
              增加新设备
            </Button>
            <Button icon={<ScanOutlined />} type="primary" size="large" />
          </Space>
        </Flex>
        <BoxContainer
          title="我的设备"
          className={styles.deviceContainer}
        >
          <Spin spinning={requestGatewayListByPageLoading}>
            <Row gutter={[16, 16]}>
              {
                gatewayListByPage?.list?.map((item) => (
                  <Col span={8} key={item.Gatewayid}>
                    <Card hoverable size="small" className={styles.deviceCard}>
                      <Flex align="center" gap="middle" className={styles.deviceWrapper}>
                        <img src={waterFertilizerPng} alt="water-fertilizer" className={styles.deviceImg} />
                        <Flex vertical justify="space-between" className={styles.deviceContentWrapper}>
                          <Flex vertical>
                            <Flex align="center" gap="small">
                              <img src={waterFertilizeIconPng} alt="waterFertilizeIcon" className={styles.deviceIcon} />
                              <Typography.Title level={5} style={{ margin: 0 }}>水肥一体机</Typography.Title>
                            </Flex>
                            <div>
                              <Typography.Text type="secondary">网关：</Typography.Text>
                              <Typography.Text>{item.Gatewayname}</Typography.Text>
                            </div>
                          </Flex>
                          <div><Tag color={item.Isonline ? 'success' : 'red'}>{item.Isonline ? '在线' : '离线'}</Tag></div>
                        </Flex>
                      </Flex>
                    </Card>
                  </Col>
                ))
              }
            </Row>
          </Spin>
          <div style={{ margin: 'auto' }}>
            <Pagination
              total={gatewayListByPage?.total}
              pageSize={12}
              current={1}
            />
          </div>
        </BoxContainer>
      </LeftWrapper>
      <RightWrapper>
        <Sider />
      </RightWrapper>
    </>

  );
};
