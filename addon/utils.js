const random = () =>
  Math.random()
    .toString(36)
    .substr(2, 10);

export const uniqKey = name => `__${name}__${random()}`;

export const isEmpty = (obj = {}) => !Object.keys(obj).length;

export const isBool = value => typeof value === 'boolean';
