define(['kink.js'],function(kink){

    kink.extend({

        /**
         * @method kink.each()
         * @for kink
         * @param {Array} arr Array to iterate
         * @param {Function}  callback function to execute for each item.
         */
        each: function(arr,callback){
            return InkArray.each( InkArray.convert(arr) ,function(element,index){
                //@NOTE InkArray has no way of passing a 'this' context
                callback.call(element,index,element);
            });
        },

        /**
         * @method kink.some()
         * @for kink
         * @param {Array} arr Array to iterate
         * @param {Function}  callback function to execute for each item.
         */
        some: function(arr,callback){
            return InkArray.some( InkArray.convert(arr) ,function(element,index){
                return callback.call(element,index,element);
            });
        },

        /**
         * @method kink.map()
         * @for kink
         * @param {Array} arr Array to iterate
         * @param {Function}  callback function to execute for each item.
         */
        map: function(arr,callback) {
            var mapped = [];
            this.each(InkArray.convert(arr),function(element,index){
                var value = callback.call(element,index,element);
                if(value!==undefined && value!==null){
                    mapped.push(value);
                }
            });
            return mapped;
        },

        /**
         * @method kink.grep()
         * @for kink
         * @param {Array} arr Array to iterate
         * @param {Function}  callback function to execute for each item.
         */
        grep: function(arr,callback) {
            return InkArray.convert(arr).filter(function(element,index){
                return callback.call(element,index,element);
            });
        },

        /**
         * @method kink.makeArray()
         * @for kink
         * @param (mixed) target Item to converto to array.
         * @return {Array}
         */
        makeArray: function(target){
            return InkArray.convert(target);
        },

        /**
         * returns the position of the item inside an array. -1 if not found.
         *
         * @method kink.inArray()
         * @for kink
         * @param {mixed} item needle
         * @param {array} arr haystack
         */
        inArray: function(item, arr) {
            var i = this.keyValue(item,arr,true);
            return (i!==false) ? i : -1; // -1 is here to replicate Array.indexOf
        },

        /**
         * returns the exact position of an item inside an array. false if not found. can return more then onde position if stopAtFirst is falase
         *
         * @method kink.keyValue()
         * @for kink
         * @param {mixed} item needle
         * @param {array} arr haystack
         * @param {bool} stopAtFirst return only one position, if false, will return an array of indexes
         * @return {int|array} position of the needle in the haystack
         */
        keyValue: function(item,arr,stopAtFirst){
            return InkArray.keyValue(item,arr,stopAtFirst);
        },


        /**
         * Merge two arrays and return the result
         *
         * @method kink.merge()
         * @for  kink
         * @param  {array} arr1 target
         * @param  {array} arr2 source
         * @return {array} arr1+arr2
         */
        merge: function(arr1,arr2){
            arr1 = this.makeArray(arr1);
            arr2 = this.makeArray(arr2);

            for(var i in arr2){
                arr1.push(arr2[i]);
            }

            return arr1;
        },


        /**
         * Intersect two arrays and return the result
         *
         * @method kink.intersect()
         * @for  kink
         * @param  {array} arr1 target
         * @param  {array} arr2 source
         * @return {array} arr1+arr2
         */
        intersect: function(arr1,arr2){
            arr1 = this.makeArray(arr1);
            arr2 = this.makeArray(arr2);

            return InkArray.intersect(arr1,arr2);
        },

        /**
         * removes duplicares in an array
         *
         * @method kink.unique()
         * @for  kink
         * @param  {array} arr source
         * @return {array} unique elements from arr
         */
        unique: function(arr){

            arr = this.makeArray(arr);

            return this.grep(arr,function(element,index){
                return (kink.inArray(element,arr)===index);
            });

        }


    });


    /**
     * @module Array
     * @for kResult
     */



});