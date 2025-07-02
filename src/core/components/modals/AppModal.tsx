import { type ReactNode, useCallback, useMemo } from 'react';
import { Button, Col, Modal, Popconfirm, Row } from 'antd';
import type { ButtonProps, PopconfirmProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { globalMessages } from '../messages/common';
import { useModal, useModalParams } from './context';
import type { ModalConfig } from './types';
import { modalStyles } from './utils';
import './styles.scss';

interface AppModalProps {
  current: ModalConfig | null;
}

interface ConfirmModalProps extends Omit<PopconfirmProps, 'title'> {
  title?: ReactNode;
}

interface ModalFooterProps {
  okText?: ReactNode;
  cancelText?: ReactNode;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  colSpan?: number | string;
  hideOkButton?: boolean;
  withConfirmModal?: boolean;
  confirmModalProps?: ConfirmModalProps;
  onConfirmModal?: () => void;
}

export default function AppModal({ current }: AppModalProps) {
  const { close, isOpen } = useModal();
  const modalParams = useModalParams<{
    title?: string;
    onClose?: () => void;
  }>();

  const styles = useMemo(
    () => modalStyles[current?.size || 'large'],
    [current?.size]
  );

  const closeModalHandler = useCallback(() => {
    close();
    modalParams?.onClose?.();
  }, [close, modalParams]);

  return (
    <Modal
      destroyOnHidden
      onCancel={closeModalHandler}
      title={modalParams?.title ?? current?.title}
      open={isOpen}
      width={styles.width}
      footer={null}
      className="custom-modal overflow-hidden"
      maskClosable={false}
    >
      {current?.element}
    </Modal>
  );
}

export function ModalFooter({
  okText,
  cancelText,
  okButtonProps,
  cancelButtonProps,
  colSpan = 6,
  hideOkButton = false,
  withConfirmModal = false,
  confirmModalProps,
}: ModalFooterProps) {
  const { close } = useModal();
  const { t } = useTranslation();
  const modalParams = useModalParams<{
    onClose?: () => void;
  }>();

  const closeModal = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      close();
      modalParams?.onClose?.();
      cancelButtonProps?.onClick?.(event);
    },
    [cancelButtonProps, close, modalParams]
  );

  return (
    <div className="app-modal-footer -mx-[24px] border-t border-[#E6E6E6] pt-5">
      <Row gutter={10} justify="end">
        <Col span={colSpan}>
          <Button
            block
            type="default"
            {...cancelButtonProps}
            // keep the same order
            onClick={closeModal}
          >
            {cancelText || t(globalMessages.cancel)}
          </Button>
        </Col>

        {!hideOkButton && (
          <Col span={colSpan}>
            {withConfirmModal ? (
              <Popconfirm
                placement="topRight"
                {...confirmModalProps}
                title={
                  confirmModalProps?.title || t(globalMessages.confirmation)
                }
                description={t(globalMessages.confirmationMessage)}
                okText={t(globalMessages.yes)}
                cancelText={t(globalMessages.no)}
              >
                <Button block type="primary" {...okButtonProps}>
                  {okText || t(globalMessages.confirm)}
                </Button>
              </Popconfirm>
            ) : (
              <Button block type="primary" htmlType="submit" {...okButtonProps}>
                {okText || t(globalMessages.confirm)}
              </Button>
            )}
          </Col>
        )}
      </Row>
    </div>
  );
}
