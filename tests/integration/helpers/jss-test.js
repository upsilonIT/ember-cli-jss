import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('jss', 'Integration | Helper | jss', {
  integration: true
});

test('it should insert class names', function(assert) {
  this.set('classes', {
    lorem: 'ipsum',
    dolor: 'sit',
    amet: 'consectetur',
  });

  this.render(hbs`{{jss 'lorem'}}`);
  assert.equal(this.$().text().trim(), 'ipsum');

  this.render(hbs`{{jss 'lorem' 'dolor'}}`);
  assert.equal(this.$().text().trim(), 'ipsum sit');

  this.render(hbs`{{jss 'lorem' amet=false}}`);
  assert.equal(this.$().text().trim(), 'ipsum');

  this.render(hbs`{{jss 'lorem' amet=true}}`);
  assert.equal(this.$().text().trim(), 'ipsum consectetur');

  this.render(hbs`{{jss 'missingName1' missingName2=true}}`);
  assert.equal(this.$().text().trim(), '');
});
