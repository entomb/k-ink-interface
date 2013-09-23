/**
 * Testing css Methos
*/
module('CSS');
test(".addClass()",function(){

    kk('#title').addClass('newClass');
    equal(h1.className, 'newClass', 'adding single class');

    kk('#title').addClass(['Class2','Class3']);
    equal(h1.className, 'newClass Class2 Class3', 'adding multiple classes');

    kk('ul').addClass('ulList');
    deepEqual([ul1.className,ul2.className], ['list ulList','list ulList'], 'adding multiple classes');

});

test(".removeClass()",function(){

    kk('#title').removeClass();
    equal(h1.className, '', 'remove all classes');

    kk('#title').addClass('newClass');
    kk('#title').removeClass('newClass');
    equal(h1.className, '', 'remove single classes');

    kk('#title').addClass(['Class2',"Class3"]);
    kk('#title').removeClass(['Class2',"Class3"]);
    equal(h1.className, '', 'remove multiple classes');


    kk('ul').addClass('ulList')
    kk('ul').removeClass('ulList');
    deepEqual([ul1.className,ul2.className], ['list','list'], 'remove from multiple elements');

});

test(".hasClass()",function(){

    kk('#title').addClass('newClass');
    ok(kk('#title').hasClass('newClass'), 'from single element');

    ok(kk('ul').hasClass('list'), 'from multiple true elements');

    ok(kk('li').hasClass('last'), 'from some true elements');

    ok(!kk('li').hasClass('someNonExistingClass'), 'should be false');

});

test(".setClass()",function(){

    kk('#title').setClass('anotherNewClass');
    equal(h1.className, 'anotherNewClass', 'set element className');

});

test(".class()",function(){

    kk('#title').removeClass();
    kk('#title').setClass('foo');
    equal(kk('#title').class(), 'foo', 'set and get single className');

    kk('#title').removeClass();
    kk('#title').setClass('foo bar');
    equal(kk('#title').class(), 'foo bar', 'set and get multi classNames');

});

test(".style()",function(){

    h1.style.color="red";
    equal(kk('#title').style(), 'color: red;', 'get the style');

    kk('#title').style('color: blue;')
    equal(kk('#title').style(), 'color: blue;', 'set the style');

    kk('#title').style('display: block;')
    equal(kk('#title').style(), 'color: blue; display: block;', 'append another style');

    kk('#title').style('')
    equal(kk('#title').style(), '', 'clear all styles');

});

test(".css()",function(){

    kk('#title').css('color','red');
    equal(h1.style.color, 'red', 'set by pair of strings');

    equal(kk('#title').css('color'), 'red', 'get by string');

    kk('#title').css({color:'blue'});
    equal(h1.style.color, 'blue', 'set by css object');

    ok(kk([1,2,3]).css({color:'wtf'}),'ignore non htmlElements');

});

/*
test(".visible()",function(){
ok(true);
});


test(".hide()",function(){
ok(true);
});

test(".show()",function(){
ok(true);
});

test(".showHide()",function(){
ok(true);
});

test(".toggle()",function(){
ok(true);
});
*/
