import { Button, Card, Col, Dropdown, Flex, MenuProps, Row, Space, theme, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { DownOutlined, PlusOutlined, ScanOutlined } from '@ant-design/icons';
import { px2rem } from '../../../../utils/px-to-rem';
import { LeftWrapper, RightWrapper } from '../../layout/style';
import { BoxContainer } from '../../components/BoxContainer';
import { topContainer } from './style';
import { Sider } from './Sider';

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
  const { token } = theme.useToken();
  const [project, setProject] = useState<string>('');

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
        <Flex justify="space-between" align="center" className={topContainer}>
          <Flex align="center">
            <Dropdown menu={menuProps} trigger={['click']}>
              <Button>
                <Space>
                  项目
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            <Text
              className="text-container"
              style={{
                height: px2rem(token.controlHeight),
                borderRadius: px2rem(token.borderRadius),
              }}
            >
              {project}
            </Text>
          </Flex>
          <Space>
            <Button icon={<PlusOutlined />}>增加新设备</Button>
            <Button icon={<ScanOutlined />} />
          </Space>
        </Flex>
        <BoxContainer title="我的设备">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card hoverable>
                <div>123</div>
              </Card>
            </Col>
            <Col span={8}>
              <Card hoverable>
                <div>123</div>
              </Card>
            </Col>
            <Col span={8}>
              <Card hoverable>
                <div>123</div>
              </Card>
            </Col>
          </Row>
        </BoxContainer>
      </LeftWrapper>
      <RightWrapper>
        <Sider />
      </RightWrapper>
    </>

  );
};
