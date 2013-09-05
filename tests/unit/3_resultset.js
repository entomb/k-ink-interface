/**
 * Testing resultset navigation
 */
module("result navigation");
test('result()', function(){

  deepEqual(kk('ul').result(), [ul1,ul2], "all result");

  deepEqual(kk('ul').find('li').result(), allLi, "result from a find()");

  equal(kk('ul').result(0), ul1, "result index 0");

  equal(kk('ul').result(1), ul2, "result index 1");

  equal(kk('ul').result(10), undefined, "undefined result index 10");

});


test('get()', function(){

  equal(kk('ul').get(0).result(0), ul1, "get index 0");

  equal(kk('ul').get(1).result(0), ul2, "get index 1");

  equal(kk('ul').get(0).result(0), ul1, "default index 0");

  deepEqual(kk('ul').get(2).result(), [], "empty resultset for undefined index");

});


test('first()', function(){

  equal(kk('ul').first().result(0), ul1, "return first element");

  deepEqual(kk('ul').first().result(), kk('ul').get(0).result(), "should be get(0)");

  equal(kk('ul').first().find('li').first().result(0), li1, "nested first()");

});


test('last()', function(){

  deepEqual(kk('ul').last().result(0), ul2, "return last element");

  deepEqual(kk('ul').last().result(), kk('ul').get(1).result(), "should be get(1)");

  equal(kk('ul').last().find('li').last().result(0), li11, "nested last()");

});


test('length()', function(){

  equal(kk('ul').length(), 2, " counting all <ul> ");

  equal(kk('ul li').length(), allLi.length, "counting  all <li> ");

  equal(kk('ul#unicorn').length(), 0, " no elements ");

});


test('next()', function(){

  equal(kk('ul').next().length(), 0, " single child ");

  equal(kk('#li1').next().result(0), li2, " using next() on single");

  deepEqual(kk('.first').next().result(), [li2,li8], " using next() on multiple");

   equal(kk('#li6').next().length(), 0, " using next() on last child");

});


test('prev()', function(){

  equal(kk('ul').prev().length(), 0, " single child ");

  equal(kk('#li2').prev().result(0), li1, " using prev() on single");

  deepEqual(kk('.last').prev().result(), [li5,li10], " using next() on multiple");

  equal(kk('#li1').prev().length(), 0, " using prev() on first child");

});


test('siblings()', function(){
  equal(kk('ul').siblings().length(), 0, " single child ");

  equal(kk('#li1').siblings().length(), 5, " correct number of childs ");

  deepEqual(kk('#li1').siblings().result(), [li2,li3,li4,li5,li6], " correct childs ");

  deepEqual(kk('li.first').siblings().result(), [li2,li3,li4,li5,li6,li8,li9,li10,li11], " correct childs from different elements ");

  deepEqual(kk('li.first,li.last').siblings().result(), [li2,li3,li4,li5,li6,li1,li8,li9,li10,li11,li7], " correct childs from multi sibling elements ");

  deepEqual(kk('#li1,#li2').siblings().result(), [li2,li3,li4,li5,li6,li1], " correct childs from single sibling elements ");

});


test('parent()', function(){
  equal(kk(document).parent().length(), 0, " no parent (document) ");

  var div = document.createElement('DIV');

  equal(kk(div).parent().length(), 0, " no parent (recently created element) ");

  equal(kk('#tester li').parent().length(), 2, " correct number of parents");

  equal(kk('#a2').parent().result(0), li2, "correct single parents li<a");

  equal(kk('#li8').parent().result(0), ul2, "correct single parents ul<li");

  equal(kk('#a1').parent().parent().result(0), ul1, "nesting single parents ul<li<a");

  deepEqual(kk('#a1,#a10').parent().parent().result(), [ul1,ul2], "nesting multi parents ul<li<a");


  deepEqual(kk('#a1').parent('ul').result(), [ul1], "finding upwards parents  based on query string");

  deepEqual(kk('#a1,#a10').parent('ul').result(), [ul1,ul2], "finding multiple upwards parents based on query string");
});