import { Sender, Suggestion } from '@ant-design/x';
import { GetProp, Space, Tooltip } from 'antd';
import React from 'react';

type SuggestionItems = Exclude<GetProp<typeof Suggestion, 'items'>, () => void>;

const inputSuggestions: SuggestionItems = [
  { label: '给我灌溉计划', value: '给我灌溉计划' },
];

export interface AIQueryInputProps {
	onSendMessage?: (query: string) => void;
	onCancel?: () => void;
	loading?: boolean;
}

export const AIQueryInput = ({
  onSendMessage,
  onCancel,
  loading,
}: AIQueryInputProps) => {
  const [query, setQuery] = React.useState('');

  return (
    <Suggestion
      style={{ width: '100%' }}
      items={inputSuggestions}
      onSelect={(itemVal) => {
        setQuery(itemVal);
      }}
    >
      {({ onTrigger, onKeyDown }) => {
        return (
          <Sender
            className="sender"
            onChange={(nextVal) => {
              if (nextVal === '/') {
                onTrigger();
              } else if (!nextVal) {
                onTrigger(false);
              }
              setQuery(nextVal);
            }}
            onKeyDown={onKeyDown}
            loading={loading}
            value={query}
            onSubmit={(nextContent) => {
              onSendMessage?.(nextContent);
              setQuery('');
            }}
            onCancel={onCancel}
            placeholder="输入 / 获取指令集"
            actions={(_, info) => {
              const { SendButton, LoadingButton, SpeechButton } = info.components;
              return (
                <Space>
                  <SpeechButton />
                  {
                    loading ?
                      <Tooltip title="停止生成">
                        <LoadingButton color="default" />
                      </Tooltip>
                      :
                      <Tooltip title={!query && '请输入文字'}>
                        <SendButton />
                      </Tooltip>
                  }
                </Space>
              );

            }}
          />
        );
      }}
    </Suggestion>
  );
};
