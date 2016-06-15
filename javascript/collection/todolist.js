
var TodoList = Backbone.Collection.extend({
  model: Todo,

  localStorage: new Backbone.LocalStorage("todo_app"),

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

var todolist = new TodoList;
