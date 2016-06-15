var Todo = Backbone.Model.extend({
  defaults: function(){
    return {
      title: "",
      year: "",
      month: "",
      day: "",
      description: "",
      completed: false,
      date: "",
      order: todolist.nextOrder()
    };
  }
});
