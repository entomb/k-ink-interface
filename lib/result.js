define(['kink.js'],function(kink){

    /**
     * @extends KinkResult
     * Basic result navigation
     *
     */
    kink.result.extend({

        /**
         * Gets all nodes or node[i] from a resultset
         *
         * @chainable
         */
        get: function(i) {
            return (i!==undefined) ? this[parseInt(i,10)] : InkArray.convert(this);
        },

        /**
         * gets a new resultset with only node[i]
         *
         * @chainable
         */
        result: function(i){
            return kink(this.get(i));
        },

        /**
         * gets a new resultset with only the last node
         *
         * @chainable
         */
        last: function() {
            return this.result(this.length-1);
        },

        /**
         * gets a new resultset with only the first node
         *
         * @chainable
         */
        first: function() {
            return this.result(0);
        },

        /**
         * finds elements inside each of the element on the result set.
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