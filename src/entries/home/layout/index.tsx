import { Layout } from 'antd';
import { ReactNode } from 'react';
import { Navigator } from './Navigator';
import { layoutStyle } from './style';

const { Content } = Layout;

export interface LayoutProps {
  children: ReactNode;
}

export const HomeLayout = ({ children }: LayoutProps) => {
  const { styles } = layoutStyle();

  return (
    <Layout className={styles.layoutWrapper}>
      <Navigator />
      <Content className={styles.content}>
        {children}
      </Content>
    </Layout>
  );
};
