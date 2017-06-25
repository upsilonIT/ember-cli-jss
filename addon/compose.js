import Ember from 'ember';

const { merge } = Ember;

export default (staticSheet, styles) => {
  for (const name in styles) {
    const className = staticSheet.classes[name];

    if (!className) {
      break;
    }

    merge(styles[name], { composes: className });
  }

  if (styles) {
    for (const name in staticSheet.classes) {
      const className = styles[name];

      if (!className) {
        styles[name] = { composes: staticSheet.classes[name] }
      }
    }
  }

  return styles
}
