import { Button, Card, Col, Flex, Row, Space, Typography } from 'antd';
import { DownloadOutlined, ShareAltOutlined } from '@ant-design/icons';
import { detailContentStyle, aiResultColStyle, rightStyle } from '../style';
import { items } from '..';
import fieldDetailPng from '../../../assets/field-report/detail.png';
import fieldDetailBackgroundPng from '../../../assets/field-report/detail-background.png';
import resultGrowthIcon from '../../../assets/field-report/result-icon-growth.png';
import resultBuggerIcon from '../../../assets/field-report/result-icon-bugger.png';
import resultWaterIcon from '../../../assets/field-report/result-icon-water.png';
import analysisIconWrapperPng from '../../../assets/field-report/analysis-icon-wrapper.png';
import analysisIconSoilPng from '../../../assets/field-report/analysis-icon-soil.png';
import analysisIconPlantPng from '../../../assets/field-report/analysis-icon-plant.png';
import analysisIconSunPng from '../../../assets/field-report/analysis-icon-sun.png';
import suggestionIconManagePng from '../../../assets/field-report/suggestion-icon-manage.png';
import suggestionIconWaterPng from '../../../assets/field-report/suggestion-icon-water.png';
import suggestionIconMonitorPng from '../../../assets/field-report/suggestion-icon-monitor.png';

import { BoxContainer } from '../../../../../components/BoxContainer';
import { SharedReportModal } from '../../../components/SharedReportModal';

export const aiResult = [
  {
    id: '1',
    title: '作物长势',
    description: '作物生长状况良',
    degree: '优秀',
    icon: resultGrowthIcon,
    color: '#87C55D',
  },
  {
    id: '2',
    title: '水分状态',
    description: '土壤湿度适宜',
    degree: '良好',
    icon: resultWaterIcon,
    color: '#7FCDF0',
  },
  {
    id: '3',
    title: '病虫害状态检测',
    description: '未发现异常',
    degree: '无异常',
    icon: resultBuggerIcon,
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
    icon: analysisIconPlantPng,
    background: 'gradient(107deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.08) 92%);',
  },
  {
    id: '2',
    title: '土壤状况',
    description: '土壤表面湿润度良好，无明显积水或干早迹象。根据图像分析土壤肥力充足，有机质含量较高。',
    icon: analysisIconSoilPng,
    background: 'gradient(107deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.08) 92%);',
  },
  {
    id: '3',
    title: '光照条件',
    description: '光照充足，叶片展开良好。未发现因光照不足导致的徒长或黄化现象，整体光合作用效率较高。',
    icon: analysisIconSunPng,
    background: 'gradient(107deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.08) 92%);',
  },
];

