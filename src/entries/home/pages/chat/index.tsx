import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useState } from 'react';
import { requestAIParameters } from '../../../../services/requests/ai-chat';
import { LeftWrapper, RightWrapper } from '../../layout/style';
import { AIChat } from './AIChat';
import { Sider } from './sider';

export const Chat = () => {
  const [currentConversationId, setCurrentConversationId] = useState<string | undefined>(undefined);

  const { data: instruction } = useRequest(requestAIParameters, {
    onError: (err) => {
      message.error(err.message);
    },
  });

  return (
    <>
      <LeftWrapper>
        <AIChat
          conversationId={currentConversationId}
          openingStatement={instruction?.opening_statement}
          onChat={(conversationId) => {
            setCurrentConversationId(conversationId);
          }}
        />
      </LeftWrapper>
      <RightWrapper>
        <Sider
          currentConversationId={currentConversationId}
          setNewChat={() => setCurrentConversationId(undefined)}
          selectHistoryChat={(id: string) => {
            setCurrentConversationId(id);
          }}
        />
      </RightWrapper>
    </>
  );
};
