import { styled } from '@linaria/react';
import { createStyles } from 'antd-style';
import { px2rem } from '../../../utils/px-to-rem';

// 定义布局常量
const HEADER_TOP = 20;
const HEADER_LEFT = 30;
const HEADER_HEIGHT = 55;
const RIGHT_WRAPPER_WIDTH = 360;

export const layoutStyle = createStyles(({ css }) => {
  return {
    layoutWrapper: css`
      width: 100%;
      height: 100%;
      position: relative;
      background-color: #fff;
    `,

    header: css`
      position: absolute;
      top: ${px2rem(HEADER_TOP)};
      left: ${px2rem(HEADER_LEFT)};
      right: calc(${px2rem(RIGHT_WRAPPER_WIDTH)} + ${px2rem(HEADER_LEFT)});
      z-index: 10;
      height: ${px2rem(HEADER_HEIGHT)};
      display: flex;
      align-items: center;
      padding: 0;

      .segmented {
        flex: 1;
      }
    `,

    content: css`
      width: 100%;
      height: 100%;
      display: flex;
    `,
  };
});

export const LeftWrapper = styled.div`
  flex: 1;
  padding: ${HEADER_TOP}px ${HEADER_LEFT}px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &::before {
    content: '';
    height: ${HEADER_HEIGHT}px;
    width: 100%;
    flex-shrink: 0;
  }
`;

export const RightWrapper = styled.div`
  width: ${RIGHT_WRAPPER_WIDTH}px;
  height: 100%;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f1f3f3;
`;
