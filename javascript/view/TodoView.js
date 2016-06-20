var TodoView = Backbone.View.extend({
  tagName: "li",

  todo_tpl: Handlebars.compile($("#main_list_template").html()),

  events: {
    "click .delete": "deleteItem",
    "click a": "loadSavedItem"
  },

  initialize: function(){
    this.listenTo(this.model, "destroy", this.remove);
    this.listenTo(this.model, "change", this.render);
  },

  render: function(){
    this.$el.html(this.todo_tpl(this.model.toJSON()));
    return this;
  },

  deleteItem: function(){
    this.model.destroy();
  },

  loadSavedItem: function(e){
    e.preventDefault();
    $("#markComplete").show();
    app.showModal();
    this.model.set({clicked: true});
    this.loadDataToForm();
  },

  loadDataToForm: function(){
    var todo = todolist.clickedItem();

    for(var prop in todo){
      var id = "#" + prop;
      $(id).val(todo[prop]);
    }
  }
});
