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

  ok( kk.result, "kResult is loaded" );

});

module('basic');
test( "kResult factory", function() {

    equal( kk().length, 0, "kk() === kk([])" );
    equal( kk(undefined).length, 0, "kk(undefined) === kk([])" );
    equal( kk(null).length, 0, "kk(null) === kk([])" );
    equal( kk("").length, 0, "kk('') === kk([])" );
    equal( kk("#").length, 0, "Bad selector string handling" );
    equal( kk("# bad <> selector !!! string").length, 0, "REALLY Bad selector string handling" );

    equal( kk(".someclass").selector, ".someclass", "saves the slector string" );


    deepEqual( kk(window).get(), [window], "Selecting the window" );

    deepEqual( kk(document).get(),[document], "Selecting the document" );


    equal( kk([1,2,3]).get(1), 2, "Test passing an array to the factory" );

    equal( kk(document.body).get(0), kk("body").get(0), "Test passing an html node to the factory" );


});


test("kink.trim()", function() {


    var nbsp = String.fromCharCode(160);

    equal( kk.trim("hello  "), "hello", "trailing space" );
    equal( kk.trim("  hello"), "hello", "leading space" );
    equal( kk.trim("  hello   "), "hello", "space on both sides" );
    equal( kk.trim("  " + nbsp + "hello  " + nbsp + " "), "hello", "&nbsp;" );

    equal( kk.trim(), "", "Nothing in." );
    equal( kk.trim( undefined ), "", "Undefined" );
    equal( kk.trim( null ), "", "Null" );
    equal( kk.trim( 5 ), "5", "Number" );
    equal( kk.trim( false ), "false", "Boolean" );

    equal( kk.trim(" "), "", "space should be trimmed" );
    equal( kk.trim("ipad\xA0"), "ipad", "nbsp should be trimmed" );
    equal( kk.trim("\uFEFF"), "", "zwsp should be trimmed" );
    equal( kk.trim("\uFEFF \xA0! | \uFEFF"), "! |", "leading/trailing should be trimmed" );

});

test("kink.type()", function() {

    equal( kk.type(null), "null", "null" );
    equal( kk.type(undefined), "undefined", "undefined" );
    equal( kk.type(true), "boolean", "Boolean" );
    equal( kk.type(false), "boolean", "Boolean" );
    equal( kk.type(Boolean(true)), "boolean", "Boolean" );
    equal( kk.type(0), "number", "Number" );
    equal( kk.type(1), "number", "Number" );
    equal( kk.type(Number(1)), "number", "Number" );
    equal( kk.type(""), "string", "String" );
    equal( kk.type("a"), "string", "String" );
    equal( kk.type(String("a")), "string", "String" );
    equal( kk.type({}), "object", "Object" );
    equal( kk.type(/foo/), "regexp", "RegExp" );
    equal( kk.type(new RegExp("asdf")), "regexp", "RegExp" );
    equal( kk.type([1]), "array", "Array" );
    equal( kk.type(new Date()), "date", "Date" );
    equal( kk.type(new Function("return;")), "function", "Function" );
    equal( kk.type(function(){}), "function", "Function" );
    equal( kk.type(new Error()), "error", "Error" );
    equal( kk.type(window), "object", "Window" );
    equal( kk.type(document), "object", "Document" );
    equal( kk.type(document.body), "object", "Element" );
    equal( kk.type(document.createTextNode("foo")), "object", "TextNode" );

    if(!window.callPhantom){//this doesnt work on phantomjs
        equal( kk.type(document.getElementsByTagName("div")), "object", "NodeList" );
    }


    equal( kk.type(new Boolean(true)), "boolean", "Boolean" );
    equal( kk.type(new Number(1)), "number", "Number" );
    equal( kk.type(new String("a")), "string", "String" );
    equal( kk.type(new Object()), "object", "Object" );
});


