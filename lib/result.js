
define(['kink.js'],function(kink){


    /**
     * @module Resultset
     * @for kResult
     */

    /**
     * @Class Resultset
     */
    kink.result.extend({

        /**
         * Returns item in the position `i` or all if `i` is undefined
         *
         * @method .get()
         * @param  {int|undefined} [i=undefined] index position. suports negative indexes.
         * @return {Mixed}  Returns the literal element for the position `i` or all of them
         */
        get: function(i) {
            if(i === undefined || typeof i !== 'number'){
                return InkArray.convert(this);
            }else{
                i = parseInt(i,10);
                return  this[(i<0) ? this.length+i : i];
            }
        },

        /**
         * Returns another `kResult` containing the item in the position `i` or all if `i` is undefined
         *
         * @method .result()
         * @param  {int|undefined} [i=undefined] index position. suports negative indexes.
         * @return {kResult}
         */
        result: function(i){
            return kink(this.get(i));
        },

        /**
         * Alias for `.result()`, this is here for a more familiar syntax.
         *
         * @method .eq()
         * @param  {int|undefined} [i=undefined] index position. suports negative indexes.
         * @return {kResult}
         */
        eq: function(i){
            return this.result(i);
        },

        /**
         * Returns a resultset containing the last item.
         *
         * @method .last()
         * @return {kResult}
         */
        last: function() {
            return this.result(this.length-1);
        },

        /**
         * Returns a resultset containing the first item.
         *
         * @method .first()
         * @return {kResult}
         */
        first: function() {
            return this.result(0);
        },

        /**
         * searches for elements using the `selector` param inside each of the current elements of the resultset
         *
         * @method .find()
         * @param {string} selector css selector to search for
         * @return {kResult}
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
         * @method .siblings()
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
         * @method .next()
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
         * @method .prev()
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
         * @method .parent()
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
         * @method .childs()
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