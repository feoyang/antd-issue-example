import { Card, Flex, Typography } from 'antd';
import { useState } from 'react';
import rightPng1 from '../../../assets/device-right.png';
import rightPng2 from '../../../assets/device-right2.png';
import { cardStyle, deviceSiderStyle } from '../style';
import { CreateMissionModal } from './CreateMissionModal';

const items = [
  {
    id: '1',
    color: 'linear-gradient(93deg, rgba(101, 200, 207, 0.2) -5%, rgba(82, 196, 192, 0.02) 99%)',
    extraColor: 'rgba(154, 215, 243, 0.4)',
  },
  {
    id: '2',
    color: 'linear-gradient(93deg, rgba(111, 192, 109, 0.2) -5%, rgba(82, 196, 192, 0.02) 99%)',
    extraColor: 'rgba(111, 192, 109, 0.4)',
  },
];

const missions = [
  {
    id: '1',
    title: '123',
    time: '123',
    gatewayName: '123',
  },
  {
    id: '2',
    title: '123',
    time: '123',
    gatewayName: '123',
  },
];

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
          <Typography.Link onClick={handleCreateMissionButtonClick}>待办任务</Typography.Link>
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
                    <Typography.Text>已完成</Typography.Text>
                  </Flex>
                }
              >
                <Flex vertical gap="middle">
                  {
                    missions.map(mission => (
                      <Flex vertical gap="small" key={mission.id}>
                        <Typography.Title level={5} style={{ margin: 0 }}>{mission.title}</Typography.Title>
                        <Typography.Text>{mission.time}</Typography.Text>
                        <Typography.Text>{mission.gatewayName}</Typography.Text>
                      </Flex>
                    ))
                  }
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
