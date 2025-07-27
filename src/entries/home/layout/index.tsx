import { Layout } from 'antd';
import { ReactNode } from 'react';
import { content, layoutWrapper } from './style';
import { Navigator } from './Navigator';

const { Content } = Layout;

export interface LayoutProps {
  children: ReactNode;
}

export const HomeLayout = ({ children }: LayoutProps) => {
  return (
    <Layout className={layoutWrapper}>
      <Navigator />
      <Content className={content}>
        {children}
      </Content>
    </Layout>
  );
};
