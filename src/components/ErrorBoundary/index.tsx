import React from 'react';
import { Button, Result } from 'antd';
import { getUrl } from '../../common/url';

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, any> {

  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="系统错误"
          subTitle="系统出现了一些错误，请刷新页面或者联系管理员"
          extra={[
            <Button
              key="goHome"
              type="primary"
              onClick={() => {
                window.location.href = getUrl();
              }}
            >
              返回首页
            </Button>,
            <Button
              key="refresh"
              onClick={() => {
                window.location.reload();
              }}
            >
              刷新页面
            </Button>,
          ]}
        />
      );
    }

    return this.props.children;
  }
}
