define(['kink.js'],function(kink){

    /**
     * @extends KinkResult
     * @uses  Ink.Dom.Element
     *
     * Dom and element
    */


    /**
     * checks all element for given attributes and returns true/false if any
     *
     * @returns {bool}
     */
    kink.result.extend({
        hasAttribute: function(attr){
            return this.some(function(){
                return InkElement.hasAttribute(attr);
            });
        },

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
                if(elem!==undefined && elem.getAttribute!==undefined && InkElement.hasAttribute(elem,attr)){
                    return elem.getAttribute(attr);
                }else{
                    return null;
                }

            }
        },

        name: function(value){
            return this.attr('name',value);
        },

        id: function(value){
            return this.attr('id',value);
        },

        tag: function(){
            var elem = this.get(0);
            if(elem!==undefined){
                return this.get(0).nodeName.toUpperCase() || null;
            }else{
                return null;
            }
        },


        offset: function(){
            var offset2 = InkElement.offset2(this.get(0));
            return {
                top:    offset2[1],
                left:   offset2[0]
            };
        },

        /**
         * returns the first element size
         *
         * @uses  Ink.Dom.Element.elementDimensions
         */
        size: function(){
            return InkElement.elementDimensions(this.get(0));
        },

        /**
         * returns the first element height
         *
         * @uses  Ink.Dom.Element.elementHeight
         */
        height: function(){
            return InkElement.elementHeight(this.get(0));
        },

        /**
         * returns the first element width
         *
         * @uses  Ink.Dom.Element.elementWidth
         */
        width: function(){
            return InkElement.elementWidth(this.get(0));
        },



        /**
         * alias for the scroll function
         *
         * @uses  Ink.Dom.Element.scroll
         */
        scroll: function(){
            return InkElement.scroll(this.get(0));
        },

        /**
         * alias for the scrollTo function
         *
         * @uses  Ink.Dom.Element.scrollTo
         */
        scrollTo: function(){
            return InkElement.scrollTo(this.get(0));
        },

     /*

    checked
    data

    html

    size

    value
    */

    });

});



