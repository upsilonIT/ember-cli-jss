const random = () =>
  Math.random()
    .toString(36)
    .substr(2, 10);

export const uniqKey = name => `__${name}__${random()}`;

export const isEmpty = (obj = {}) => !Object.keys(obj).length;

export const isBool = value => typeof value === 'boolean';

export const getId = ctx => String(ctx).match(/:(\w+)>$/)[1];

export const getComponentName = ctx => String(ctx).match(/:(.+?):/)[1];

const uniq = items =>
  items.reduce((acc, item) => {
    if (acc.indexOf(item) === -1) {
      acc.push(item);
    }

    return acc;
  }, []);

const mergeClass = (staticClass, dynamicClass = '') => {
  const items = staticClass
    .split(' ')
    .concat(dynamicClass.split(' '))
    .filter(Boolean);

  return uniq(items).join(' ');
};

export const mergeClasses = (staticClasses, dynamicClasses) =>
  Object.keys(staticClasses).reduce((acc, key) => {
    acc[key] = mergeClass(staticClasses[key], dynamicClasses[key]);

    return acc;
  }, {});
