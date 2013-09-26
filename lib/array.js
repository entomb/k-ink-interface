define(['kink.js'],function(kink){

    kink.extend({

        /**
         * @method kink.each()
         * @for kink
         */
        each: function(arr,callback){
            return InkArray.each( InkArray.convert(arr) ,function(element,index){
                //@NOTE InkArray has no way of passing a 'this' context
                callback.call(element,element,index,arr);
            });
        },

        /**
         * @method kink.some()
         * @for kink
         */
        some: function(arr,callback){
            return InkArray.some( InkArray.convert(arr) ,function(element,index){
                return callback.call(element,element,index,arr);
            });
        },

        /**
         * @method kink.filter()
         * @for kink
         */
        filter: function(arr,callback) {
            return arr.filter(function(element,index){
                callback.call(element,element,index);
            });
        },

        /**
         * @method kink.filter()
         * @for kink
         */
        map: function(arr,callback) {
            var mapped = [];
            this.each(arr,function(element,index){
                var value = callback.call(element,element,index);
                if(value!==undefined && value!==null){
                    mapped.push(value);
                }
            });
            return mapped;
        },

        /**
         * @method kink.filter()
         * @for kink
         */
        grep: function(arr,callback) {
            return this.map(arr,function(element,index){
                var value = callback.call(element,element,index);
                if(value){
                    return element;
                }else{
                    return null;
                }
            });
        },

        /**
         * @method kink.makeArray()
         * @for kink
         */
        makeArray: function(target){
            return InkArray.convert(target);
        },

        /**
         * @method kink.inArray()
         * @for kink
         */
        inArray: function(element, arr) {
            var i = this.keyValue(element,arr,true);
            return (i!==false) ? i : -1; // -1 is here to replicate Array.indexOf
        },

        keyValue: function(element,arr,stopAtFirst){
            return InkArray.keyValue(element,arr,stopAtFirst);
        },

        /**
         * @method kink.isArray()
         * @for kink
         */
        isArray: function(target){
            return (this.type(target)==="array");
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

        },


    });


    /**
     * @module Array
     * @for kResult
     */

    /**
     * @Class Array
     */
    kink.result.extend({

        /**
         * @method .each()
         */
        each: function(callback){
            kink.each(this,callback);
            return this;
        },

        /**
         * @method .some()
         */
        some: function(callback){
            return kink.some(this,callback);
        },

        /**
         * @method .makeArray()
         * @for kResult
         */
        toArray: function(){
            return this.get();
        },

        /**
         * @method .filter()

        some: function(option){

            if(option instanceof Function){

            }else{
                var filterElements = kink(option);
                this.filter(function(){
                });
            }
        }*/

    });



});