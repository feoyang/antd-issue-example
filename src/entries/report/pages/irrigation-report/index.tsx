import { Card, Col, Flex, Typography } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { SECOND_TIME_FORMAT } from '../../../../utils/time-format';
import fieldPreviewPng from '../../assets/field-report/preview.png';
import { SharedListContainer } from '../../components/SharedListContainer';
import { Detail } from './detail';
import { irrigationCardStyle } from './style';

export const items: { id: string; title: string; time: string; comment: string }[] = [];
for (let i = 0; i < 45; i++) {
  items.push({
    id: i.toString(),
    title: 'A区第3块田巡田报告',
    time: dayjs().format(SECOND_TIME_FORMAT),
    comment: '作物生长状况良好，无需特殊处理。建议继续按照常规管理方案进行养护。',
  });
}

export const IrrigationReport = () => {
  const { styles } = irrigationCardStyle();
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  // 用ref是因为detail需要立马更新，因为它是和detailModalOpen同时更新的。
  // 而且useState一般用于更新页面，这里并不需要更新页面，而是纯记录数据
  const detailIdRef = useRef<string | undefined>(undefined);

  const handleCardClick = (id: string) => {
    detailIdRef.current = id;
    setDetailModalOpen(true);
  };

  return (
    <SharedListContainer>
      {
        items.map(item => (
          <Col span={8} key={item.id}>
            <Card hoverable className={styles.card} onClick={() => handleCardClick(item.id)}>
              <Flex justify="space-between" align="center" gap="middle">
                <img src={fieldPreviewPng} alt="field-preview" className={styles.previewImg} />
                <Flex vertical justify="space-between">
                  <Typography.Title level={5} style={{ margin: 0 }}>{item.title}</Typography.Title>
                  <Flex vertical>
                    <div>
                      <Typography.Text type="secondary" className={styles.text}>生长时间：</Typography.Text>
                      <Typography.Text className={styles.text}>{item.time}</Typography.Text>
                    </div>
                    <div>
                      <Typography.Paragraph ellipsis={{ rows: 3 }} className={styles.text}>
                        <Typography.Text type="secondary" className={styles.text}>综合评估：</Typography.Text>
                        {item.comment}
                      </Typography.Paragraph>
                    </div>
                  </Flex>
                </Flex>
              </Flex>
            </Card>
          </Col>
        ))
      }
      <Detail
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        id={detailIdRef.current}
      />
    </SharedListContainer>
  );
};
