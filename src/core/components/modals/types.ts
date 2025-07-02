import type { ReactNode } from 'react';

export type ModalConfig = {
  key: string;
  title?: ReactNode;
  element: ReactNode;
  size?: 'large' | 'medium' | 'small';
  closable?: boolean;
  onClose?: () => void;
  // will add more
};

export type ModalParams<T = Record<string, unknown>> = T | null;
