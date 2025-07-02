import { isValidElement } from 'react';
import type { ModalConfig } from './types';

type Registry = Record<string, ModalConfig>;

const modalRegistry: Registry = {};

export function getModalConfig(key: string): ModalConfig {
  if (!modalRegistry[key]) {
    throw new Error(`Unable to find key '${key}' in modal registry`);
  }

  return modalRegistry[key];
}

export function createModal(config: ModalConfig): { key: string } {
  if (modalRegistry[config.key]) {
    console.error(`Modal key '${config.key}' already exist`);
  }

  if (!isValidElement(config.element)) {
    throw new Error('Modal element is an invalid react element');
  }

  modalRegistry[config.key] = {
    size: 'large',
    ...config,
  };

  return { key: config.key };
}
