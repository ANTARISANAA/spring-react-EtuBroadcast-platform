import type { MouseEventHandler } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import ErrorVector from '@/assets/icons/ErrorVector';
import { __DEV__ } from '@/config/env';
import { messages } from './messages';

const Fallback = __DEV__ ? DevFallback : ProdFallback;

export default Fallback;

type FallbackProps = {
  error: any;
  onRetry: () => void;
  stackTrace?: string | null;
  onCopy: MouseEventHandler<HTMLElement>;
};

function DevFallback({ error, stackTrace, onCopy, onRetry }: FallbackProps) {
  const { t } = useTranslation();
  return (
    <section className="err-root">
      <section className="err-oops">
        <h1>{t(messages.unknownError)}</h1>
        <span className="err-desc">{error}</span>
        <section className="err-content">
          <details open className="err-details">
            <summary className="err-details-summary">
              <span>{t(messages.stackTrace)}</span>

              <div className="flex">
                <Button className="mr-2" onClick={onCopy}>
                  <i className="fas fa-copy" />
                  <span>{t(messages.copyError)}</span>
                </Button>

                <Button type="primary" onClick={onRetry}>
                  {t(messages.retry)}
                </Button>
              </div>
            </summary>
            <pre className="err-pre">{stackTrace}</pre>
          </details>
        </section>
        <div className="err-retry"></div>
      </section>
    </section>
  );
}
function ProdFallback({ onRetry }: FallbackProps) {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <ErrorVector />
      <h1 className="text-primary mb-2 text-3xl font-bold">
        {t(messages.somethingWrong)}
      </h1>
      <p className="mb-6 text-xl">{t(messages.retryLater)}</p>
      <Button
        className="error-cta-button"
        onClick={onRetry}
        size="large"
        type="primary"
      >
        {t(messages.retry)}
      </Button>
    </div>
  );
}
