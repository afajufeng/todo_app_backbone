describe("#generateID", function(){
  it("generates an uniqe identifier for an item", function(){
    var id1 = generateID();
    var id2 = generateID();
    expect(id2).not.toBe(id1);
  });
});

describe("#getFormData",function(){
  it("generates an item from form data",  function(){
    var formData = [{name: "title", value: "test1"},
                    {name: "day", value: "1"},
                    {name: "month", value: "2"},
                    {name: "year", value: "2016"},
                    {name: "description", value: "testing"}]

    spyOn(window, 'generateID').and.returnValue("123abc");
    spyOn($.fn, 'serializeArray').and.returnValue(formData);

    var expected = sanitizeFormData(formData)
    expect(expected.title).toBe("test1");
    expect(expected.description).toBe("testing");
    expect(expected.date).toBe("2016/2/1");
    expect(expected.id).toBe("123abc");
  });

});
