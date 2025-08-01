import { SearchOutlined } from '@ant-design/icons';
import { Flex, Space, DatePicker, Button, Pagination, Row } from 'antd';
import { ReactNode } from 'react';
import { reportListStyle } from './style';

export interface SharedListContainerProps {
  children: ReactNode;
}

export const SharedListContainer = ({
  children,
}: SharedListContainerProps) => {
  const { styles } = reportListStyle();

  return (
    <Flex vertical gap="middle" style={{ width: '100%', height: '100%' }}>
      <Flex justify="space-between">
        <Space>
          <DatePicker />
          <Button icon={<SearchOutlined />} />
        </Space>
        <Pagination
          defaultCurrent={1}
          total={50}
          pageSize={15}
        />
      </Flex>
      <Row gutter={[16, 16]} className={styles.row}>
        {children}
      </Row>
    </Flex>
  );
};
