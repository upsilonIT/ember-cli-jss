import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Mixin | JSS', hooks => {
  setupTest(hooks);

  test('it should check meta attribute', function(assert) {
    this.owner.factoryFor('component:awesome-component').create();

    const meta = Array.from(document.querySelectorAll('[data-jss]')).map(node =>
      node.getAttribute('data-meta'),
    );

    assert.deepEqual(meta, ['awesome-component', 'awesome-component dynamic']);
  });

  test('it check generated classes', function(assert) {
    const component = this.owner
      .factoryFor('component:awesome-component')
      .create();

    const classes = Object.entries(component.get('classes'));

    assert.deepEqual(classes, [
      ['content', 'jss--content jss--content'],
      ['wrapper', 'jss--wrapper jss--wrapper'],
      ['show', 'jss--show jss--show'],
      ['isBlue', 'jss--isBlue jss--isBlue'],
    ]);
  });

  test('it should check classNameBindings', function(assert) {
    const component = this.owner
      .factoryFor('component:awesome-component')
      .create();

    const values = component
      .get('classNameBindings')
      .map(key => component.get(key));

    assert.deepEqual(values, [
      'jss--wrapper jss--wrapper',
      'jss--show jss--show jss--isBlue jss--isBlue',
    ]);
  });
});
