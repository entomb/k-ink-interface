define(['kink.js'],function(kink){

    /**
     * @extends Kink
     * @uses  Ink.Util.Array
     *
     * Array iterators and filter methods
     */
    kink.extend({

        /**
         * Executes a callback fore element of an array
         *
         * @uses Ink.Util.Array.each
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
         * Executes a callback for each element of an array and returns (bool) if any callback returned true
         *
         * @uses Ink.Util.Array.some
         * @return {bool}
         */
        some: function(arr,callback){
            return InkArray.some( InkArray.convert(arr) ,callback);
        }

    });


    /**
     * @extends KinkResult
     *
     * Resultset iterators and filter methods
     */
    kink.result.extend({

        /**
         * Calls kink.each using the current resultset as a paramenter
         *
         * @chainable
         */
        each: function(callback){
            kink.each(this,callback);
            return this;
        },

        /**
         * Calls kink.some using the current resultset as a paramenter
         *
         * @return {bool}
         */
        some: function(callback){
            return kink.some(this,callback);
        }

    });



});