export const suggestions = [
  {
    id: '1',
    title: '继续常规管理',
    description: '保持现有的濯溉和施肥计划，作物生长状况良好无需调整。',
    icon: suggestionIconManagePng,
    background: 'linear-gradient(107deg, rgba(72, 216, 125, 0.2) 0%, rgba(82, 196, 101, 0.02) 92%);',
  },
  {
    id: '2',
    title: '适量补水',
    description: '根据天气预报，未来3天可能较为干燥，建议适量增加灌溉频次。',
    icon: suggestionIconWaterPng,
    background: 'linear-gradient(107deg, rgba(154, 215, 243, 0.16) 0%, rgba(103, 220, 224, 0.04) 92%);',
  },
  {
    id: '3',
    title: '持续监测',
    description: '建议每2-3天进行一次AI巡田检测，及时发现潜在问题。',
    icon: suggestionIconMonitorPng,
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
      bodyHeight={540}
      backgroundImg={fieldDetailBackgroundPng}
    >
      <Flex gap="large" flex={1}>
        <Flex className={detailContentStyles.leftWrapper}>
          <Flex vertical gap="middle">
            <Space direction="vertical">
              <img src={fieldDetailPng} alt="field-preview" className={detailContentStyles.fieldPreviewImg} />
              <div>
                <Typography.Text type="secondary">拍摄时间：</Typography.Text>
                <Typography.Text>{items.find(item => item.id === id)?.time}</Typography.Text>
              </div>
            </Space>
            <BoxContainer title="AI诊断结果" className={detailContentStyles.aiResultBoxContainer}>
              <Row className={detailContentStyles.aiResultRow} gutter={[12, 0]}>
                {
                  aiResult.map((item, index) => {
                    const { styles: aiResultColStyles } = aiResultColStyle({ color: item.color, index: index });
                    return (
                      <Col span={12} key={item.id} className={aiResultColStyles.aiResultCol}>
                        <Card
                          title={
                            item.icon ?
                              <Flex align="center" justify="center" className={aiResultColStyles.iconWrapper}>
                                <img src={item.icon} alt={item.title} className={aiResultColStyles.icon} />
                              </Flex>
                              :
                              <Typography.Title level={5} style={{ margin: 0 }}>{item.title}</Typography.Title>
                          }
                          extra={
                            <Flex justify="center" align="center" className={aiResultColStyles.degreeWrapper}>
                              <Typography.Text>{item.degree}</Typography.Text>
                            </Flex>
                          }
                          size="small"
                          variant="borderless"
                          className={aiResultColStyles.aiResultColCard}
                        >
                          <Flex vertical>
                            {
                              item.icon &&
                             <Typography.Title level={5} style={{ margin: 0 }}>{item.title}</Typography.Title>
                            }
                            <Typography.Text>{item.description}</Typography.Text>
                          </Flex>
                        </Card>
                      </Col>
                    );
                  })
                }
              </Row>
            </BoxContainer>
          </Flex>
        </Flex>
        <Flex vertical justify="space-between" style={{ flex: 1 }}>
          <Flex vertical gap="large">
            <BoxContainer title="详细分析">
              <Row gutter={[16, 0]}>
                {
                  analysis.map(item => {
                    const { styles: rightStyles } = rightStyle(
                      { background: item.background, analysisIconWrapperBackgroundImg: analysisIconWrapperPng },
                    );
                    return (
                      <Col span={8} key={item.id} className={rightStyles.analysisCol}>
                        <Card
                          title={
                            <Space>
                              <Flex align="center" className={rightStyles.analysisIconWrapper}>
                                <img src={item.icon} alt="analysis-icon" className={rightStyles.analysisIcon} />
                              </Flex>
                              <Typography.Title level={5} style={{ margin: 0 }}>{item.title}</Typography.Title>
                            </Space>
                          }
                          variant="borderless"
                          className={rightStyles.analysisColCard}
                        >
                          <Typography.Text>{item.description}</Typography.Text>
                        </Card>
                      </Col>
                    );
                  })
                }
              </Row>
            </BoxContainer>
            <BoxContainer title="管理建议">
              <Row gutter={[16, 0]}>
                {
                  suggestions.map(item => {
                    const { styles: rightStyles } = rightStyle({ background: item.background });
                    return (
                      <Col span={8} key={item.id} className={rightStyles.suggestionsCol}>
                        <Card
                          title={
                            <Space>
                              <Flex justify="center" align="center" className={rightStyles.suggestionIconWrapper}>
                                <img src={item.icon} alt="suggestion-icon" className={rightStyles.suggestionIcon} />
                              </Flex>
                              <Typography.Title level={5} style={{ margin: 0 }}>{item.title}</Typography.Title>
                            </Space>
                          }
                          variant="borderless"
                          className={rightStyles.suggestionsColCard}
                        >
                          <Typography.Text>{item.description}</Typography.Text>
                        </Card>
                      </Col>
                    );
                  })
                }
              </Row>
            </BoxContainer>
          </Flex>
          <Flex justify="flex-end" style={{ width: '100%' }}>
            <Space>
              <Button icon={<ShareAltOutlined />} size="large">分享报告</Button>
              <Button icon={<DownloadOutlined />} size="large">导出PDF</Button>
            </Space>
          </Flex>
        </Flex>
      </Flex>
    </SharedReportModal>
  );
};
