/**
 * @module Ink.Plugin.Kink_1
 * @author entomb ( https://github.com/entomb/k-ink-interface ) and ported by inkdev AT sapo.pt
 * @version 1
 *
 * @license http://opensource.org/licenses/MIT

The MIT License (MIT)

Copyright (c) 2013 Jonathan Tavares and other contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

 */
Ink.createModule('Ink.Plugin.Kink',1,[
    'Ink.Dom.Browser_1',
    'Ink.Dom.Selector_1',
    'Ink.Dom.Event_1',
    'Ink.Dom.Element_1',
    'Ink.Dom.Css_1',
    'Ink.Dom.Loaded_1', // DOM
    'Ink.Util.Array_1',
    'Ink.Util.Url_1',
    'Ink.Util.String_1',
    'Ink.Util.Date_1',
    'Ink.Util.Cookie_1',
    'Ink.Net.Ajax',
    'Ink.Net.JsonP'
],function(
    InkBrowser,
    InkSelector,
    InkEvent,
    InkElement,
    InkCss,
    InkLoaded,
    InkArray,
    InkUrl,
    InkString,
    InkDate,
    InkCookie,
    InkAjax,
    InkJsonP
){

    /**
     * Kink Constructor
     */
    var kink = function(a,b){
        return new kink.result(a,b);
    };

    /**
     * Kink resultset constructor
     */
    kink.result = function(param,context){

        if(!param){ //revent fuckups
            return this;
        }else if(param instanceof Array){ //direct array
            var rArray = param;

        }else if(typeof param === 'string'){ //query selector
            var context = (context==undefined) ?  document : context;
            var rArray = InkSelector.select(param,context);

        }else if(param instanceof Function){ //exec function
            return kink(param(context));

        }else{ //fallback
            var rArray = kink([param]);
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
    kink.result.prototype = new Array();

    /**
     * Kink extend()
     */
    kink.extend = function(extendObj,paramObj){
        if(paramObj==undefined){
            Ink.extendObj(kink,extendObj);
        }else{
            return Ink.extendObj(extendObj,paramObj);
        }

        return this;
    }

    kink.result.extend = function(obj){
        kink.extend(kink.result.prototype,obj);
    }




    /*
      Resultset navigation
     */
    kink.result.extend({

        result: function(i) {
            return (i!=undefined) ? this[parseInt(i)] : InkArray.convert(this);
        },

        get: function(i){
            return kink(this.result(i));
        },

        last: function() {
            return kink(this.result(this.length-1));
        },

        first: function() {
            return kink(this.result(0));
        }
    });

    /**
     * mapping a core InkJS function
     */
    kink.extend({
        each: function(arr,callback){
            InkArray.each(arr,callback);
            return kink(arr);
        }
    });

    /**
     * mapping a kink function to the resultset
     */
    kink.result.extend({
        each: function(callback){
            return kink.each(this,callback);
        }
    });




    //window.kResult = kResult;
    window.kk = kink;
    return kink;
});
