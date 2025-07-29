import { Layout } from 'antd';
import { ReportNavigator } from './ReportNavigator';
import { layoutStyle } from './style';

const { Content } = Layout;

export interface ReportLayoutProps {
  children: React.ReactNode;
}

export const ReportLayout = ({
  children,
}: ReportLayoutProps) => {
  const { styles } = layoutStyle();

  return (
    <Layout className={styles.layoutWrapper}>
      <ReportNavigator />
      <Content className={styles.content}>
        {children}
      </Content>
    </Layout>
  );
};
