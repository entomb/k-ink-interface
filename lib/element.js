define(['kink.js'],function(kink){

    /**
     * @extends KinkResult
     * @uses  Ink.Dom.Element
     *
     * Dom and element
    */



    kink.result.extend({
        offset: function(){
            var offset2 = InkElement.offset2(this.get(0));
            return {
                top:    offset2[1],
                left:   offset2[0]
            };
        }

    });

     /*
    absolutePosition
    attribute
    checked
    data
    hasAttribute
    height
    html
    id
    name
    position
    scroll
    scrollTo
    size
    tag
    value
    width
    */


});



