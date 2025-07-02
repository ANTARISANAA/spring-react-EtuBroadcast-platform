import { type ReactElement, useCallback, useMemo, useState } from 'react';
import AppModal from './AppModal';
import { ModalContext, ModalParamsContext } from './context';
import { getModalConfig } from './store';
import type { ModalParams } from './types';

type ModalState = {
  isOpen: boolean;
  currentModalKey: string | null;
  params: ModalParams | null;
};

const initialModalState = {
  isOpen: false,
  currentModalKey: null,
  params: null,
};

export function ModalProvider({
  children,
}: {
  readonly children: ReactElement;
}) {
  const [modalState, setModalState] = useState<ModalState>(initialModalState);

  const open = useCallback((key: string, params: ModalParams = null): void => {
    setModalState({ isOpen: true, currentModalKey: key, params });
  }, []);

  const close = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const currentModal = useMemo(
    () =>
      modalState.currentModalKey
        ? getModalConfig(modalState.currentModalKey)
        : null,
    [modalState.currentModalKey]
  );

  return (
    <ModalContext.Provider value={{ open, close, isOpen: modalState.isOpen }}>
      <ModalParamsContext.Provider value={modalState.params}>
        {children}
        <AppModal current={currentModal} />
      </ModalParamsContext.Provider>
    </ModalContext.Provider>
  );
}
