import React from 'react';
import Fallback from './Fallback';
import './style.scss';

const automaticRecoverStorageKey = 'automatic-recover-from-chunk-error';

export default class DefaultErrorBoundary extends React.PureComponent<
  BoundaryProps,
  BoundaryState
> {
  constructor(props: BoundaryProps) {
    super(props);
    this.state = {
      counter: 0,
      error: null,
      errorInfo: null,
    };
    this.retry = this.retry.bind(this);
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo | null) {
    this.setState((old) => ({
      ...old,
      error,
      errorInfo,
    }));
    const isChunkFailingError = checkIfErrorIsChunkError(error);
    if (isChunkFailingError) {
      console.error(
        'Application cannot find an important file to operate. ' +
          'Reloading the app to try to find it',
        error
      );
      let currentReloadCount = localStorage.getItem(automaticRecoverStorageKey);
      if (!currentReloadCount) {
        currentReloadCount = '1';
      } else {
        currentReloadCount = `${+currentReloadCount + 1}`;
      }
      localStorage.setItem(automaticRecoverStorageKey, currentReloadCount);

      if (+currentReloadCount >= 2) {
        // when we attain 2, we remove from storage
        localStorage.removeItem(automaticRecoverStorageKey);
        console.log('Attained maximum reloads');
        return;
      }
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  retry() {
    this.setState((old) => ({
      error: null,
      errorInfo: null,
      counter: old.counter + 1,
    }));
  }

  render() {
    const { children } = this.props;
    const { error, errorInfo, counter } = this.state;

    if (errorInfo) {
      return (
        <Fallback
          error={error?.message}
          onRetry={() => this.retry()}
          onCopy={() => copyErrorInfo(this.state)}
          stackTrace={stripTheComponentStack(errorInfo.componentStack)}
        />
      );
    }
    return <Ghost key={counter}>{children}</Ghost>;
  }
}

function checkIfErrorIsChunkError(error: Error | null) {
  if (!error) {
    return false;
  }

  const errorMessage = error.message;
  if (!errorMessage) {
    return false;
  }

  return errorMessage
    .toLowerCase()
    .includes('failed to fetch dynamically imported module');
}

type BoundaryProps = {
  children: React.ReactNode;
};
type BoundaryState = {
  counter: number;
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

// copied from React source code
interface ErrorInfo {
  componentStack?: string | null;
  digest?: string | null;
}

function stripTheComponentStack(stack?: string | null) {
  if (!stack) {
    return stack;
  }
  return stack.replace(/\s+\(.*?\)/g, '').replace(/^\s+/gm, '');
}

function Ghost({ children }: { children: React.ReactNode }) {
  return children;
}

function copyErrorInfo(state: BoundaryState) {
  if (!state.error) {
    return;
  }

  try {
    const messageToCopy = JSON.stringify(
      {
        app: navigator.platform,
        userAgent: navigator.userAgent,
        componentName: resolveComponentNameFromStackTrace(
          state.errorInfo?.componentStack
        ),
        ...state,
      },
      null,
      4
    );
    navigator.clipboard.writeText(messageToCopy);
  } catch (e) {
    console.error("couldn't copy error info to clipboard", e);
  }
}

export function resolveComponentNameFromStackTrace(
  stack: string | null | undefined,
  level = 0
) {
  if (!stack) {
    return undefined;
  }
  const regex = new RegExp(/at.(\w+).*$/, 'gm');

  let levelsCount = 0;
  let match = regex.exec(stack);

  while (levelsCount < level && match) {
    levelsCount += 1;
    match = regex.exec(stack);
  }

  return match?.[1];
}
