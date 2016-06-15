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

var TodoView = Backbone.View.extend({
  tagName: "li",

  todo_tpl: Handlebars.compile($("#main_list_template").html()),

  render: function(){
    this.$el.html(this.todo_tpl(this.model.toJSON()));
    return this;
  }
});

var AppView = Backbone.View.extend({
  el: $("body"),

  initialize: function(){
    this.buildDate("#day", 1, 30);
    this.buildDate("#month", 1, 12);
    this.buildDate("#year", 2000, 2016);

    this.listenTo(todolist, "add", this.addOne);

    todolist.fetch();
  },

  events: {
    "click #addItem": "addItem",
    "click .modalBack": "hideModal",
    "click #save": "saveNew"
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
    $("#markComplete").hide();
    this.showModal();
  },

  saveNew: function(e){
    e.preventDefault();
    todolist.create(this.sanitizeFormData());
    this.hideModal();
  },

  sanitizeFormData: function(){
    var array = $("form").serializeArray();
    var item = {};

    array.forEach(function(element){
      item[element.name] = element.value;
    });
    item.date = item.year + "/" + item.month + "/" + item.day;
    return item;
  },

  addOne: function(todo){
    var view = new TodoView({model: todo});
    this.$("main ul").append(view.render().el);
  },

  showModal: function(){
    $(".modal, .modalBack").fadeIn();
  },

  hideModal: function(){
    $(".modal, .modalBack").fadeOut();
  }
});

var app = new AppView;
