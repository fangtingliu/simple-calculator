import { test } from 'qunit';
import moduleForAcceptance from 'ember-quickstart/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | calculator');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});
