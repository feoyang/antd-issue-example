/* eslint-disable camelcase */
import qs from 'qs';
import {
  AIConversationResponseData,
  AIHistoryMessagesResponseData,
  AIInputs,
  AIParametersResponseData,
  AIRagMode,
  AIResponseMode,
  AITag,
} from '../../data';
import { request } from '../core/http';
import { transformResponse } from '../tools/transform-response';

export const BASE_URL = 'https://agrox.horai.cn/v1';
export const AUTH_TOKEN = 'Bearer app-V50ON92WuGVVZHDlUmpEFkJR';
export const DEFAULT_USER = 'test2';

export const requestHistoryChat = async (
  user = DEFAULT_USER,
  limit = 20,
  tag = null,
  lastId = null,
) => {
  const query = qs.stringify(
    {
      user,
      limit,
      tag,
      last_id: lastId,
    },
    {
      skipNulls: true,
    },
  );
  const res = await request.get(`${BASE_URL}/conversations?${query}`, {
    timeout: 6000,
    headers: {
      Authorization: AUTH_TOKEN,
    },
  });

  return transformResponse<AIConversationResponseData>(res);
};

export const requestHistoryMessage = async (
  conversationId: string,
  user = DEFAULT_USER,
  firstId = null,
  limit = 20,
) => {
  const query = qs.stringify(
    {
      conversation_id: conversationId,
      user,
      first_id: firstId,
      limit,
    },
    {
      skipNulls: true,
    },
  );

  const res = await request.get(`${BASE_URL}/messages?${query}`, {
    timeout: 6000,
    headers: {
      Authorization: AUTH_TOKEN,
    },
  });

  return transformResponse<AIHistoryMessagesResponseData>(res);
};

export interface RequestChatRequestParams {

	/**
	 * （选填）会话 ID，需要基于之前的聊天记录继续对话，必须传之前消息的 conversation_id。
	 */
	conversationId?: string;

	/**
	 * App 定义的各变量值
	 */
	inputs?: AIInputs;

	/**
	 * 用户输入/提问内容
	 */
	query: string;

	/**
	 * 回复模式
	 */
	responseMode?: AIResponseMode;

	/**
	 * 会话标签
	 */
	tag?: AITag;

	/**
	 * 用户标识，用于定义终端用户的身份
	 */
	user?: string;
}

export const requestSendChatMessage = async ({
  user = DEFAULT_USER,
  conversationId,
  query,
  tag = AITag.CHAT,
  inputs = {
    rag_mode: AIRagMode.MIX,
  },
  responseMode = AIResponseMode.STREAMING,
  signal,
}: RequestChatRequestParams & { signal?: AbortSignal }) => {
  const url = `${BASE_URL}/chat-messages`;
  const headers = {
    Authorization: AUTH_TOKEN,
    'Content-Type': 'application/json',
  };
  const body = {
    user,
    conversation_id: conversationId,
    query,
    tag,
    inputs,
    response_mode: responseMode,
  };

  // 直接使用fetch而不是axios来获取ReadableStream
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    signal,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
};

export const requestAIParameters = async () => {
  const res = await request.get(`${BASE_URL}/parameters`, {
    timeout: 60000,
    headers: {
      Authorization: AUTH_TOKEN,
    },
  });

  return transformResponse<AIParametersResponseData>(res);
};


