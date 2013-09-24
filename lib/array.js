define(['kink.js'],function(kink){



    kink.extend({

        /**
         * @method kink.each()
         * @for kink
         */
        each: function(arr,callback){
            return InkArray.each( InkArray.convert(arr) ,callback);
            /*

                @NOTE InkArray has no way of passing a 'this' context

                var array = InkArray.convert(input) || [];
                for(var i; i<=array.length; i++){
                    callback.call(array[i], array[i], i, array);
                }
                return this;

            */
        },

        /**
         * @method kink.some()
         * @for kink
         */
        some: function(arr,callback){
            return InkArray.some( InkArray.convert(arr) ,callback);
        }

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
        }

    });



});