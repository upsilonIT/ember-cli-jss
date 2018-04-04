import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | jss', hooks => {
  setupRenderingTest(hooks);

  test('it should insert class names', async function(assert) {
    this.set('classes', {
      lorem: 'ipsum',
      dolor: 'sit',
      amet: 'consectetur',
    });

    await render(hbs`{{jss 'lorem'}}`);
    assert.equal(this.element.textContent.trim(), 'ipsum');

    await render(hbs`{{jss 'lorem' 'dolor'}}`);
    assert.equal(this.element.textContent.trim(), 'ipsum sit');

    await render(hbs`{{jss 'lorem' amet=false}}`);
    assert.equal(this.element.textContent.trim(), 'ipsum');

    await render(hbs`{{jss 'lorem' amet=true}}`);
    assert.equal(this.element.textContent.trim(), 'ipsum consectetur');

    await render(hbs`{{jss 'missingName1' missingName2=true}}`);
    assert.equal(this.element.textContent.trim(), '');
  });
});
