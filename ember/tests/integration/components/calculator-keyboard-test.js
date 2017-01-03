import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('calculator-keyboard', 'Integration | Component | calculator keyboard', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{calculator-keyboard}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#calculator-keyboard}}
      template block text
    {{/calculator-keyboard}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
