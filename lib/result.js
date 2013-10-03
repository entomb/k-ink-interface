
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
            if(kink.type(i,'number')){
                i = parseInt(i,10);
                return  this[(i<0) ? this.length+i : i];
            }else{
                return InkArray.convert(this);
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
            return this.result(-1);
        },

        /**
         * Returns a resultset containing the 7 item.
         *
         * @method .first()
         * @return {kResult}
         */
        first: function() {
            return this.result(0);
        },

        /**
         * Iterates a resultset and executes a function for each element.
         * @method .each()
         */
        each: function(callback){
            kink.each(this,callback);
            return this;
        },


        /**
         * returns true if any of the elements match the callback.
         * @method .some()
         */
        some: function(callback){
            return kink.some(this,callback);
        },


        /**
         * slices the resultset from X to Y
         * @method .slice()
         */
        slice: function(from,to){
            return kink(this.get().slice(from,(to===undefined) ? this.length : parseInt(to,10)));
        },

        /**
         * alias to kResult.get()
         * @method .toArray()
         */
        toArray: function(){
            return this.get();
        },

        /**
         * filters the resultset to elements NOT matching the selector
         * @method .filter()
         */
        filter: function(option){
            var globalSearch = [];
            var foundElements = [];
            var grepper = function(i,elem){
                    return (InkArray.inArray(elem,globalSearch));
                };

            if(kink.type(option,'function')){
                grepper = option;
            }else{
                globalSearch = kink(option).get();
            }

            foundElements = kink.grep(this.get(),grepper);
            return kink(foundElements);
        },

        /**
         * filters the resultset to elements NOT matching the selector
         * @method .not()
         */
        not: function(option){
            var globalSearch = [];

            var grepper = function(i,elem){
                    return !(InkArray.inArray(elem,globalSearch));
                };

            if(kink.type(option,'function')){
                grepper = function(i,elem){
                    return !option.call(elem,i,elem);
                };
            }

            globalSearch = kink(option).get();
            return this.filter(grepper);
        },


        /**
         * checks the resultset against a selector and return true if any of the contents match
         * @method .is()
         */
        is: function(option){

            if(kink.type(option,'function')){
                return this.some(option);
            }else{
                var globalSearch = kink(option).get();
                return this.some(function(i,elem){
                    return (InkArray.inArray(elem,globalSearch));
                });
            }
        },


        /**
         * filters a result by checking if a match is found in its children
         * @method .has()
         */
        has: function(option){
            if(kink.isDOM(option)){
                return this.filter(function(i,elem){
                    return InkElement.isAncestorOf(elem,option);
                });
            }else{
                return this.filter(function(i,elem){
                    return (kink(option,elem).length>0);
                });
            }
        },




        /**
         * searches for elements using the `selector` param inside each of the current elements of the resultset
         *
         * @method .find()
         * @param {string} selector css selector to search for
         * @return {kResult}
         */
        find: function(selector){

            if(selector instanceof kink.result){
                var currentItems = this;
                return selector.filter(function(i,selectorItem){
                        return currentItems.some(function(k,currentItem){
                            return InkElement.isAncestorOf(currentItem,selectorItem);
                        });
                    });
            }

            var foundElements = [];
            this.each(function(i,elem){
                 kink(selector,elem).each(function(k,childElem){
                     if(!InkArray.inArray(childElem,foundElements)){
                         foundElements.push(childElem);
                     }
                 });
            });

            return kink(foundElements);

        },

        /**
         * Filters a resultset so it holds ONLY valid DOM elements.
         *
         * @todo implement this on all DOM specific methods
         *
         * @mthod .dom()
         * @return {kResult}
         */
        dom: function(){
            return this.filter(function(i,elem){
                return kink.isDOM(elem);
            });
        },




    });

});