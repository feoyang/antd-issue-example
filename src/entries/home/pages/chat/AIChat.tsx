import { Bubble, Prompts, XStream, useXAgent, useXChat } from '@ant-design/x';
import { BubbleDataType } from '@ant-design/x/es/bubble/BubbleList';
import { MessageInfo, MessageStatus } from '@ant-design/x/es/use-x-chat';
import { useMemoizedFn, useRequest } from 'ahooks';
import { GetProp, message as antdMessage, message } from 'antd';
import markdownit from 'markdown-it';
import { useEffect, useRef } from 'react';
import {
  requestAIParameters,
  requestHistoryMessage,
  requestSendChatMessage,
} from '../../../../services/requests/ai-chat';
import { AIQueryInput } from './AIQueryInput';
import { messagesContainer } from './style';

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
  conversationId?: string;
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
	currentConversationId: string | undefined;
	onStartAnswer: (id: string) => void;
}

export const AIChat = ({
  currentConversationId,
  onStartAnswer,
}: AIChatProps) => {
  const abortController = useRef<AbortController>(new AbortController());

  // ==================== Runtime ====================
  const [agent] = useXAgent<AgentMessage, { messages: AgentMessage[]; message: AgentUserMessage }, AgentAIMessage>({
	  request: async ({ message }, { onSuccess, onUpdate, onStream, onError }) => {
	    onStream?.(new AbortController());
	    try {
	      const res = await requestSendChatMessage({
	        conversationId: message.conversationId,
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
          // 开始回答的时候，更新conversationId
          if (current === '') {
            onStartAnswer(res.conversation_id);
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

  const { onRequest, messages, setMessages, parsedMessages } = useXChat({
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

  const { data: openingStatement } = useRequest(requestAIParameters, {
    onSuccess: (res) => {
      setMessages(() => [{
        id: 'instruction',
        message: { type: 'ai', content: res.opening_statement } as AgentAIMessage,
        status: 'success' as MessageStatus,
      }]);
    },
    onError: (err) => {
      message.error(err.message);
    },
  });

  const { run: runRequestHistoryMessage } = useRequest(requestHistoryMessage, {
    manual: true,
    onSuccess: (res) => {
      setMessages(() => {
        const messages = [] as MessageInfo<AgentMessage>[];

        // 添加开场白作为第一条消息
        if (openingStatement?.opening_statement) {
          messages.push({
            id: 'instruction',
            message: { type: 'ai', content: openingStatement.opening_statement } as AgentAIMessage,
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

  const clearMessages = useMemoizedFn(() => {
    abortController.current?.abort();
    // 这里需要设置一个延时，否则会报错（abort的原因，这里是官方做法）
    setTimeout(() => {
      setMessages(() => openingStatement?.opening_statement ? [{
        id: 'instruction',
        message: { type: 'ai', content: openingStatement?.opening_statement } as AgentAIMessage,
        status: 'success' as MessageStatus,
      }] : []);
    }, 100);
  });

  const checkIfShouldRequestHistoryMessages = useMemoizedFn(() => {
    // 如果 conversationId 从 undefined 到有值，说明从一个空对话开始了新对话或者点击了历史对话
    // 如果从有值到有值，则说明从当前非空对话点击到了另一个历史对话

    // 从一个空对话开始了新对话，此时setMessages必然只有instruction(可能没有)和user的问题
    // 因为如果是空对话，则必然已经调用了clearMessages。而此时currentConversationId变化是因为ai的第一次回答时调用了onStartAnswer。
    // 那么除了instruction之外只有一个ai回答，此时ai当前回答的状态肯定是loading。

    // 计算messages中ai回答的有loading状态的数量
    if (messages?.find(message => message.message.type === 'ai' && message.status === 'loading')) {
      return;
    }

    runRequestHistoryMessage(currentConversationId!);
  });

  useEffect(() => {
    // conversationId 变为 undefined，说明新建对话了
    if (!currentConversationId) {
      clearMessages();
      return;
    };

    // 如果 conversationId 从 undefined 到有值或者从一个值变为另一个值，说明点击了历史对话
    checkIfShouldRequestHistoryMessages();
  }, [currentConversationId, clearMessages, checkIfShouldRequestHistoryMessages]);

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
        onSendMessage={(query) => onSubmit({ content: query, type: 'user', conversationId: currentConversationId })}
        onCancel={() => abortController.current?.abort()}
        loading={agent.isRequesting()}
      />
    </>
  );
};
