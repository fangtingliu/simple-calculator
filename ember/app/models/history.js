import DS from 'ember-data';

export default DS.Model.extend({
  input: DS.attr(),
  output: DS.attr()
});
