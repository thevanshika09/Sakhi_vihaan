'use client';

import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
          >
            Try again
          </button>
          <style jsx>{`
            .error-boundary {
              padding: 2rem;
              text-align: center;
              background: var(--card-bg);
              border-radius: 8px;
              margin: 2rem;
            }
            h2 {
              color: var(--text-color);
              margin-bottom: 1rem;
            }
            p {
              color: var(--text-secondary);
              margin-bottom: 1.5rem;
            }
            button {
              background: var(--primary-color);
              color: white;
              border: none;
              padding: 0.5rem 1rem;
              border-radius: 4px;
              cursor: pointer;
            }
            button:hover {
              background: var(--primary-color-dark);
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
} 