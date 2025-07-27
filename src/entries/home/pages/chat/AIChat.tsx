import { Bubble, Prompts, XStream, useXAgent, useXChat } from '@ant-design/x';
import { BubbleDataType } from '@ant-design/x/es/bubble/BubbleList';
import { MessageInfo, MessageStatus } from '@ant-design/x/es/use-x-chat';
import { useRequest } from 'ahooks';
import { GetProp, message as antdMessage } from 'antd';
import markdownit from 'markdown-it';
import { useEffect, useRef } from 'react';
import {
  requestHistoryMessage,
  requestSendChatMessage,
} from '../../../../services/requests/ai-chat';
import { AIQueryInput } from './AIQueryInput';
import { messagesContainer } from './style';
import { ConversationIdState } from './index';

const md = markdownit({ html: true, breaks: true });

const waitingPlaceholder = '思考中...';
// const defaultAsk = '给我灌溉计划';
// const defaultSuggestion: PromptsProps['items'] = [
// 	{
// 		key: '1',
// 		icon: <BulbOutlined style={{ color: '#FFD700' }} />,
// 		description: defaultAsk,
// 	},
// ];

const roles: GetProp<typeof Bubble.List, 'roles'> = {
  ai: {
    placement: 'start',
    styles: { content: { boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.1)' } },
  },
  user: {
    placement: 'end',
    styles: { content: { backgroundColor: 'rgba(111, 192, 109, 0.2)' } },
  },
  suggestion: {
    placement: 'start',
    variant: 'borderless',
    messageRender: (items) => <Prompts vertical items={items as any} />,
  },
};

type AgentUserMessage = {
	type: 'user';
	content: string;
};

type AgentAIMessage = {
	type: 'ai';
	content?: string;
	list?: (
		| { type: 'text'; content: string }
		| { type: 'suggestion'; content: string[] }
	)[];
};

type AgentMessage = AgentUserMessage | AgentAIMessage;

type ParsedMessage = {
	role: 'ai' | 'user' | 'text' | 'suggestion';
	content: string | string[];
};

export interface AIChatProps {
	conversationIdState: ConversationIdState;
	openingStatement: string | undefined;
	startNewChat: (currentConversationId: string) => void;
}

export const AIChat = ({
  conversationIdState,
  openingStatement,
  startNewChat,
}: AIChatProps) => {
  const abortController = useRef<AbortController>(new AbortController());
  // 使用ref向agent传递id，因为agent初次时被创建已经形成了闭包，不会更新state
  const currentConversationIdRef = useRef<string | undefined>(undefined);

  // ==================== Runtime ====================
  const [agent] = useXAgent<AgentMessage, { messages: AgentMessage[]; message: AgentMessage }, AgentMessage>({
	  request: async ({ message }, { onSuccess, onUpdate, onStream, onError }) => {
	    onStream?.(new AbortController());
	    try {

        // 用来让state的history标记变为false
        if (currentConversationIdRef.current) {
          startNewChat(currentConversationIdRef.current);
        }

	      const res = await requestSendChatMessage({
	        conversationId: currentConversationIdRef.current,
	        query: message.content || '',
	        signal: abortController.current.signal,
	      });
	      // eslint-disable-next-line new-cap
	      const stream = res.body ? XStream({ readableStream: res.body }) : null;
	      if (!stream) {
	        onError(new Error('Stream is null'));
	        return;
	      }

	      let current = '';
	      for await (const chunk of stream) {
	        // 跳过例如 ping 的 chunk
	        if (!chunk.data) {
	          continue;
	        }
	        const res = JSON.parse(chunk.data);
	        // 设置 currentNewChatConversationIdRef 的值，用于后面的问答传对话id
	        // 使用ref避免闭包问题，只在当前请求第一次获得conversation_id时调用startNewChat
	        if (!currentConversationIdRef.current && res.conversation_id) {
	          currentConversationIdRef.current = res.conversation_id;
	          startNewChat(res.conversation_id);
	        }
	        if (res.event === 'message_end') {
	          onSuccess([{ type: 'ai', content: current }]);
	          // 在消息处理完成后调用 onChat 来更新历史对话列表
	          return;
	        }
	        current += res.answer;
	        onUpdate({ type: 'ai', content: current });
	      }
	    } catch (error) {
	      onError(error as Error);
	    }
	  },
  });

  const { onRequest, setMessages, parsedMessages } = useXChat({
    agent,
    requestFallback: (_, { error }) => {
      const item = {
        content: error.name === 'AbortError' ? '已暂停输出' : '请求失败，请稍后重试',
        type: 'ai',
      };
      return item as AgentAIMessage;
    },
    requestPlaceholder: {
      type: 'ai',
      content: waitingPlaceholder,
    } as AgentMessage,
    parser: (agentMessage: AgentMessage) => {
      const list = agentMessage.content ? [agentMessage] : (agentMessage as AgentAIMessage).list;
      return (list || []).map(message => ({
        role: message.type,
        content: message.content as string | string[],
      }) as ParsedMessage);
    },
    resolveAbortController: (controller) => {
      abortController.current = controller;
    },
  });

  // ==================== Request ====================
  const { run: runFetchHistoryMessage } = useRequest(requestHistoryMessage, {
    manual: true,
    onSuccess: (res) => {
      setMessages(() => {
        const messages = [] as MessageInfo<AgentMessage>[];

        // 添加开场白作为第一条消息
        if (openingStatement) {
          messages.push({
            id: 'instruction',
            message: { type: 'ai', content: openingStatement } as AgentAIMessage,
            status: 'success' as MessageStatus,
          });
        }

        // 添加历史对话记录
        for (const round of res.data) {
          messages.push({
            id: `${round.id}-user`,
            message: { type: 'user', content: round.query } as AgentUserMessage,
            status: 'success' as MessageStatus,
          });
          messages.push({
            id: `${round.id}-ai`,
            message: { type: 'ai', content: round.answer } as AgentAIMessage,
            status: 'success' as MessageStatus,
          });
        }
        return messages;
      });
    },
    onError: (err) => {
      antdMessage.error(err.message);
    },
  });

  useEffect(() => {
    // 如果 conversationId 从 undefined 到有值
    if (conversationIdState.id) {
      // 用户当前会话是新对话，不需要获取历史消息
      if (conversationIdState.fromHistoryConversation) {
        // 用户从header中选择了一个别的对话，则获取历史消息
        runFetchHistoryMessage(conversationIdState.id);
      }
    } else {
      // 如果conversationId 从有值到 undefined,说明点击了新建对话
      abortController.current?.abort();
      // 这里需要设置一个延时，否则会报错（abort的原因，这里是官方做法）
      setTimeout(() => {
        setMessages(() => [{
          id: 'instruction',
          message: { type: 'ai', content: openingStatement } as AgentAIMessage,
          status: 'success' as MessageStatus,
        }]);
      }, 100);
    }
    currentConversationIdRef.current = conversationIdState.id;
  }, [conversationIdState, openingStatement, runFetchHistoryMessage, setMessages]);

  const onSubmit = (message: AgentUserMessage) => {
    if (!message) {
      return;
    }
    if (agent.isRequesting()) {
      antdMessage.info('AI 正在回答中');
      return;
    }
    onRequest({
      message: message,
    });
  };

  return (
    <>
      <div className={messagesContainer}>
        <Bubble.List
          style={{ height: '100%' }}
          roles={roles}
          items={[
            ...parsedMessages.map(({ id, message, status }) => ({
              key: id,
              role: message.role,
              content:
                typeof message.content === 'string' ?
                  <div dangerouslySetInnerHTML={{ __html: md.render(message.content) }} className="markdown-content" />
                  :
                  message.content.map((item, i) =>
                    // eslint-disable-next-line react/no-array-index-key
                    <div dangerouslySetInnerHTML={{ __html: md.render(item) }} className="markdown-content" key={i} />,
                  ),
              shape: 'corner',
              loading: status === 'loading' && message.content === waitingPlaceholder,
            } as BubbleDataType)),
          ]}
        />
      </div>
      <AIQueryInput
        onSendMessage={(query) => onSubmit({ content: query, type: 'user' })}
        onCancel={() => abortController.current?.abort()}
        loading={agent.isRequesting()}
      />
    </>
  );
};
