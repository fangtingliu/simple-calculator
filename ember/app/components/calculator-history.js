import Ember from 'ember';

export default Ember.Component.extend({
  historyLength: function() {
    return this.get('model').length; 
  }.property('model')
});
