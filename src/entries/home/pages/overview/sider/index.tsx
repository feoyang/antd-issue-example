import dayjs from 'dayjs';
import { Card, Col, Flex, message, Row, Spin, Typography } from 'antd';
import { useRequest } from 'ahooks';
import rightPng from '../../../assets/overview-right.png';
import { BoxContainer } from '../../../../../components/BoxContainer';
import warningPng from '../../../assets/overview-warning.png';
import et0Png from '../../../assets/overview-sider-et0.png';
import humidityPng from '../../../assets/overview-sider-humidity.png';
import temperaturePng from '../../../assets/overview-sider-temperature.png';
import windSpeedPng from '../../../assets/overview-sider-wind-speed.png';
import windDirectionPng from '../../../assets/overview-sider-wind-direction.png';
import windRainfallPng from '../../../assets/overview-sider-wind-rainfall.png';
import solarRadiationPng from '../../../assets/overview-sider-solar-radiation.png';
import atmospherePressurePng from '../../../assets/overview-sider-atmosphere-pressure.png';
import absoluteHumidityPng from '../../../assets/overview-sider-absolute-humidity .png';
import saturatedHumidityPng from '../../../assets/overview-sider-saturated-humidity.png';
import humidityLossPng from '../../../assets/overview-sider-humidity-loss.png';
import { overviewSiderStyle } from '../style';
import { requestXLYKGatewayMeteorologySensorData } from '../../../../../services/requests/xlyk-device';
import { formatFloatNumber } from '../../../../../utils/float-number';

const getDeviceIcon: Record<string, string> = {
  '每日ET0': et0Png,
  '每时ET0': et0Png,
  '风速': windSpeedPng,
  '风向': windDirectionPng,
  '湿度': humidityPng,
  '温度': temperaturePng,
  '雨量': windRainfallPng,
  '太阳总辐射': solarRadiationPng,
  '大气压力': atmospherePressurePng,
  '绝对湿度': absoluteHumidityPng,
  '饱和湿度': saturatedHumidityPng,
  '湿度亏损': humidityLossPng,
};

export const Sider = () => {
  const { styles } = overviewSiderStyle();

  const topData = [
    {
      id: '1',
      value: 128,
      label: '参与农户',
    },
    {
      id: '2',
      value: 128,
      label: '亩耕地',
    },
    {
      id: '3',
      value: '95%',
      label: '智能覆盖',
    },
  ];

  const {
    data: meteorologySensorData,
    loading: requestMeteorologySensorDataLoading,
  } = useRequest(requestXLYKGatewayMeteorologySensorData, {
    onError: (err) => {
      message.error(err.message);
    },
  });

  return (
    <>
      <Flex className={styles.topImg} gap="middle">
        <img className="img" src={rightPng} alt="right" />
        <Flex
          className="content"
          vertical gap="small"
          justify="center"
        >
          <Flex vertical>
            <Typography.Title level={5} style={{ margin: 0 }}>
              村集体共建
            </Typography.Title>
            <Typography.Text type="secondary">
              携手共建美丽乡村，共享智慧农业成果
            </Typography.Text>
          </Flex>
          <Flex className="dataWrapper" justify="space-around" align="center">
            {
              topData.map(item => {
                return (
                  <Flex key={item.id} vertical align="center">
                    <Typography.Title level={3} className="value">
                      {item.value}
                    </Typography.Title>
                    <Typography.Text className="valueLabel">
                      {item.label}
                    </Typography.Text>
                  </Flex>
                );
              })
            }
          </Flex>
        </Flex>
      </Flex>
      <BoxContainer title="气象观测站" extra={dayjs().format('YYYY-MM-DD HH:mm:ss')} className={styles.weatherBox}>
        <Flex vertical gap="middle" className="weatherBoxContent">
          <Flex className={styles.warningBox} gap="middle" align="center">
            <img className="img" src={warningPng} alt="warning" />
            <Flex vertical>
              <Typography.Text strong className="title">
                高温预警
              </Typography.Text>
              <Typography.Text className="text">
                预计明日温度最高38℃，建议增加灌溉频次
              </Typography.Text>
            </Flex>
          </Flex>
          <Spin spinning={requestMeteorologySensorDataLoading}>
            <Row gutter={[8, 8]} style={{ flex: 1, overflow: 'auto' }}>
              {
                meteorologySensorData?.GatDeviceSensorList.map(item => {
                  return (
                    <Col span={8} key={item.Deviceid}>
                      <Card size="small">
                        <Flex vertical align="center">
                          <Flex vertical align="center">
                            <img
                              src={getDeviceIcon[item.Devicename]}
                              alt={item.Devicename}
                              className={styles.deviceIcon}
                            />
                            {item.unit}
                          </Flex>
                          <Flex vertical align="center">
                            <Typography.Title level={5} className={styles.deviceValue}>
                              {formatFloatNumber(item.Sensorrealtimedata)}
                            </Typography.Title>
                            <Typography.Text type="secondary">{item.Devicename}</Typography.Text>
                          </Flex>
                        </Flex>
                      </Card>
                    </Col>
                  );
                })
              }
            </Row>
          </Spin>
        </Flex>
      </BoxContainer>
    </>
  );
};
