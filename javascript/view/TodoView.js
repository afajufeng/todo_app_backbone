var TodoView = Backbone.View.extend({
  tagName: "li",

  todo_tpl: Handlebars.compile($("#main_list_template").html()),

  events: {
    "click .delete": "deleteItem",
    "click a": "loadSavedItem"
  },

  initialize: function(){
    this.listenTo(this.model, "destroy", this.remove);
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
    app.showModal();
    this.loadDataToForm(e);
  },

  loadDataToForm: function(e){
    var todo = {
      title: this.model.get("title"),
      year: this.model.get("year"),
      month: this.model.get("month"),
      day: this.model.get("day"),
      description: this.model.get("description")
    };

    for(var prop in todo){
      var id = "#" + prop;
      $(id).val(todo[prop]);
    }
  }
});
