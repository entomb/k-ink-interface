define(['kink.js'],function(kink){

    /**
     * @module Element
     * @for kResult
     */

    /**
     * @Class Element
     *
     */
    kink.result.extend({

        /**
         * @method .siblings()
         */
        siblings: function(){
            var foundElements = [];
            this.each(function(i,elem){
                var elemFilter = InkElement.siblings(elem);
                if(elemFilter){
                    kink.each(elemFilter,function(k,elemSibling){
                        if(!InkArray.inArray(elemSibling,foundElements)){
                            foundElements.push(elemSibling);
                        }
                    });
                }
            });

            return kink(foundElements);
        },


        /**
         * @method .next()
         */
        next: function(){
            var foundElements = [];
            this.each(function(i,elem){
                var elemFilter = InkElement.nextElementSibling(elem);
                if(elemFilter && !InkArray.inArray(elemFilter,foundElements)){
                    foundElements.push(elemFilter);
                }
            });
            return kink(foundElements);
        },


        /**
         * @method .prev()
         */
        prev: function(){
            var foundElements = [];
            this.each(function(i,elem){
                var elemFilter = InkElement.previousElementSibling(elem);
                if(elemFilter && !InkArray.inArray(elemFilter,foundElements)){
                    foundElements.push(elemFilter);
                }
            });
            return kink(foundElements);
        },


        /**
         * @method .parent()
         */
        parent: function(){
            var foundParents = [];
            this.each(function(i,elem){
                if(kink.type(elem,'object') && elem.parentNode && !InkArray.inArray(elem.parentNode,foundParents)){
                    foundParents.push(elem.parentNode);
                }
            });

            return kink(foundParents);
        },


        /**
         * @method .children()
         */
        children: function(){
            var foundElements = [];
            this.each(function(i,elem){
                if(kink.type(elem,'object')){
                    var collection = InkArray.convert(elem.children);
                    kink(collection).each(function(k,childElem){
                        if(childElem && !InkArray.inArray(childElem,foundElements)){
                            foundElements.push(childElem);
                        }
                    });
                }
            });

            return kink(foundElements);
        },

        /**
         * @method  .hasAttribute()
         *
         */
        hasAttribute: function(attr){
            return this.some(function(i,elem){
                return InkElement.hasAttribute(elem,attr);
            });
        },

        /**
         * @method  .attr()
         *
         */
        attr: function(attr,value){
            if(value !== undefined){
                return this.each(function(i,elem){
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


        /**
         * @method  .name()
         *
         */
        name: function(value){
            return this.attr('name',value);
        },


        /**
         * @method  .id()
         *
         */
        id: function(value){
            return this.attr('id',value);
        },


        /**
         * @method  .tag()
         *
         */
        tag: function(){
            var elem = this.get(0);
            if(elem!==undefined){
                return this.get(0).nodeName.toUpperCase() || null;
            }else{
                return null;
            }
        },


        /**
         * @method  .offset()
         *
         */
        offset: function(){
            var offset2 = InkElement.offset2(this.get(0));
            return {
                top:    offset2[1],
                left:   offset2[0]
            };
        },


        /**
         * @method  .size()
         *
         */
        size: function(){
            return InkElement.elementDimensions(this.get(0));
        },

        /**
         * @method  .height()
         *
         */
        height: function(){
            return InkElement.elementHeight(this.get(0));
        },


        /**
         * @method  .width()
         *
         */
        width: function(){
            return InkElement.elementWidth(this.get(0));
        },


        /**
         * @method  .scroll()
         *
         */
        scroll: function(){
            return InkElement.scroll(this.get(0));
        },


        /**
         * @method  .scrollTo()
         *
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



