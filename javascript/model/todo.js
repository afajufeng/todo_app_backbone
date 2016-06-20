var Todo = Backbone.Model.extend({
  defaults: function(){
    return {
      title: "",
      year: "",
      month: "",
      day: "",
      description: "",
      class: "remaining",
      date: "",
      clicked: false,
      order: todolist.nextOrder()
    };
  }
});
