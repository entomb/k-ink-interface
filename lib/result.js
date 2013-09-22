define(['kink.js'],function(kink){

    /**
     * Basic result navigation
     *
     */
    kink.result.extend({

        get: function(i) {
            return (i!==undefined) ? this[parseInt(i,10)] : InkArray.convert(this);
        },

        result: function(i){
            return kink(this.get(i));
        },

        last: function() {
            return kink(this.result(this.length-1));
        },

        first: function() {
            return kink(this.result(0));
        }

    });


    kink.result.extend({


        /**
         * finds elements inside each element of a result set.
         *
         * @chainable
         */
        find: function(selector){
            var foundElements = [];
            this.each(function(elem){
                kink(selector,elem).each(function(childElem){
                    if(!InkArray.inArray(childElem,foundElements)){
                        foundElements.push(childElem);
                    }
                });
            });

            return kink(foundElements);
        },


        /**
         * gets the all the childs for each element in a result set.
         *
         * @uses Ink.Dom.Element.siblings
         * @chainable
         */
        siblings: function(){
            var foundElements = [];
            this.each(function(elem){
                var elemFilter = InkElement.siblings(elem);
                if(elemFilter){
                    InkArray.each(elemFilter,function(elemSibling){
                        if(!InkArray.inArray(elemSibling,foundElements)){
                            foundElements.push(elemSibling);
                        }
                    });
                }
            });

            return kink(foundElements);
        },


        /**
         * gets the next element for each element in a result set.
         *
         * @uses Ink.Dom.Element.nextElementSibling
         * @chainable
         */
        next: function(){
            var foundElements = [];
            this.each(function(elem){
                var elemFilter = InkElement.nextElementSibling(elem);
                if(elemFilter && !InkArray.inArray(elemFilter,foundElements)){
                    foundElements.push(elemFilter);
                }
            });
            return kink(foundElements);
        },


        /**
         * gets the previous element for each element in a result set.
         *
         * @uses Ink.Dom.Element.previousElementSibling
         * @chainable
         */
        prev: function(){
            var foundElements = [];
            this.each(function(elem){
                var elemFilter = InkElement.previousElementSibling(elem);
                if(elemFilter && !InkArray.inArray(elemFilter,foundElements)){
                    foundElements.push(elemFilter);
                }
            });
            return kink(foundElements);
        },


        /**
         * gets the parent Nodes of a set of elements.
         *
         * @chainable
         */
        parent: function(){
            var foundParents = [];
            this.each(function(elem){
                if(elem.parentNode && !InkArray.inArray(elem.parentNode,foundParents)){
                    foundParents.push(elem.parentNode);
                }
            });

            return kink(foundParents);
        },


        /**
         * gets the childrenNodes of a set of elements.
         *
         * @chainable
         */
        childs: function(i){
            var foundElements = [];
            this.each(function(elem){
                var collection = InkArray.convert(elem.children);
                kink(collection).each(function(childElem){
                    if(childElem && !InkArray.inArray(childElem,foundElements)){
                        foundElements.push(childElem);
                    }
                });
            });

            if(typeof i !== 'number' && !i){
                return kink(foundElements);
            }else{
                return kink(foundElements).get(i);
            }
        }

    });

});