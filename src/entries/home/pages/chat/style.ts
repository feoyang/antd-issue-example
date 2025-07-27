import { css } from '@linaria/core';

export const messagesContainer = css`
  flex: 1;
  overflow: auto;
`;

export const historyChatContainer = css`
  flex: 1;
  overflow: auto;
  background-color: #fff;

  .historyChatsWrapper {
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

      .conversation-list {
        width: 100%;
        height: 100%;
      }
    }
  }
`;
