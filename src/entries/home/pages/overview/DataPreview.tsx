import { Flex, Typography } from 'antd';
import advertisementPng from '../../assets/overview-advertisement.png';
import evaporationPng from '../../assets/overview-evaporation.png';
import rainPng from '../../assets/overview-rain.png';
import { BoxContainer } from '../../components/BoxContainer';
import { advertisement, dataPreviewContainer } from './style';

export const DataPreview = () => {
  const dataPreviewItem = [
    {
      key: 'rain',
      title: '今日降雨量',
      value: 5.8,
      unit: 'mm',
      img: evaporationPng,
    },
    {
      key: 'evaporation',
      title: '实时蒸发量',
      value: 3.2,
      unit: 'mm',
      img: rainPng,
    },
  ];

  return (
    <Flex gap="middle">
      <img className={advertisement} src={advertisementPng} alt="advertisment" />
      <BoxContainer title="今日数据概览" className={dataPreviewContainer}>
        <Flex className="dataPreview" vertical gap="middle">
          {
            dataPreviewItem.map(item => {
              return (
                <Flex
                  className="dataBox"
                  key={item.key}
                  justify="space-between"
                  align="center"
                >
                  <Flex gap="middle" align="center">
                    <Flex className="imgWrapper" align="center" justify="center">
                      <img src={item.img} alt={item.title} className="img" />
                    </Flex>
                    <Typography.Title level={5} style={{ margin: 0 }}>{item.title}</Typography.Title>
                  </Flex>
                  <Flex align="flex-end" gap="small">
                    <Typography.Title level={3} style={{ margin: 0 }}>{item.value}</Typography.Title>
                    <Typography.Text type="secondary">{item.unit}</Typography.Text>
                  </Flex>
                </Flex>
              );
            })
          }
        </Flex>
      </BoxContainer>
    </Flex>
  );
};
