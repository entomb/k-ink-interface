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