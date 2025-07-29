import { LeftOutlined } from '@ant-design/icons';
import { Button, Layout, Space, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import { layoutStyle } from './style';

const { Header } = Layout;

const navigatorOptions: Record<string, string> = {
  field: '寻田报告',
  irrigation: '灌溉报告',
};

export const ReportNavigator = () => {
  const { styles } = layoutStyle();
  const navigate = useNavigate();
  const location = useLocation();
  const [,, type] = location.pathname.split('/');

  const handleButtonClick = () => {
    navigate('/home/overview');
  };

  return (
    <Header className={styles.header}>
      <Space size="small">
        <Button
          color="default"
          variant="link"
          icon={<LeftOutlined />}
          onClick={handleButtonClick}
        />
        <Typography.Title level={4} style={{ margin: 0 }}>
          {navigatorOptions[type]}
        </Typography.Title>
      </Space>
    </Header>
  );
};
