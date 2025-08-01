import { createStyles } from 'antd-style';

export const reportListStyle = createStyles(({ css }) => {
  return {
    row: css`
      width: 100%;
      height: 100%;
      overflow: auto;
    `,
  };
});

export const modalStyle = createStyles((
  { css },
  props: {
    modalBackgroundPng: string;
    bodyHeight: number;
  },
) => {
  return {
    modalContent: css`
      background: url(${props.modalBackgroundPng}) no-repeat center center;
      // 背景图片拉伸填充容器
      background-size: 100% 100%;
    `,
    modalHeader: css`
      background: transparent !important;
    `,
    modalBody: css`
      height: ${props.bodyHeight}px;
      display: flex;
    `,
  };
});
