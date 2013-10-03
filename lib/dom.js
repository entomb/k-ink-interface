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
        remove: function(selector, allowDetach){

            var elems = selector!==undefined ? kink(selector,this) : this;
            return kink.each(elems,function(i,elem){
                if(allowDetach===undefined){
                    elem.remove();
                }else{
                    var newParent = document.createDocumentFragment();
                    this.appendTo(newParent);
                }
            });

        },


        /**
         * @method .detach()
         * @param  {string} selector elements to filter before the remove
         * @returns {kResult}
         * @chainable
         */
        detach: function(selector){
            var elems = selector!==undefined ? kink(selector,this) : this;
            return kink.each(elems,function(i,elem){
                var newParent = document.createDocumentFragment();
                elem.appendTo(newParent);
            });
        },

        /**
         * will move all items in the resultset to the a new parent. if the selector is a string, will append to first result
         *
         * @method .appendTo
         * @param  {string} selector selector for the new parent
         * @return {kResult}
         * @chainable
         */
        appendTo: function(selector){
            var newParent = kink(selector).get(0);
            return this.each(function(i,elem){
                newParent.appendChild(elem);
            });
        },


        prependTo: function(selector){
            var newParent = kink(selector).get(0);
            return this.each(function(i,elem){
                InkElement.insertTop(newParent,elem);
            });
        },



        after: function(param){
            return this.each(function(i,target){
                kink(param,null).each(function(k,elem){
                    InkElement.insertAfter(elem,target);
                });
            });
        },

        before: function(param){
            return this.each(function(i,target){
                kink(param,null).each(function(k,elem){
                    target.parentNode.insertBefore(elem,target);
                });
            });
        },


        append: function(param){
            if(kink.type(param,'string')){
                return this.each(function(i,elem){
                    InkElement.appendHTML(elem,param);
                });
            }else{
                return this.each(function(i,target){
                    kink(param).appendTo(target);
                });
           }
        },

        prepend: function(param){
            if(kink.type(param,'string')){
                this.each(function(i,elem){
                    InkElement.prependHTML(elem,param);
                });
            }else{
                this.each(function(i,target){
                    kink(param).prependTo(target);
                });
           }
        }



    });

});