import Ember from 'ember';
import Surface from 'famous/core/Surface';
import FamousComponent from './famous';

export default FamousComponent.extend({
  hideContent: Ember.on('didInsertElement', function() {
    this.$().css('display', 'none');
  }),

  renderSurface: Ember.on('famousDidLoad', function() {
    var options = Ember.merge({
      content: this.$().html()
    }, this.get('options'));

    var surface = new Surface(options);

    this.set('surface', surface);
    this.get('ctx').add(surface);
  }),

  famousRerender: function() {
    this.get('surface').setContent(this.$().html());
  }
});
