import { css } from '@linaria/core';
import { createStyles } from 'antd-style';

export const messagesContainer = css`
  flex: 1;
  overflow: auto;
`;

export const useSiderStyle = createStyles(({ css }) => {
  return {
    historyChatContainer: css`
      flex: 1;
      overflow: auto;
      background-color: #fff;
    `,

    historyChatWrapper: css`
      width: 100%;
      height: 100%;

      .ant-spin {
        max-height: 100% !important;
      }

      .ant-spin-container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,

    conversationList: css`
      width: 100%;
      height: 100%;

      .ant-conversations-item {
        padding: 0px 8px !important;
      }
    `,
  };
});
