import React, { Component, ErrorInfo, ReactNode } from 'react';
import { DSButton } from '../ui/ds-button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // 에러 리포팅 서비스에 전송할 수 있습니다
    // reportError(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div 
          className="min-h-screen flex items-center justify-center p-4 bg-gray-50"
          role="alert"
          aria-live="assertive"
        >
          <div className="text-center max-w-md">
            <div className="mb-6">
              <svg 
                className="w-16 h-16 text-gray-400 mx-auto mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" 
                />
              </svg>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Oops! Something went wrong
              </h2>
              
              <p className="text-gray-600 mb-6">
                We're sorry for the inconvenience. The app encountered an unexpected error.
              </p>
            </div>
            
            <div className="space-y-3">
              <DSButton 
                onClick={this.handleRetry}
                className="w-full"
              >
                Try Again
              </DSButton>
              
              <DSButton 
                variant="tertiary" 
                onClick={() => window.location.reload()}
                className="w-full"
              >
                Reload Page
              </DSButton>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Error details (dev only)
                </summary>
                <pre className="mt-2 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}