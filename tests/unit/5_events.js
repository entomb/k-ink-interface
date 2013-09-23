/**
 * @uses  sinon.js
 * Testing event bind and fire.
 */
/*
module("events");
test('.bind() and alias', function(){
      var fnEvent = sinon.spy();

      kk("#li2").click(fnEvent).click();

      equal(fnEvent.calledOnce, true,".click() on single item");


      kk(".first").click(fnEvent);

      kk('#li1').click();
      kk('#li7').click();

      equal(fnEvent.callCount, 3,".click() on multi item");

      kk("ul").bind('click','.last',fnEvent);

      kk("#li6").click();
      kk("#li11").click(); //should count 2 because its inside li6


      equal(fnEvent.callCount, 6,".click() using scope selector");


      kk("#li2").click();
      equal(fnEvent.callCount, 7,"firing 1st events again using .click()");

      kk("#li1").click();
      equal(fnEvent.callCount, 8,"firing 2nd events again using .click()");

      kk("#a1").hover(fnEvent,fnEvent);

      kk('#a1').on('mouseover');
      kk('#a1').on('mouseout');

      equal(fnEvent.callCount, 10,".hover() in and out");

});
*/