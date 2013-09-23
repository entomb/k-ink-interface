define(['kink.js'],function(kink){

    /**
     * @extends KinkResult
     * @uses  Ink.Dom.Element
     *
     * Dom and element
    */



    kink.result.extend({

        /**
         * Setter and getter for attributes
         *
         * @chainable
         */
        attr: function(attr,value){
            if(value !== undefined){
                return this.each(function(elem){
                    if(elem.setAttribute!==undefined){
                        elem.setAttribute(attr,value);
                    }
                });
            }else{
                var elem = this.get(0);
                if(elem!==undefined && elem.getAttribute!==undefined && Element.hasAttribute(elem,attr)){
                    return elem.getAttribute(attr);
                }else{
                    return null;
                }

            }
        },

        name: function(value){
            return this.attr('name',value);
        }

        id: function(value){
            return this.attr('id',value.replace("#",""));
        }


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
    checked
    data
    hasAttribute

    height
    width
    html

    position
    scroll
    scrollTo
    size
    tag
    value
    */


});



