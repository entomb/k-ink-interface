/**
 * Testing resultset navigation
*/
module("result navigation");
test('.get()', function(){

  deepEqual(kk('ul').get(), [ul1,ul2], "all result");

  deepEqual(kk('ul').find('li').get(), allLi, "result from a find()");

  equal(kk('ul').get(0), ul1, "result index 0");

  equal(kk('ul').get(1), ul2, "result index 1");

  equal(kk('ul').get(10), undefined, "undefined result index 10");

});


test('.result()', function(){

  equal(kk('ul').result(0).get(0), ul1, "get index 0");

  equal(kk('ul').result(1).get(0), ul2, "get index 1");

  equal(kk('ul').result(0).get(0), ul1, "default index 0");

  deepEqual(kk('ul').result(2).get(), [], "empty resultset for undefined index");

});


test('.first()', function(){

  equal(kk('ul').first().get(0), ul1, "return first element");

  deepEqual(kk('ul').first().get(0), kk('ul').get(0), "should be get(0)");

  equal(kk('ul').first().find('li').first().get(0), li1, "nested first()");

});


test('.last()', function(){

  deepEqual(kk('ul').last().get(0), ul2, "return last element");

  deepEqual(kk('ul').last().get(), kk('ul').result(1).get(), "should be get(1)");

  equal(kk('ul').last().find('li').last().get(0), li11, "nested last()");

});


test('.length', function(){

  equal(kk('ul').length, 2, " counting all <ul> ");

  equal(kk('ul li').length, allLi.length, "counting  all <li> ");

  equal(kk('ul#unicorn').length, 0, " no elements ");

});


test('.next()', function(){

  equal(kk('ul').next().length , 0, " single child ");

  equal(kk('#li1').next().get(0), li2, " using next() on single");

  deepEqual(kk('.first').next().get(), [li2,li8], " using next() on multiple");

   equal(kk('#li6').next().length, 0, " using next() on last child");

});


test('.prev()', function(){

  equal(kk('ul').prev().length, 0, " single child ");

  equal(kk('#li2').prev().get(0), li1, " using prev() on single");

  deepEqual(kk('.last').prev().get(), [li5,li10], " using next() on multiple");

  equal(kk('#li1').prev().length, 0, " using prev() on first child");

});


test('.siblings()', function(){
  equal(kk('ul').siblings().length, 0, " single child ");

  equal(kk('#li1').siblings().length, 5, " correct number of childs ");

  deepEqual(kk('#li1').siblings().get(), [li2,li3,li4,li5,li6], " correct childs ");

  deepEqual(kk('li.first').siblings().get(), [li2,li3,li4,li5,li6,li8,li9,li10,li11], " correct childs from different elements ");

  deepEqual(kk('li.first,li.last').siblings().get(), [li2,li3,li4,li5,li6,li1,li8,li9,li10,li11,li7], " correct childs from multi sibling elements ");

  deepEqual(kk('#li1,#li2').siblings().get(), [li2,li3,li4,li5,li6,li1], " correct childs from single sibling elements ");

});


test('.parent()', function(){
  equal(kk(document).parent().length, 0, " no parent (document) ");

  var div = document.createElement('DIV');

  equal(kk(div).parent().length, 0, " no parent (recently created element) ");

  equal(kk('#tester li').parent().length, 2, " correct number of parents");

  equal(kk('#a2').parent().get(0), li2, "correct single parents li<a");

  equal(kk('#li8').parent().get(0), ul2, "correct single parents ul<li");

  equal(kk('#a1').parent().parent().get(0), ul1, "nesting single parents ul<li<a");

  deepEqual(kk('#a1,#a10').parent().parent().get(), [ul1,ul2], "nesting multi parents ul<li<a");
});