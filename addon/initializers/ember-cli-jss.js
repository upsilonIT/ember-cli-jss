import jss from 'jss';
import preset from 'jss-preset-default';

export const initialize = () => {
  jss.setup(preset());
};

export default {
  initialize,
};
