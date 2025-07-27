import { Flex, Layout, Segmented, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import { useUser } from '../../../model/account/hooks';
import deviceIcon from '../assets/segmented-device.png';
import controlIcon from '../assets/segmented-control.png';
import mineIcon from '../assets/segmented-mine.png';
import overviewIcon from '../assets/segmented-overview.png';
import { header } from './style';

const { Header } = Layout;

export const Navigator = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useUser();

  const segmentedOptions = [
    {
      label:
        <Flex gap="small" align="center">
          <img src={overviewIcon} alt="overviewIcon" className="segmentedIcon" />
          首页
        </Flex>,
      value: 'overview',
    },
    {
      label:
        <Flex gap="small" align="center">
          <img src={deviceIcon} alt="deviceIcon" className="segmentedIcon" />
          设备
        </Flex>,
      value: 'device',
    },
    {
      label:
        <Flex gap="small" align="center">
          <img src={controlIcon} alt="controlIcon" className="segmentedIcon" />
          智控
        </Flex>,
      value: 'chat',
    },
    {
      label:
        <Flex gap="small" align="center">
          <img src={mineIcon} alt="mineIcon" className="segmentedIcon" />
          我的
        </Flex>,
      value: 'mine',
    },
  ];

  return (
    <Header className={header}>
      <Flex align="center" gap="large" style={{ width: '100%' }}>
        <Flex vertical align="start">
          <Typography.Title level={4} style={{ margin: 0 }}>Hello，{user?.name}</Typography.Title>
          <Typography.Text type="secondary">欢迎来到智慧农业系统！</Typography.Text>
        </Flex>
        <Segmented
          className="segmented"
          block
          size="large"
          options={segmentedOptions}
          defaultValue={pathname.split('/').pop()}
          onChange={(value) => {
            navigate(`/home/${value}`);
          }}
        />
      </Flex>
    </Header>
  );
};
