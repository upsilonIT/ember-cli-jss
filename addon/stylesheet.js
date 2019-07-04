import { copy } from 'ember-copy';
import { assign } from '@ember/polyfills';
import jss, { getDynamicStyles } from 'jss';

import compose from './compose';
import { isEmpty, mergeClasses } from './utils';

export default class StyleSheet {
  constructor(styles, options) {
    this.refs = 0;
    this.dynamicSheets = {};
    this.styles = styles;
    this.options = options || {};
  }

  getDynamicSheet(id) {
    return this.dynamicSheets[id];
  }

  createStaticSheet(name) {
    if (this.staticSheet) {
      return;
    }

    const options = copy(this.options);

    if (!options.meta) {
      options.meta = name;
    }

    this.staticSheet = jss.createStyleSheet(this.styles, options);
  }

  attachStaticSheet() {
    this.staticSheet.attach();
    this.refs = this.refs + 1;
  }

  createDynamicSheetAndAttach(id, name) {
    const dynamicOptions = copy(this.options);

    assign(dynamicOptions, {
      meta: dynamicOptions.meta || `${name} dynamic`,
      link: true,
    });

    const dynamicStyles = compose(
      this.staticSheet,
      getDynamicStyles(this.styles),
    );

    const dynamicSheet = jss.createStyleSheet(dynamicStyles, dynamicOptions);

    if (!isEmpty(dynamicSheet.classes)) {
      dynamicSheet.attach();
    }

    this.dynamicSheets[id] = dynamicSheet;
  }

  detachStaticSheet() {
    this.refs = this.refs - 1;

    if (this.refs === 0) {
      this.staticSheet.detach();
    }
  }

  detachDynamicSheet(id) {
    this.dynamicSheets[id].detach();
    delete this.dynamicSheets[id];
  }

  attach(id, name) {
    this.createStaticSheet(name);
    this.attachStaticSheet();
    this.createDynamicSheetAndAttach(id, name);

    return mergeClasses(
      this.staticSheet.classes,
      this.getDynamicSheet(id).classes,
    );
  }

  detach(id) {
    this.detachStaticSheet();
    this.detachDynamicSheet(id);
  }

  update(data) {
    this.dynamicSheet.update(data);
  }
}
