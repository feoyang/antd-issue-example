/**
 * rag模式
 */
export enum AIRagMode {
	EXACT = 'exact',
	MIX = 'mix',
}

/**
 * 回复模式
 */
export enum AIResponseMode {
	BLOCKING = 'blocking',
	STREAMING = 'streaming',
}

/**
 * 会话标签
 */
export enum AITag {
	CHAT = 'chat',
	WARNING = 'warning',
}
