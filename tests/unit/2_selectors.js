/**
 * Testing some CSS/ID selectors
 */
module("selectors");
test('basic selection', function(){

  deepEqual( kk('#tester').get(0), tester, "single by ID");

  deepEqual (kk('ul').get(), [ul1,ul2], "multi by tag");

  deepEqual(kk('.list').get(),[ul1,ul2], "multi by class");

  equal(kk('ul li').get(0), li1, "subselection");

  equal(kk('ul').find('li').get(0), li1, "using find selection");

});
