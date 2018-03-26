import { copy } from '@ember/object/internals';
import { merge } from '@ember/polyfills';
import { getDynamicStyles } from 'jss';
import compose from './compose';
import { jssInstance } from './setup';

const isEmpty = (obj = {}) => !Object.keys(obj).length;

export default class StyleSheet {
  constructor(styles, options) {
    this.refs = 0;
    this.dynamicSheets = {};
    this.styles = styles;
    this.options = options || {};
  }

  createStaticSheet(name) {
    if (this.staticSheet) {
      return;
    }

    const options = copy(this.options);

    if (!options.meta) {
      options.meta = name;
    }

    this.staticSheet = jssInstance.createStyleSheet(this.styles, options);
  }

  attachStaticSheet() {
    this.staticSheet.attach();
    this.refs = this.refs + 1;
  }

  createDynamicSheetAndAttach(id, name) {
    const dynamicOptions = copy(this.options);
    const meta = dynamicOptions.meta || `${name} dynamic`;

    merge(dynamicOptions, {
      meta,
      link: true,
    });

    const dynamicStyles = compose(
      this.staticSheet,
      getDynamicStyles(this.styles),
    );

    const dynamicSheet = jssInstance.createStyleSheet(
      dynamicStyles,
      dynamicOptions,
    );

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

  setupSheet(id) {
    const dynamicSheet = this.dynamicSheets[id];

    this.sheet = isEmpty(dynamicSheet.classes)
      ? this.staticSheet
      : dynamicSheet;
  }

  attach(id, name) {
    this.createStaticSheet(name);

    if (!isEmpty(this.staticSheet.classes)) {
      this.attachStaticSheet();
    }

    this.createDynamicSheetAndAttach(id, name);

    this.setupSheet(id);
  }

  detach(id) {
    this.detachStaticSheet();
    this.detachDynamicSheet(id);
  }

  update(data) {
    this.dynamicSheet.update(data);
  }
}
