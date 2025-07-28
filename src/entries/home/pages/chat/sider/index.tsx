import { PlusOutlined, HistoryOutlined } from '@ant-design/icons';
import { Conversations } from '@ant-design/x';
import { Button, Empty, Flex, message, Popover, Space, Spin } from 'antd';
import dayjs from 'dayjs';
import { useMemoizedFn, useRequest } from 'ahooks';
import { useEffect } from 'react';
import { requestHistoryChat } from '../../../../../services/requests/ai-chat';
import { useSiderStyle } from '../style';

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
  shouldRefreshConversationList: number;
  onStartNewChat: () => void;
  onSelectHistoryChat: (id: string) => void;
}

export const Sider = ({
  onStartNewChat,
  currentConversationId,
  shouldRefreshConversationList,
  onSelectHistoryChat,
}: AISiderProps) => {
  const { styles } = useSiderStyle();

  const { data: conversations, loading, refresh } = useRequest(requestHistoryChat, {
    onError(err) {
      message.error(err.message);
    },
  });

  const checkShouldRefreshConversationList = useMemoizedFn(() => {
    if (currentConversationId !== conversations?.data[0].id) {
      refresh();
    }
  });

  useEffect(() => {
    checkShouldRefreshConversationList();
  }, [shouldRefreshConversationList, checkShouldRefreshConversationList]);


  return (
    <>
      <Flex justify="space-between" align="center">
        <Popover content="新建对话">
          <Button
            type="text"
            icon={<PlusOutlined />}
            onClick={onStartNewChat}
          />
        </Popover>
        <Space>
          <HistoryOutlined />
          历史记录
        </Space>
      </Flex>
      <Flex className={styles.historyChatContainer} align="center" justify="center">
        <Spin spinning={loading} wrapperClassName={styles.historyChatWrapper}>
          {
            conversations?.data?.length ?
              <Conversations
                className={styles.conversationList}
                items={conversations?.data.map((conversation) => ({
                  key: conversation.id,
                  label: conversation.name,
                  timestamp: conversation.updated_at,
                  group: getTimeGroup(conversation.updated_at),
                }))}
                activeKey={currentConversationId}
                groupable
                onActiveChange={onSelectHistoryChat}
              />
              :
              <Empty description="暂无历史记录" />
          }
        </Spin>
      </Flex>
    </>
  );
};
