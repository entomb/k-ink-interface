define(['kink.js'],function(kink){

    /**
     * @module DOM
     * @for kResult
     */

    /**
     * @DOM Element
     *
     */
    kink.result.extend({

        /**
         * @method .remove()
         * @param  {string} selector elements to filter before the remove
         * @returns {kResult}
         * @chainable
         */
        remove: function(selector){
            if(kink.type(selector,'string')){
                return this.find(selector).each(function(i,elem){
                    elem.remove();
                });
            }else{
                return this.each(function(i,elem){
                    elem.remove();
                });
            }
        }


    });

});