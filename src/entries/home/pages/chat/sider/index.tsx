import { PlusOutlined, HistoryOutlined } from '@ant-design/icons';
import { Conversations } from '@ant-design/x';
import { Button, Empty, Flex, message, Popover, Space, Spin } from 'antd';
import dayjs from 'dayjs';
import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import { requestHistoryChat } from '../../../../../services/requests/ai-chat';
import { historyChatContainer } from '../style';
import { ConversationIdState } from '..';

// 添加时间分组函数
const getTimeGroup = (timestamp: number) => {
  const now = dayjs();
  // 将秒级时间戳转换为毫秒级
  const time = dayjs(timestamp * 1000);
  const diffDays = now.diff(time, 'day');

  if (diffDays === 0) {
    return '今天';
  }
  if (diffDays === 1) {
    return '昨天';
  }
  if (diffDays <= 7) {
    return '7天内';
  }
  if (diffDays <= 30) {
    return '30天内';
  }
  if (diffDays <= 90) {
    return '更早';
  }
};

export interface AISiderProps {
  conversationIdState: ConversationIdState;
  setNewChat: () => void;
  selectHistoryChat: (id: string) => void;
}

export const Sider = ({
  setNewChat,
  conversationIdState,
  selectHistoryChat,
}: AISiderProps) => {
  const { data: conversations, loading, refresh } = useRequest(requestHistoryChat, {
    onError(err) {
      message.error(err.message);
    },
  });

  // 如果currentConversationId变化，且不是点击历史对话操作，
  // 则用户开始了新的聊天，需要刷新历史对话列表
  useEffect(() => {
    if (conversationIdState.id && !conversationIdState.fromHistoryConversation) {
      refresh();
    }
  }, [conversationIdState, refresh]);

  return (
    <Flex vertical gap="small" style={{ height: '100%', minHeight: 0 }}>
      <Flex justify="space-between" align="center">
        <Popover content="新建对话">
          <Button
            type="text"
            icon={<PlusOutlined />}
            onClick={setNewChat}
          />
        </Popover>
        <Space>
          <HistoryOutlined />
          历史记录
        </Space>
      </Flex>
      <Flex className={historyChatContainer} align="center" justify="center">
        <Spin spinning={loading} wrapperClassName="historyChatsWrapper">
          {
            conversations?.data?.length ?
              <Conversations
                className="conversation-list"
                items={conversations?.data.map((conversation) => ({
                  key: conversation.id,
                  label: conversation.name,
                  timestamp: conversation.updated_at,
                  group: getTimeGroup(conversation.updated_at),
                }))}
                activeKey={conversationIdState.id}
                groupable
                onActiveChange={(id) => {
                  selectHistoryChat(id);
                }}
              />
              :
              <Empty description="暂无历史记录" />
          }
        </Spin>
      </Flex>
    </Flex>
  );
};
