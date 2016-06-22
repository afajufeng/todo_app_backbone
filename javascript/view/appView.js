var AppView = Backbone.View.extend({

  el: $("body"),

  nav_tpl: Handlebars.compile($("#nav_list_template").html()),

  initialize: function(){
    this.buildDate("#day", 1, 30);
    this.buildDate("#month", 1, 12);
    this.buildDate("#year", 2000, 2016);

    this.listenTo(todolist, "add", this.addOne);
    this.listenTo(todolist, "all", this.render);

    this.completed = todolist.completed().length;
    this.remaining = todolist.remaining().length;

    todolist.fetch();
  },

  events: {
    "click #addItem": "addItem",
    "click .modalBack": "hideModal",
    "click #save": "saveItem",
    "click #markComplete": "markComplete"
  },

  render: function(){
    $("#todos span").html(this.remaining);
    $("#completed span").html(this.completed);
    $("#todos ul").html(this.nav_tpl(todolist.remainingDate()));
    $("#completed ul").html(this.nav_tpl(todolist.completedDate()));
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
    $("form")[0].reset();
    this.showModal();
  },

  saveItem: function(e){
    e.preventDefault();

    var todo = todolist.clicked();
    var formData = this.sanitizeFormData();

    if(todo){
      todo.save(formData);
    } else{
      todolist.create(formData);
    }
    this.hideModal();
  },

  sanitizeFormData: function(){
    var array = $("form").serializeArray();
    var item = {};

    array.forEach(function(element){
      item[element.name] = element.value;
    });

    var month = item.month;
    var day = item.day;
    if(month < 10) month = "0" + month;
    if(month < 10) day = "0" + day;

    item.date = item.year + "/" + month + "/" + day;
    return item;
  },

  addOne: function(todo){
    var view = new TodoView({model: todo});
    this.$("main ul").append(view.render().el);
  },

  markComplete: function(e){
    e.preventDefault();

    var todo = todolist.where({clicked: true})[0];
    todo.save({class: "completed"});
    todo.save(this.sanitizeFormData());
    this.hideModal();
  },

  showModal: function(){
    $(".modal, .modalBack").fadeIn();
  },

  hideModal: function(){
    var clicked = todolist.where({clicked: true})[0];

    if(clicked){ clicked.save({clicked: false}); }
    $(".modal, .modalBack").fadeOut();
  }
});
