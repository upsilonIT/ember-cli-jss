import Mixin from '@ember/object/mixin';
import { assert } from '@ember/debug';
import EmObject, { computed } from '@ember/object';
import { once } from '@ember/runloop';

import StyleSheet from './stylesheet';
import { uniqKey, isBool, getId, getComponentName } from './utils';

const classNamesKey = uniqKey('classNames');
const classNameBindingsKey = uniqKey('classNameBindings');
const setupKey = uniqKey('setup');

const createBindings = context => {
  const observedProperties = context.jssNameBindings.map(
    items => items.split(':')[0],
  );

  Mixin.create({
    [classNameBindingsKey]: computed('classes', ...observedProperties, () => {
      const classes = context.get('classes');

      return context.jssNameBindings
        .map(item => {
          const items = item.split(':');
          const [key, truthy, falsy] = items;
          const value = context.get(key);

          if (items.length === 1) {
            const targetName = isBool(value) ? key : value;

            return classes[targetName];
          }

          return value ? classes[truthy] : classes[falsy];
        })
        .join(' ');
    }).readOnly(),
  }).apply(context);
};

const ClassesBindings = Mixin.create({
  jssNames: [],
  jssNameBindings: [],
  classNameBindings: [classNamesKey, classNameBindingsKey],

  [classNamesKey]: computed('classes', 'jssNames.[]', function() {
    return this.jssNames.map(name => this.get(`classes.${name}`)).join(' ');
  }).readOnly(),

  init(...args) {
    this._super(...args);

    assert(
      'Only arrays are allowed for "jssNames"',
      Array.isArray(this.jssNames),
    );

    assert(
      'Only arrays are allowed for "jssNameBindings"',
      Array.isArray(this.jssNameBindings),
    );

    createBindings(this);
  },
});

export const TaglessJSS = Mixin.create({
  jssObservedProps: [],
  classes: EmObject.create(),

  init(...args) {
    this._super(...args);

    assert(
      'Only instance of StyleSheet allowed for "stylesheet"',
      this.get('stylesheet') instanceof StyleSheet,
    );

    assert(
      'Only arrays are allowed for "jssObservedProps"',
      Array.isArray(this.jssObservedProps),
    );

    this[setupKey]();
  },

  [setupKey]() {
    const componentName = getComponentName(this);
    const id = getId(this);

    this.stylesheet.attach(id, componentName);

    const classes = EmObject.create(this.stylesheet.sheet.classes);
    const sheet = this.stylesheet.dynamicSheets[id];
    const fields = this.get('jssObservedProps') || [];
    const update = () => sheet.update(this.getProperties(fields));
    const onceUpdate = () => once(update);

    this.set('classes', classes);

    update();

    fields.forEach(field => this.addObserver(field, this, onceUpdate));
  },

  willDestroyElement(...args) {
    this._super(...args);
    this.stylesheet.detach(getId(this));
  },
});

export const JSS = Mixin.create(ClassesBindings, TaglessJSS);
