import { Flex, Typography } from 'antd';
import { ReactNode } from 'react';

export interface BoxContainerProps {
  title: string | ReactNode;
  extra?: string | ReactNode;
  children: ReactNode;
  className?: string;
  size?: 'small' | 'middle';
}

export const BoxContainer = ({
  title,
  size = 'middle',
  extra,
  children,
  className,
}: BoxContainerProps) => {
  return (
    <Flex className={className} vertical gap="small">
      <Flex justify="space-between" align="center">
        <Typography.Title level={size === 'small' ? 5 : 4} style={{ margin: 0 }}>
          {title}
        </Typography.Title>
        {extra}
      </Flex>
      {children}
    </Flex>
  );
};
