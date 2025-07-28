import { useState } from 'react';
import { flushSync } from 'react-dom';
import { LeftWrapper, RightWrapper } from '../../layout/style';
import { AIChat } from './AIChat';
import { Sider } from './sider';

export const Chat = () => {
  const [currentConversationId, setCurrentConversationId] = useState<string | undefined>(undefined);
  const [shouldRefreshConversationList, setShouldRefreshConversationList] = useState(0);

  return (
    <>
      <LeftWrapper>
        <AIChat
          currentConversationId={currentConversationId}
          onStartAnswer={(id: string) => {
            if (currentConversationId !== id) {
              // 先同步更新 currentConversationId
              flushSync(() => {
                setCurrentConversationId(id);
              });
            }
            // 点开一个历史对话，继续对话，则需要刷新列表，或者新对话开始也要刷新列表。
            setShouldRefreshConversationList(prev => prev + 1);
          }}
        />
      </LeftWrapper>
      <RightWrapper>
        <Sider
          currentConversationId={currentConversationId}
          shouldRefreshConversationList={shouldRefreshConversationList}
          onStartNewChat={() => setCurrentConversationId(undefined)}
          onSelectHistoryChat={(id: string) => setCurrentConversationId(id)}
        />
      </RightWrapper>
    </>
  );
};
