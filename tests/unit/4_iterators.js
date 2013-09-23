/**
 * Testing iterators, one the most used functionalities (internaly).
 */
module("iterators");
test('.each()', function(){

  var each1 = 0;
  kk('#tester li').each(function(){
    each1++;
  });
  equal(each1, kk('#tester li').length ,"  works with selectors");

  var each2 = 0;
  kk.each([1,2,3,4,5], function(item){
    each2+=item;
  });
  equal(each2, 15 ," works with arrays (from kink)");

  var each3 = 0;
  kk([1,2,3,4,5]).each(function(item){
    each3+=item;
  });
  equal(each3, 15 ," works with arrays (from resultset)");

  var each4 = 0;
  kk(1).each(function(item){
    each4++;
  });
  equal(each4, 1 ," works with single item");


  var each5 = 0;
  kk("#li1").each(function(item){
    each5++;
  });
  equal(each5, 1 ," works with single selector");

});

/*
test('.filter()', function(){

  var filter1 = kk([1,2,3,4,5]).filter(function(item){
    return (item > 3);
  }).result();
  deepEqual(filter1, [4,5] ," filtering an array (true)");


  var filter2 = kk([1,2,3,4,5]).filter(function(item){
    return (item > 30);
  }).result();
  deepEqual(filter2, [] ," filtering an array (false)");

  var filter3 = kk('ul li').filter(function(item){
    return (item.id == 'li1');
  }).result();
  deepEqual(filter3, [li1] ," filtering a resultset");

});
*/


test('.some()', function(){

  var some1 = kk.some([1,2,3,4,5], function(item){
    return (item==1);
  });
  ok(some1, " from a source array (true)");

  var some2 = kk.some([1,2,3,4,5], function(item){
    return (item==99);
  });
  ok(!some2, " from a source array (false)");

  var some3 = kk("ul li").some(function(item){
    return (item.className=="first");
  });
  ok(some3, " filtering a resultset (true)");

  var some4 = kk("ul li").some(function(item){
    return (item.className=="nothere");
  });
  ok(!some4, " filtering a resultset (false)");

});

/*
test('.has()', function(){

  ok(kk([1,2,3,4]).has(1), "[1,2,3,4] has 1 (true)");

  ok(!kk([1,2,3,4]).has(99), "[1,2,3,4] has 99 (false)");

  ok(kk(['one','two','three']).has('one'), "['one','two','three'] has 'one' (true)");

  ok(!kk(['one','two','three']).has('none'), "['one','two','three'] has 'none' (false)");

  ok(kk("ul li").has(".first"), "ul>li has .first (true)");

  ok(!kk("ul li").has(".item"), "ul>li has .item (false)");

});


test('.in()', function(){

  ok(kk(1).in([1,2,3,4]), "is in [1,2,3,4]  (true)");

  ok(!kk(99).in([1,2,3,4]), "99 is in [1,2,3,4] (false)");


  ok(kk('one').in(['one','two','three']), "'one' in ['one','two','three'] (true)");

  ok(!kk('none').in(['one','two','three']), "'none' in ['one','two','three'] (false)");

  ok(kk(".first").in("ul li"), ".first is in ul>li (true)");

  ok(!kk(".item").in("ul li"), ".item is in ul>li (false)");

});
*/