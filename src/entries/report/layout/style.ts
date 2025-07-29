import { createStyles } from 'antd-style';

export const layoutStyle = createStyles(({ css }) => {
  return {
    layoutWrapper: css`
      width: 100%;
      height: 100%;
      background-color: #fff;
    `,

    header: css`
      padding: 0px 20px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #E5E5E5;
    `,

    content: css`
      padding: 20px;
    `,
  };
});
