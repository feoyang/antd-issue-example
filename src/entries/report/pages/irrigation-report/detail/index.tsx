import { Badge, Col, Flex, Input, Row, Space, Typography } from 'antd';
import { detailContentStyle } from '../style';
import { items } from '..';
import detailBackgroundPng from '../../../assets/irrigation-report/detail-background.png';
import { BoxContainer } from '../../../../../components/BoxContainer';
import { SharedReportModal } from '../../../components/SharedReportModal';

export const suggestionContent = '连续3日蒸发量超5mm，建议今晨灌溉7.6mm(约5.68m*/亩)，分两次执行。上午 6-8 点灌溉 4.2mm，下午 16-18 点补充 3.4mm。';

export const aiResult = [
  {
    id: '1',
    title: '作物长势',
    description: '作物生长状况良',
    degree: '优秀',
    icon: detailBackgroundPng,
    color: '#87C55D',
  },
  {
    id: '2',
    title: '水分状态',
    description: '土壤湿度适宜',
    degree: '良好',
    icon: detailBackgroundPng,
    color: '#7FCDF0',
  },
  {
    id: '3',
    title: '病虫害状态检测',
    description: '未发现异常',
    degree: '无异常',
    icon: detailBackgroundPng,
    color: '#FFCC00',
  },
  {
    id: '4',
    title: '综合评估',
    description: '作物生长状况良好，无需特殊处理。建议继续按照常规管理方案进行养护。',
    degree: '正常',
    icon: undefined,
    color: '#fff',
  },
];

export const analysis = [
  {
    id: '1',
    title: '植株密度',
    description: '当前植株密度为 85%，符合该生长阶段的标准要求。叶片颜色呈健康的深绿色，茎秆粗壮，无倒伏现象。',
    icon: detailBackgroundPng,
    background: 'gradient(107deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.08) 92%);',
  },
  {
    id: '2',
    title: '土壤状况',
    description: '土壤表面湿润度良好，无明显积水或干早迹象。根据图像分析土壤肥力充足，有机质含量较高。',
    icon: detailBackgroundPng,
    background: 'gradient(107deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.08) 92%);',
  },
  {
    id: '3',
    title: '光照条件',
    description: '光照充足，叶片展开良好。未发现因光照不足导致的徒长或黄化现象，整体光合作用效率较高。',
    icon: detailBackgroundPng,
    background: 'gradient(107deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.08) 92%);',
  },
];

export const suggestions = [
  {
    id: '1',
    title: '继续常规管理',
    description: '保持现有的濯溉和施肥计划，作物生长状况良好无需调整。',
    icon: detailBackgroundPng,
    background: 'linear-gradient(107deg, rgba(72, 216, 125, 0.2) 0%, rgba(82, 196, 101, 0.02) 92%);',
  },
  {
    id: '2',
    title: '适量补水',
    description: '根据天气预报，未来3天可能较为干燥，建议适量增加灌溉频次。',
    icon: detailBackgroundPng,
    background: 'linear-gradient(107deg, rgba(154, 215, 243, 0.16) 0%, rgba(103, 220, 224, 0.04) 92%);',
  },
  {
    id: '3',
    title: '持续监测',
    description: '建议每2-3天进行一次AI巡田检测，及时发现潜在问题。',
    icon: detailBackgroundPng,
    background: 'linear-gradient(107deg, rgba(255, 204, 0, 0.2) 0%, rgba(230, 208, 70, 0.02) 92%);',
  },
];

export interface DetailProps {
  id: string | undefined;
  open: boolean;
  onClose: () => void;
}

export const Detail = ({
  id,
  open,
  onClose,
}: DetailProps) => {
  const { styles: detailContentStyles } = detailContentStyle();

  return (
    <SharedReportModal
      open={open}
      onClose={onClose}
      title={items.find(item => item.id === id)?.title || ''}
      bodyHeight={630}
      backgroundImg={detailBackgroundPng}
    >
      <Flex vertical gap="middle" flex={1}>
        <BoxContainer title="核心建议" size="small" className={detailContentStyles.suggestionContainer}>
          <Flex vertical className="content">
            <Input.TextArea
              value={suggestionContent}
              variant="borderless"
              className="textArea"
              readOnly
              maxLength={200}
            />
            <Flex justify="flex-end">
              <Space>
                <Badge color="#5ABFEC" />
                <Typography.Text>适合短信推送</Typography.Text>
              </Space>
            </Flex>
          </Flex>
        </BoxContainer>
        <Row>
          <Col span={8}>
            <BoxContainer title="数据分析" size="small">
              123
            </BoxContainer>
          </Col>
          <Col span={8}>
            <BoxContainer title="灌溉建议详情" size="small">
              123
            </BoxContainer>
          </Col>
          <Col span={8}>
            <BoxContainer title="注意事项" size="small">
              123
            </BoxContainer>
          </Col>
        </Row>
      </Flex>
    </SharedReportModal>
  );
};
