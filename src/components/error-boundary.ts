import React from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactNode;

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>
> {
  state = { error: null };

  // 当子组件抛出异常时，这里会接收到并且调用该静态方法，返回的值会赋给 state
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render(): React.ReactNode {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
