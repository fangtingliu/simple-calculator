import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const res = this.get('store').findAll('history');
    return res;
  },
  actions: {
    newCalculation: function(value) {
      const store = this.get('store');
      const history = store.createRecord('history', {
        input: value.input,
        output: value.output
      });
      history.save();
    }
  }
});
