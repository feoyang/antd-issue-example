import { ReactNode } from 'react';
import { Flex } from 'antd';
import { wrapperBox } from './style';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex className={wrapperBox} justify="center" align="center">
      {children}
    </Flex>
  );
};
