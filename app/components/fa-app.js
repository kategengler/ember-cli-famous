import Ember from 'ember';
import Engine from 'famous/core/Engine';
import FamousComponent from './famous';

export default FamousComponent.extend({
  ctx: null,

  createEngine: Ember.on('didInsertElement', function() {
    Ember.debug('fa-app: createEngine');
    var ctx = Engine.createContext(this.$()[0]);
    this.set('ctx', ctx);

    this.triggerFamousDidLoad(this.get('childViews'));
  })
})
