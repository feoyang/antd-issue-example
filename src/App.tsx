import { XProvider } from '@ant-design/x';
import zhCN from 'antd/locale/zh_CN';
import { px2remTransformer, StyleProvider } from '@ant-design/cssinjs';
import { Col, Flex, Row } from 'antd';

// 现在适配ipad air，1180/10 = 118
const px2rem = px2remTransformer({
  rootValue: 118,
});

export const App = () => {

  return (
    <StyleProvider
      transformers={[px2rem]}
    >
      <XProvider
        locale={zhCN}
      >
        <Flex vertical>
          <Row gutter={16}>
            <Col span={8}>
              123
            </Col>
            <Col span={8}>
              456
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              123
            </Col>
            <Col span={8}>
              456
            </Col>
          </Row>
        </Flex>
      </XProvider>
    </StyleProvider>
  );
};
