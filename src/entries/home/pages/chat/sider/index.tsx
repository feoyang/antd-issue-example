import { PlusOutlined, CommentOutlined } from '@ant-design/icons';
import { Conversations } from '@ant-design/x';
import { Button, Flex, message, Popover, Spin } from 'antd';
import dayjs from 'dayjs';
import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import { requestHistoryChat } from '../../../../../services/requests/ai-chat';

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
  currentConversationId: string | undefined;
  setNewChat: () => void;
  selectHistoryChat: (id: string) => void;
}

export const Sider = ({
  setNewChat,
  currentConversationId,
  selectHistoryChat,
}: AISiderProps) => {

  const { data: conversations, loading, refresh } = useRequest(requestHistoryChat, {
    onError(err) {
      message.error(err.message);
    },
  });

  // 如果currentConversationId变化，则用户选择了某个历史对话或者开始新的聊天，需要刷新历史对话列表
  useEffect(() => {
    if (currentConversationId) {
      refresh();
    }
  }, [currentConversationId, refresh]);

  return (
    <>
      <Flex justify="space-between" align="center">
        <Button
          type="text"
          icon={<PlusOutlined />}
          onClick={setNewChat}
        />
        <Popover
          placement="bottom"
          styles={{
            body: {
              padding: 0,
              maxHeight: 600,
              width: 300,
              overflowY: 'auto',
            },
          }}
          content={
            <Spin spinning={loading}>
              <Conversations
                items={conversations?.data.map((conversation) => ({
                  key: conversation.id,
                  label: conversation.name,
                  timestamp: conversation.updated_at,
                  group: getTimeGroup(conversation.updated_at),
                }))}
                activeKey={currentConversationId}
                groupable
                onActiveChange={selectHistoryChat}
              />
            </Spin>
          }
        >
          <Button type="text" icon={<CommentOutlined />} />
        </Popover>
      </Flex>

    </>
  );
};
