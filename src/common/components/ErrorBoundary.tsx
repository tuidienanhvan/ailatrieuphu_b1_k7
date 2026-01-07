import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { BaseButton } from './BaseButton';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {


  public state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-white p-8 text-center select-none">
          <AlertTriangle size={80} className="text-yellow-500 mb-6 animate-bounce" />
          <h1 className="text-4xl font-bold mb-4">Đã xảy ra lỗi hệ thống</h1>
          <p className="text-zinc-400 mb-8 max-w-md">
            Hệ thống gặp sự cố không mong muốn. Vui lòng tải lại trang để tiếp tục.
          </p>
          <div className="p-4 bg-black/30 rounded-lg mb-8 max-w-lg overflow-auto text-left font-mono text-xs text-red-400 border border-red-900/30">
            {this.state.error?.toString()}
          </div>
          <BaseButton onClick={this.handleReload} variant="primary" className="px-8 py-3 text-lg">
            <RefreshCcw className="mr-2" size={20} /> Tải lại Game
          </BaseButton>
        </div>
      );
    }

    // @ts-ignore
    return this.props.children;
  }
}