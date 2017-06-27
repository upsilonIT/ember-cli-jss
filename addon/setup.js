import { create } from 'jss';

export const jssInstance = create();

export default (options = {}) => {
  jssInstance.setup(options);
};
