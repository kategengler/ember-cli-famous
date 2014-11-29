import Ember from 'ember';

export default Ember.Component.extend({
  mainContext: Ember.computed('parentView.mainContext', function() {
    function tryParentContext(parent) {
      var parentContext = parent.get('mainContext')

      if (parentContext) {
        return parentContext;
      }

      var parentsParent = parent.get('parentView');

      if (parentsParent) {
        return tryParentContext(parentsParent);
      }

      throw new Ember.Error('Could not find parent context to return. Are you within an #fa-app component?');
    }

    return tryParentContext(this.get('parentView'));
  }),

  famousRerender: function() {
    throw new Ember.Error('You must implement the famousRerender method when passing in the watcher property.');
  },

  triggerFamousDidLoad: function(childViews) {
    Ember.A(childViews).forEach(function(view) {
      view.trigger('famousDidLoad');

      var childViews = Ember.A(view.get('childViews'));

      if (childViews && childViews.get('length')) {
        this.triggerFamousDidLoad(childViews);
      }
    }, this);
  },

  scheduleFamousRerender: Ember.on('famousBoundPropertyDidChange', function() {
    Ember.run.scheduleOnce('afterRender', this, this.famousRerender);
  }),

  addToMainContext: function(renderableObject) {
    var newContext = this.get('mainContext').add(renderableObject);
    return this.set('mainContext', newContext);
  }
});
