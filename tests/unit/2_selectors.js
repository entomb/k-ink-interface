/**
 * Testing some CSS/ID selectors
 */
module("selectors");
test('basic selection', function(){

  deepEqual( kk('#tester').result(0), tester, "single by ID");

  deepEqual (kk('ul').result(), [ul1,ul2], "multi by tag");

  deepEqual(kk('.list').result(),[ul1,ul2], "multi by class");

  deepEqual(kk('ul li').result(0), li1, "subselection");

  deepEqual(kk('ul').find('li').result(0), li1, "using find selection");

}); 
