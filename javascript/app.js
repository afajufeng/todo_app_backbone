
var AppView = Backbone.View.extend({
  el: $("body"),

  events: {
    "click #addItem": "addItem",
    "click .modalBack": "hideModal"
  },

  addItem: function(e){
    e.preventDefault();
    var new_item = true;
    $("#markComplete").hide();
    this.showModal();
  },

  showModal: function(){
    $(".modal, .modalBack").fadeIn();
  },

  hideModal: function(){
    $(".modal, .modalBack").fadeOut();
  }
});

var app = new AppView;
