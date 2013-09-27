
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
         * alias to kResult.get()
         * @method .some()
         */
        toArray: function(){
            return this.get();
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
         * @method .childs()
         */
        childs: function(i){
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

            if(typeof i !== 'number' && !i){
                return kink(foundElements);
            }else{
                return kink(foundElements).get(i);
            }
        },

        filter: function(option){
            var globalSearch = [];
            var foundElements = [];
            var grepper = function(i,elem){
                    return (InkArray.inArray(elem,globalSearch));
                };

            if(kink.type(option,'function')){
                grepper = option;
            }

            if(kink.type(option,'string')){
                //todo: optimize this with .is()
                globalSearch = kink(option).get();
            }

            if(kink.type(option,'array')){
                globalSearch = option;
            }

            if(option instanceof kink.result){
                globalSearch = option.get();
            }

            foundElements = kink.grep(this.toArray(),grepper);
            return kink(foundElements);
        }

    });

});