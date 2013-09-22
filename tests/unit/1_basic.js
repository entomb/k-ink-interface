/**
 * This looks stupid but i wanted to check how tests worked before I wrote any
 */
module('configuration');
test( "tests are not stupid",function() {

  ok( true, "true works" );

  ok( !false, "false works" );

  equal( 1,"1","non strick" );

  strictEqual( 1, 1, "strict" );

  deepEqual( [1,2,3] , [1,2,3], "array compare" );

  deepEqual( {a:1,b:2,c:3} ,{a:1,b:2,c:3}, "object compare" );

});


test( "loading kink", function() {

  ok( Ink, "Ink.js is loaded" );

  ok( kk, "kink is loaded" );

  equal( kk(document).get(0), document, "kink works" );

});