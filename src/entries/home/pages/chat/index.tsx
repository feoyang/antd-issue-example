import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useState } from 'react';
import { requestAIParameters } from '../../../../services/requests/ai-chat';
import { LeftWrapper, RightWrapper } from '../../layout/style';
import { AIChat } from './AIChat';
import { Sider } from './sider';

export interface ConversationIdState {
  id: string | undefined;
  fromHistoryConversation: boolean;
}

export const Chat = () => {
  const [currentConversationIdState, setCurrentConversationIdState] = useState<ConversationIdState>({
    id: undefined,
    fromHistoryConversation: false,
  });

  const { data: instruction } = useRequest(requestAIParameters, {
    onError: (err) => {
      message.error(err.message);
    },
  });

  return (
    <>
      <LeftWrapper>
        <AIChat
          conversationIdState={currentConversationIdState}
          openingStatement={instruction?.opening_statement}
          startNewChat={(conversationId) => {
            setCurrentConversationIdState({
              id: conversationId,
              fromHistoryConversation: false,
            });
          }}
        />
      </LeftWrapper>
      <RightWrapper>
        <Sider
          conversationIdState={currentConversationIdState}
          setNewChat={() => setCurrentConversationIdState({
            id: undefined,
            fromHistoryConversation: false,
          })}
          selectHistoryChat={(id: string) => {
            setCurrentConversationIdState({
              id: id,
              fromHistoryConversation: true,
            });
          }}
        />
      </RightWrapper>
    </>
  );
};
