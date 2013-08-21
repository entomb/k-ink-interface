/**
 * This file will use some native JS to select some static html elements and place them on a global scope.
 * This will allow to check if k(Ink) is acting correctly without rellying on k(Ink) itself.
 *
 * @Note: this looks sloppy, if you have a better way please pull-request!
 * 
 */

var tester = document.getElementById('tester');
var tester_inputs = document.getElementById('tester_inputs');

var ul1 = document.getElementById('ul1');
var ul2 = document.getElementById('ul2');

var li1  = document.getElementById('li1');
var li2  = document.getElementById('li2');
var li3  = document.getElementById('li3');
var li4  = document.getElementById('li4');
var li5  = document.getElementById('li5');
var li6  = document.getElementById('li6');
var li7  = document.getElementById('li7');
var li8  = document.getElementById('li8');
var li9  = document.getElementById('li9');
var li10 = document.getElementById('li10');
var li11 = document.getElementById('li11');

var a1   = document.getElementById('a1');
var a2   = document.getElementById('a2');
var a3   = document.getElementById('a3');
var a4   = document.getElementById('a4');
var a5   = document.getElementById('a5');
var a6   = document.getElementById('a6');
var a7   = document.getElementById('a7');
var a8   = document.getElementById('a8');
var a9   = document.getElementById('a9');
var a10  = document.getElementById('a10');

var select1 = document.getElementById('select1');
var opt1 = document.getElementById('opt1');
var opt2 = document.getElementById('opt2');
var opt3 = document.getElementById('opt3');
var opt4 = document.getElementById('opt4');
var opt5 = document.getElementById('opt5');
var input1 = document.getElementById('input1');
var input2 = document.getElementById('input2');
var check1 = document.getElementById('check1');
var check2 = document.getElementById('check2');
var textarea1 = document.getElementById('textarea1');

var allLi1 = [li1,li2,li3,li4,li5,li6];
var allLi2 = [li7,li8,li9,li10,li11];
var allLi = [li1,li2,li3,li4,li5,li6,li7,li8,li9,li10,li11];
var allA = [a1,a2,a3,a4,a5,a6,a7,a8,a9,a10];

/**
 * Sets a nice output for QUnit (important when using phantomjs)
 */
console.log("+-------------------------------+");
console.log("+ Running unit tests for k(Ink) +")
console.log("+-------------------------------+");
console.log("   (✔/✖) [module name] ");
console.log("--------------------------------");


QUnit.testDone(function(r) {

    if(r.failed==0){
      var sign = "\033[32m ✔\033[0m";
    }else{
      var sign = "\033[31m ✖\033[0m";;
    }

    console.log(sign+" ("+r.passed+"/"+r.failed+")"+" [\033[36m"+r.module+"\033[0m] "+r.name);
});