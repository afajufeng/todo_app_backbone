describe("Item", function(){
  beforeEach(function () {
    var store = {};

    spyOn(localStorage, 'getItem').and.callFake(function (key) {
      return store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      return store[key] = value + '';
    });
    spyOn(localStorage, 'clear').and.callFake(function () {
        store = {};
    });
  });

  describe("#persistsItem", function(){
    it("save an item to local storage", function(){
      var data = {title: "test1", description: "testing",
                  date: "2016/2/1", id: "1"};

      persistsItem(data);

      expect(localStorage.getItem(data.id)).toBe(JSON.stringify(data));
    });
  });



});


