import cuid from 'cuid';

const createId = (): string => {
  return cuid();
};

export {createId};
