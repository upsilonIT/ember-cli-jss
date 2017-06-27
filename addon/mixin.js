import Ember from 'ember';
import StyleSheet from './stylesheet';

const {
  Mixin,
  mixin,
  assert,
  computed,
} = Ember;

const EMPTY_ARRAY = Object.freeze([]);
const EMPTY_OBJECT = Object.freeze({});

// Imitation private properties
const PREFIX = `JSS-${Date.now()}`;
const CLASS_NAMES = `${PREFIX}-classNames`;
const CLASS_NAME_BINDINGS = `${PREFIX}-classNameBindings`;

const createBindings = (context) => {
  const observedProperties = context.jssNameBindings
    .map((items) => items.split(':')[0]);

  mixin(context, {
    [CLASS_NAME_BINDINGS]: computed('classes', ...observedProperties, () => {
      const classes = context.get('classes');

      return context.jssNameBindings
        .map((item) => {
          const items = item.split(':');

          if (items.length === 1) {
            return classes[context.get(items[0])];
          }

          return context.get(items[0])
            ? classes[items[1]]
            : classes[items[2]];
        })
        .join(' ');
    }).readOnly(),
  });
};

export default Mixin.create({
  jssNames: EMPTY_ARRAY,
  jssNameBindings: EMPTY_ARRAY,
  jssObservedProps: EMPTY_ARRAY,
  classes: EMPTY_OBJECT,

  classNameBindings: [
    CLASS_NAMES,
    CLASS_NAME_BINDINGS,
  ],

  [CLASS_NAMES]: computed('classes', 'jssNames.[]', function() {
    return this.jssNames
      .map((name) => this.get(`classes.${name}`))
      .join(' ');
  }).readOnly(),

  init() {
    this._super(...arguments);

    assert(
      'Only instance of StyleSheet allowed for "stylesheet"',
      this.get('stylesheet') instanceof StyleSheet
    );

    assert(
      'Only arrays are allowed for "jssNames"',
      Array.isArray(this.jssNames)
    );

    assert(
      'Only arrays are allowed for "jssObservedProps"',
      Array.isArray(this.jssObservedProps)
    );

    assert(
      'Only arrays are allowed for "jssNameBindings"',
      Array.isArray(this.jssNameBindings)
    );
  },

  willInsertElement() {
    this._super(...arguments);

    createBindings(this);

    const componentName = String(this).match(/:(.+?):/)[1];
    const id = this.elementId;

    this.stylesheet.attach(id, componentName);
    this.set('classes', this.stylesheet.sheet.classes);

    const sheet = this.stylesheet.dynamicSheets[id];
    const fields = this.get('jssObservedProps') || [];
    const update = () => sheet.update(this.getProperties(fields));

    update();

    fields.forEach((field) => this.addObserver(field, this, update));
  },

  willDestroyElement() {
    this._super(...arguments);

    this.stylesheet.detach(this.elementId);
  }
});
