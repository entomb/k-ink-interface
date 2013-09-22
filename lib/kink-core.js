define([],function(){

    /**
     * @class Kink
     *
     * @constructor
     * @param {mixed} param
     * @param {mixed} context
     * @private
     */
    var kink = function(param,context){
        return new kink.result(param,context);
    };

    /**
     * @class kinkResult
     *
     * @constructor
     * @param {mixed} param
     * @param {mixed} context
     * @private
     */
    kink.result = function(param,context){
        var rArray = [];

        if(!param){ //revent fuckups
            return this;
        }else if(param instanceof Array){ //direct array
            rArray = param;

        }else if(typeof param === 'string'){ //query selector
            rArray = InkSelector.select(param, context || document);
        }else if(param instanceof Function){ //exec function
            return kink(param(context));

        }else if(param instanceof kink.result){ //recursive much?
            return param;

        }else{ //fallback
            rArray = kink([param]);
        }

        //import resultArray into this
        for(var i in InkArray.convert(rArray)){
            this.push(rArray[i]);
        }

        //export full result object
        return kink.extend(this,{
            selector: param,
            context: context,
        });
    };

    //is this real life?
    kink.result.prototype = [];

    /**
     * Allows new methods to be gived to the Kink Object or the extention of another object
     * @param  {Object} extendObj
     * @param  {Object} paramObj
     * @return
     */
    kink.extend = function(extendObj,paramObj){
        if(paramObj===undefined){
            Ink.extendObj(kink,extendObj);
        }else{
            return Ink.extendObj(extendObj,paramObj);
        }
    };


    /**
     * Allows new methods to be gived to the kinkResult Object
     * @param  {Object} extendObj
     */
    kink.result.extend = function(obj){
        kink.extend(kink.result.prototype,obj);
    };



});


