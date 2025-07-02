import { createContext, useContext } from 'react';
import { UnreachableContextError } from '@/utils';
import type { ModalParams } from './types';

type ModalContextProps = {
  isOpen: boolean;
  open: (key: string, params?: ModalParams) => void;
  close: () => void;
};

export const ModalContext = createContext<ModalContextProps | undefined>(
  undefined
);

export const ModalParamsContext = createContext<ModalParams | undefined>(
  undefined
);

export function useModal() {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new UnreachableContextError('ModalContext');
  }

  return context;
}

export function useModalParams<T = Record<string, unknown>>(): T {
  const context = useContext(ModalParamsContext);

  if (context === undefined) {
    throw new UnreachableContextError('ModalParamsContext');
  }

  return context as T;
}
