
var TodoList = Backbone.Collection.extend({
  model: Todo,

  localStorage: new Backbone.LocalStorage("todo_app"),

  completed: function(){
    return this.where({class: "completed"});
  },

  remaining: function(){
    return this.where({class: "remaining"});
  },

  nextOrder: function(){
    if(!this.length) return 1;
    return this.last().get("order") + 1;
  },

  clickedItem: function(){
    var todo = this.where({clicked: true})[0];

    return {
      title: todo.get("title"),
      year: todo.get("year"),
      month: todo.get("month"),
      day: todo.get("day"),
      description: todo.get("description")
    };
  },

  clicked: function(){
    return this.where({clicked: true})[0];
  },

  comparator: "order"
});

var todolist = new TodoList;
