import { Flex, Typography } from 'antd';
import rightPng1 from '../../assets/device-right.png';
import rightPng2 from '../../assets/device-right2.png';
import { topImg } from './style';

export const Sider = () => {
  return (
    <>
      <div className={topImg}>
        <img src={rightPng1} alt="right" className="rightImg1" />
        <Flex align="center" gap="small" className="cover">
          <img src={rightPng2} alt="right" className="rightImg2" />
          <Typography.Title level={4} style={{ margin: 0 }}>待办任务</Typography.Title>
        </Flex>
      </div>
      <Flex vertical gap="middle">
        <></>
      </Flex>
    </>
  );

};
