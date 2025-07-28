import dayjs from 'dayjs';
import { Card, Col, Flex, Row, Typography } from 'antd';
import rightPng from '../../../assets/overview-right.png';
import { BoxContainer } from '../../../components/BoxContainer';
import warningPng from '../../../assets/overview-warning.png';
import { overviewSiderStyle } from '../style';

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
          <Flex className="data" justify="space-around" align="center">
            {
              topData.map(item => {
                return (
                  <Flex key={item.id} vertical align="center">
                    <Typography.Title level={3} style={{ margin: 0 }}>
                      {item.value}
                    </Typography.Title>
                    <Typography.Text type="secondary">
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
              <div className="title">
                高温预警
              </div>
              <div className="text">
                预计明日温度最高38℃，建议增加灌溉频次
              </div>
            </Flex>
          </Flex>
          <Row gutter={[8, 8]} style={{ flex: 1, overflow: 'auto' }}>
            <Col span={8}>
              <Card>
                123
                123
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                123
                123
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                123
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                123
                123
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                123
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                123
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                123
                123
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                123
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                123
                123
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                123
              </Card>
            </Col><Col span={8}>
              <Card>
                123
                123
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                123
              </Card>
            </Col><Col span={8}>
              <Card>
                123
                123
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                123
              </Card>
            </Col><Col span={8}>
              <Card>
                123
                123
              </Card>
            </Col>
          </Row>
        </Flex>
      </BoxContainer>
    </>
  );
};
