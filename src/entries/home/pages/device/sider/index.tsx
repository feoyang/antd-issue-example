import { Button, Card, Divider, Flex, Typography } from 'antd';
import { useState } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import rightPng1 from '../../../assets/device-right.png';
import rightPng2 from '../../../assets/device-right2.png';
import { cardStyle, deviceSiderStyle } from '../style';
import { CreateMissionModal } from './CreateMissionModal';

const items = [
  {
    id: '1',
    color: 'linear-gradient(93deg, rgba(101, 200, 207, 0.2) -5%, rgba(82, 196, 192, 0.02) 99%)',
    extraColor: 'rgba(154, 215, 243, 0.4)',
    state: '进行中',
  },
  {
    id: '2',
    color: 'linear-gradient(93deg, rgba(111, 192, 109, 0.2) -5%, rgba(82, 196, 192, 0.02) 99%)',
    extraColor: 'rgba(111, 192, 109, 0.4)',
    state: '已完成',
  },
];

// const missions = [
//   {
//     id: '1',
//     title: 'A区域定时灌溉',
//     time: '07-24 17:00-18:00',
//     gatewayName: '水肥一体机A',
//   },
//   {
//     id: '2',
//     title: 'B区域定时灌溉',
//     time: '07-24 17:00-18:00',
//     gatewayName: '水肥一体机A',
//   },
// ];

export const Sider = () => {
  const { styles } = deviceSiderStyle();
  const [createMissionModalOpen, setCreateMissionModalOpen] = useState(false);

  const handleCreateMissionButtonClick = () => {
    setCreateMissionModalOpen(true);
  };

  return (
    <>
      <div className={styles.topImg}>
        <img src={rightPng1} alt="right" className="rightImg1" />
        <Flex align="center" gap="small" className="cover">
          <img src={rightPng2} alt="right" className="rightImg2" />
          <Button onClick={handleCreateMissionButtonClick} type="text" size="large"
            style={{ padding: 0 }}>
            <Typography.Title level={3} style={{ margin: 0 }}>待办任务</Typography.Title>
            <ArrowRightOutlined />
          </Button>
        </Flex>
      </div>
      <Flex vertical gap="middle">
        {
          items.map(item => {
            const { styles: cardStyles } = cardStyle({ color: item.color, extraColor: item.extraColor });
            return (
              <Card
                key={item.id}
                title="设备任务列表"
                size="small"
                className={cardStyles.card}
                extra={
                  <Flex justify="center" align="center" className={cardStyles.headExtra}>
                    <Typography.Text>{item.state}</Typography.Text>
                  </Flex>
                }
              >
                <Flex vertical gap="small">
                  <Typography.Title level={5} style={{ margin: 0 }}>A区域定时灌溉</Typography.Title>
                  <Flex>
                    <Typography.Text type="secondary">工作时间：</Typography.Text>
                    <Typography.Text>07-24 17:00-18:00</Typography.Text>
                  </Flex>
                  <Flex>
                    <Typography.Text type="secondary">设备名称：</Typography.Text>
                    <Typography.Text>水肥一体机A</Typography.Text>
                  </Flex>
                </Flex>
                <Divider size="small" />
                <Flex vertical gap="small">
                  <Typography.Title level={5} style={{ margin: 0 }}>B区域定时灌溉</Typography.Title>
                  <Flex>
                    <Typography.Text type="secondary">工作时间：</Typography.Text>
                    <Typography.Text>07-24 17:00-18:00</Typography.Text>
                  </Flex>
                  <Flex>
                    <Typography.Text type="secondary">设备名称：</Typography.Text>
                    <Typography.Text>水肥一体机A</Typography.Text>
                  </Flex>
                </Flex>
              </Card>
            );
          })
        }
        <CreateMissionModal open={createMissionModalOpen} onCancel={() => setCreateMissionModalOpen(false)} />
      </Flex>
    </>
  );

};
