import { AIResponseMode } from '..';

export interface AIConversationResponseData {
	data: AIConversationItem[];
	has_more: boolean;
	limit: number;
}

export interface AIConversationItem {
	id: string;
	inputs: AIInputs;
	introduction: string;
	name: string;
	status: string;
	created_at: number;
	updated_at: number;
}

export interface AIInputs {
	rag_mode: string;
}

export interface AIHistoryMessagesResponseData {
	data: AIMessageItem[];
	has_more: boolean;
	limit: number;
}

export interface AIMessageItem {
	agent_thoughts?: string[];
	answer?: string;
	conversation_id?: string;
	created_at?: number;
	error?: null;
	feedback?: null;
	id?: string;
	inputs?: AIInputs;
	message_files?: string[];
	query?: string;
	retriever_resources?: string[];
	status?: string;
}

export interface AISendChatMessageResponseData {
	answer: string;
	conversation_id: string;
	created_at: number;
	event: string;
	id: string;
	message_id: string;
	metadata: AIMetadata;
	mode: string;
	task_id: string;
}

export interface AIMetadata {
	usage: AIUsage;
}

export interface AIUsage {
	completion_price: string;
	completion_price_unit: string;
	completion_tokens: number;
	completion_unit_price: string;
	currency: string;
	latency: number;
	prompt_price: string;
	prompt_price_unit: string;
	prompt_tokens: number;
	prompt_unit_price: string;
	total_price: string;
	total_tokens: number;
}

/**
 * 其他参数暂时不管，现在只要opening_statement也就是AI的自我介绍
 */
export interface AIParametersResponseData {
	opening_statement: string;
}

/**
 * 流式响应的单个数据块
 */
export interface AIStreamChunk {
	event: string;
	data: AISendChatMessageResponseData | string;
}

/**
 * 联合类型，根据response_mode返回不同类型
 */
export type AIChatResponse<T extends AIResponseMode> =
	T extends AIResponseMode.BLOCKING
		? Promise<AISendChatMessageResponseData>
		: T extends AIResponseMode.STREAMING
			? ReadableStream<AIStreamChunk>
			: never;
