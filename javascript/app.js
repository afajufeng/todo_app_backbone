var Todo = Backbone.Model.extend({
  defaults: function(){
    return {
      title: "",
      year: "",
      month: "",
      day: "",
      description: "",
      completed: false,
      order: Todos.nextOrder()
    };
  }
});

var TodoList = Backbone.Collection.extend({
  model: Todo,

  completed: function(){
    return this.where({completed: true});
  },

  remaining: function(){
    return this.where({completed: false});
  },

  nextOrder: function(){
    if(!this.length) return 1;
    return this.last().get("order") + 1;
  },

  comparator: "order"
});

var Todos = new TodoList;

var AppView = Backbone.View.extend({
  el: $("body"),

  initialize: function(){
    this.buildDate("#day", 1, 30);
    this.buildDate("#month", 1, 12);
    this.buildDate("#year", 2000, 2016);
  },

  events: {
    "click #addItem": "addItem",
    "click .modalBack": "hideModal"
  },

  buildDate: function (period, num_start, num_end){
    var text ="";
    for(var i = num_start; i <= num_end; i++){
      text += "<option>" + i + "</option>";
    }
    $(period).append(text);
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
