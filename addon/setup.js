import jss from 'npm:jss';

export const jssInstance = jss.create();

export default (options = {}) => {
  jssInstance.setup(options);
};