test("kink.isFunction()", function() {

    var myfunction, fn, obj, nodes, first, input, a;

    // Make sure that false values return false
    ok( !kk.isFunction(), "No Value" );
    ok( !kk.isFunction( null ), "null Value" );
    ok( !kk.isFunction( undefined ), "undefined Value" );
    ok( !kk.isFunction( "" ), "Empty String Value" );
    ok( !kk.isFunction( 0 ), "0 Value" );

    // Check built-ins
    ok( kk.isFunction(String), "String Function("+String+")" );
    ok( kk.isFunction(Array), "Array Function("+Array+")" );
    ok( kk.isFunction(Object), "Object Function("+Object+")" );
    ok( kk.isFunction(Function), "Function Function("+Function+")" );

    // When stringified, this could be misinterpreted
    ok( !kk.isFunction("function"), "Function String" );

    // When stringified, this could be misinterpreted
    ok( !kk.isFunction([ "function" ]), "Function Array" );

    // When stringified, this could be misinterpreted
    myfunction = { "function": "test" };
    ok( !kk.isFunction(myfunction), "Function Object" );

    // Make sure normal functions still work
    fn = function(){};
    ok( kk.isFunction(fn), "Normal Function" );
    ok( kk.isFunction(function(){}), "Normal Function" );


    // Normal elements are reported ok everywhere
    ok( !kk.isFunction(document.body.firstChild), "A normal DOM Element" );

    a = document.createElement("a");
    a.href = "some-function";
    document.body.appendChild( a );

    // This serializes with the word 'function' in it
    ok( !kk.isFunction(a), "Anchor Element" );

    document.body.removeChild( a );

    // Recursive function calls have lengths and array-like properties
    function callme(callback){
        function fn(response){
            callback(response);
        }

        ok( kk.isFunction(fn), "Recursive Function Call" );

        fn({ some: "data" });
    }

    callme(function(){
        callme(function(){});
    });
});


test( "kink.isNumeric()", function() {

    var t = kk.isNumeric;
    var Traditionalists = function(n) {
            this.value = n;
            this.toString = function(){
                return String(this.value);
            };
        };
    var answer = new Traditionalists( "42" );
    var rong = new Traditionalists( "Devo" );

    ok( t("-10"), "Negative integer string");
    ok( t("0"), "Zero string");
    ok( t("5"), "Positive integer string");
    ok( t(-16), "Negative integer number");
    ok( t(0), "Zero integer number");
    ok( t(32), "Positive integer number");
    ok( t("040"), "Octal integer literal string");
    // OctalIntegerLiteral has been deprecated since ES3/1999
    // It doesn't pass lint, so disabling until a solution can be found
    ok( t(0144), "Octal integer literal");
    ok( t("0xFF"), "Hexadecimal integer literal string");
    ok( t(0xFFF), "Hexadecimal integer literal");
    ok( t("-1.6"), "Negative floating point string");
    ok( t("4.536"), "Positive floating point string");
    ok( t(-2.6), "Negative floating point number");
    ok( t(3.1415), "Positive floating point number");
    ok( t(8e5), "Exponential notation");
    ok( t("123e-2"), "Exponential notation string");
    ok( t(answer), "Custom .toString returning number");
    equal( t(""), false, "Empty string");
    equal( t("        "), false, "Whitespace characters string");
    equal( t("\t\t"), false, "Tab characters string");
    equal( t("abcdefghijklm1234567890"), false, "Alphanumeric character string");
    equal( t("xabcdefx"), false, "Non-numeric character string");
    equal( t(true), false, "Boolean true literal");
    equal( t(false), false, "Boolean false literal");
    equal( t("bcfed5.2"), false, "Number with preceding non-numeric characters");
    equal( t("7.2acdgs"), false, "Number with trailling non-numeric characters");
    equal( t(undefined), false, "Undefined value");
    equal( t(null), false, "Null value");
    equal( t(NaN), false, "NaN value");
    equal( t(Infinity), false, "Infinity primitive");
    equal( t(Number.POSITIVE_INFINITY), false, "Positive Infinity");
    equal( t(Number.NEGATIVE_INFINITY), false, "Negative Infinity");
    equal( t(rong), false, "Custom .toString returning non-number");
    equal( t({}), false, "Empty object");
    equal( t(function(){} ), false, "Instance of a function");
    equal( t( new Date() ), false, "Instance of a Date");
    equal( t(function(){} ), false, "Instance of a function");
});


test("kink.isWindow()", function() {

    ok( kk.isWindow(window), "window" );
    ok( kk.isWindow(document.getElementsByTagName("iframe")[0].contentWindow), "iframe.contentWindow" );
    ok( !kk.isWindow(), "empty" );
    ok( !kk.isWindow(null), "null" );
    ok( !kk.isWindow(undefined), "undefined" );
    ok( !kk.isWindow(document), "document" );
    ok( !kk.isWindow(document.documentElement), "documentElement" );
    ok( !kk.isWindow(""), "string" );
    ok( !kk.isWindow(1), "number" );
    ok( !kk.isWindow(true), "boolean" );
    ok( !kk.isWindow({}), "object" );
    ok( !kk.isWindow({ setInterval: function(){} }), "fake window" );
    ok( !kk.isWindow(/window/), "regexp" );
    ok( !kk.isWindow(function(){}), "function" );
});