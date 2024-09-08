import { ReactNode } from 'react';

export const getAndRemoveNode = (array: ReactNode[], by: string) => {
  const index = array.findIndex(node => {
    return node && (node as any).type.name === by;
  });

  if (index === -1) {
    return null;
  }

  const node = array[index];
  array.splice(index, 1);
  return node;
};

export const getNodeByName = (array: ReactNode[], by: string[] | string) => {
  return array.find(node => {
    if (Array.isArray(by)) {
      return node && by.includes((node as any).type.name);
    }
    return node && (node as any).type.name === by;
  });
};
