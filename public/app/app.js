$(function() {
  var clsAbstract = Backbone.View.extend({

    data: null,

    layoutName: 'layout',

    render: function() {
      if (this.template) {
        this.$el.html(this.template(this.data));

        Backbone.$('#' + this.layoutName).html(this.$el);
      }
      
      return this;
    }
  });

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  var clsTest1 = clsAbstract.extend({

    template: _.template(Backbone.$('#template-test1').html()), 
    layoutName: 'layout1',

    events: {
      'click .calculate-value': 'onClick'
    },

    onClick: function(e) {
      if (e && e.prevetDefault) {
        e.prevetDefault();
      }

      var value = this.$el.find('.input-value').val();

      var b2d = new Bunary2Decimal(value);
      var view = new clsCalc({value: b2d.decimal()});

      view.render();
      // route.navigate('test2/' + value, {trigger: true});
    },

    // remove: function(){
    //         console.log('removed Test1');

    // }
  });

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  var clsCalc = clsAbstract.extend({

    template: _.template(Backbone.$('#template-test1-result').html()),
    layoutName: 'layout2',

    events: {
      'click .back': 'onClick'
    },

    initialize: function(options){
      this.data = options;
    },

    onClick: function(e) {
      if (e && e.prevetDefault) {
        e.prevetDefault();
      }

      route.navigate('test1', {trigger: true});
    }


  });

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  var clsTest2 = clsAbstract.extend({

    template: _.template(Backbone.$('#template-test2').html()), 
    layoutName: 'layout3',
    
    events: {
      'click .animal-jellyfish': 'onClick',
      'click .animal-starfish': 'onClick',
      'click .animal-shark': 'onClickBite',
      'click .animal-turtle': 'onClickBite'
    },

    onClick: function(e) {
      if (e && e.prevetDefault) {
        e.prevetDefault();
      }

      var a = new Animal();
      console.log(a);
    },
 
    onClickBite: function(e) {
      if (e && e.prevetDefault) {
        e.prevetDefault();
      }

      var a = new Shark();
      console.log(a);
    }
  });

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  Backbone.history.start();
  
  var classRouter;
  
  classRouter = Backbone.Router.extend({
    routes: {
      'test1': 'onTest1',
      'test2': 'onTest2'
    },
    onTest1: function() {
      console.log('onTest1');
      var view = new clsTest1();

      route.navigate('test1', {trigger: true});
      view.render();
    },
    onTest2: function(value) {
      console.log('onTest2');

      var view = new clsTest2();

      route.navigate('test2', {trigger: true});
      view.render();
    }
  });
  
  var route = new classRouter();
});