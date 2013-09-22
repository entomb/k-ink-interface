define(['kink.js'],function(kink){

    /**
     * mapping a core InkJS function
     */
    kink.extend({
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

        some: function(arr,callback){
            return InkArray.some( InkArray.convert(arr) ,callback);
        }

    });

    kink.result.extend({
        each: function(callback){
            kink.each(this,callback);
            return this;
        },

        some: function(callback){
            return kink.some(this,callback);
        }

    });



});