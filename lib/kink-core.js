define([],function(){

    /**
     * @class kink
     * @module kink
     * @main kink
     * @param {mixed} param input parameter
     * @param {mixed} [context] context parameter
     * @return {kink.result} New kink.result object
     * @static
     * @description

    Main Kink Class. Acts as a factory for kResult objects and holds core functions
    #`kink() == window.kk() == window.kink()`

        //string
        kk('div')

        kk('div#mastodon')

        kk('ul li a.active')

        //array
        kk([1,2,3])

        //kResult object
        var parent = kk('div')
        kk(parent)

        //dom element
        kk(document.body)

        //function
        kk(function(){
            return "a.selected";
        })

        kk(function(context){
            return [1,2,3];
        },context)

    **/
    var kink = function(param,context){
        return new kink.result(param,context);
    };

    /**
     * Kink Result Object, holds resultsets and methods
     *
     * @main kResult
     * @class kResult
     * @uses Resultset
     * @uses Array
     * @uses Element
     * @uses CSS
     * @module kink
     * @param {mixed} param input parameter
     * @param {mixed} [context] context parameter
     * @constructor
     * @return {kink.result} kink.result object
    */
    kink.result = function(param,context){
        var rArray = [];

        if(!param){ //revent fuckups
            return this;
        }else if(param instanceof Array){ //direct array
            rArray = param;

        }else if(typeof param === 'string'){ //query selector
            rArray = InkSelector.select(param, context);
        }else if(param instanceof Function){ //exec function

            return kink(param(context || kink));

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
     * @method kink.extend()
     * @for    kink
     * @final
     * @param  {Object}   extendObj the destination object or the object to extend `kink`
     * @param  {Object}   [paramObj] the origin object
     * @param  {Function} [cb] a callback function to be called after the merge
     * @return  {Mixed}
     * @description

    Extends the `kink` object method tree or any input object

    ###extend the `kink` core

        kink.extend({
            someMethod:function(){
             //code
            }
        })


    ###extend another object

        kink.extend({foo:1},{bar:2});

        //returns {foo:1,bar:2}


    ###using the callback

        kink.extend({
            doSomething: function(){
                //code here
            }
        },function(){
            kink.doSomething();
        });

    **/
    kink.extend = function(extendObj,paramObj,cb){

        //optional callback function
        if(cb===undefined && paramObj instanceof Function){
            cb = paramObj;
            paramObj = undefined;
        }

        if(paramObj===undefined){
            if('result' in extendObj){ //protect kink.result
                throw("Error extending kink: result is a reserved word");
            }
            if('extend' in extendObj){ //protect kink.extend and kink.result.extend
                throw("Error extending kink: extend is a reserved word");
            }

            //extend {kink + extendObj}
            Ink.extendObj(kink,extendObj);

            if(cb instanceof Function){
                cb.call(this,this);
            }
            return this;
        }else{
            //extend {extendObj + paramObj}
            Ink.extendObj(extendObj,paramObj);

            if(cb instanceof Function){
                cb.call(this,extendObj);
            }

            return extendObj;
        }
    };



    /**
     *
     * @method .extend()
     * @for    kResult
     * @final
     * @param  {Object}   object to extend `kResult`
     * @param  {Function} [cb] a callback function to be called after the merge
     * @return {kResult}
     * @chainable
     * @description

    Extends the `kResult` object method tree or any input object
    ###extend the `kResult` method tree

        kink.result.extend({
            someMethod:function(){
             //code
            }
        })

    ###using the callback

        kink.resultextend({
            doSomething: function(){
                return this.each(function(element){
                    //code here
                });
            }
        },function(){
            kink('.something).doSomething();
        }):

    **/
    kink.result.extend = function(extendObj,callback){
        if('result' in extendObj){ //protect kink.extend and kink.result.extend
            //throw("Error extending kink.result: extend is a reserved word");
        }
        kink.extend(kink.result.prototype,extendObj,callback);
    };



});


