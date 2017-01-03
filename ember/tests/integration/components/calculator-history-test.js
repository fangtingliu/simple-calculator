import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('calculator-history', 'Integration | Component | calculator history', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{calculator-history}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#calculator-history}}
      template block text
    {{/calculator-history}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
