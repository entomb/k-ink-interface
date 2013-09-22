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






    /**
     * Basic result navigation
     *
     */
    kink.result.extend({

        get: function(i) {
            return (i!==undefined) ? this[parseInt(i,10)] : InkArray.convert(this);
        },

        result: function(i){
            return kink(this.get(i));
        },

        last: function() {
            return kink(this.result(this.length-1));
        },

        first: function() {
            return kink(this.result(0));
        }

    });


    kink.result.extend({


        /**
         * finds elements inside each element of a result set.
         *
         * @chainable
         */
        find: function(selector){
            var foundElements = [];
            this.each(function(elem){
                kink(selector,elem).each(function(childElem){
                    if(!InkArray.inArray(childElem,foundElements)){
                        foundElements.push(childElem);
                    }
                });
            });

            return kink(foundElements);
        },


        /**
         * gets the all the childs for each element in a result set.
         *
         * @uses Ink.Dom.Element.siblings
         * @chainable
         */
        siblings: function(){
            var foundElements = [];
            this.each(function(elem){
                var elemFilter = InkElement.siblings(elem);
                if(elemFilter){
                    InkArray.each(elemFilter,function(elemSibling){
                        if(!InkArray.inArray(elemSibling,foundElements)){
                            foundElements.push(elemSibling);
                        }
                    });
                }
            });

            return kink(foundElements);
        },


        /**
         * gets the next element for each element in a result set.
         *
         * @uses Ink.Dom.Element.nextElementSibling
         * @chainable
         */
        next: function(){
            var foundElements = [];
            this.each(function(elem){
                var elemFilter = InkElement.nextElementSibling(elem);
                if(elemFilter && !InkArray.inArray(elemFilter,foundElements)){
                    foundElements.push(elemFilter);
                }
            });
            return kink(foundElements);
        },


        /**
         * gets the previous element for each element in a result set.
         *
         * @uses Ink.Dom.Element.previousElementSibling
         * @chainable
         */
        prev: function(){
            var foundElements = [];
            this.each(function(elem){
                var elemFilter = InkElement.previousElementSibling(elem);
                if(elemFilter && !InkArray.inArray(elemFilter,foundElements)){
                    foundElements.push(elemFilter);
                }
            });
            return kink(foundElements);
        },


        /**
         * gets the parent Nodes of a set of elements.
         *
         * @chainable
         */
        parent: function(){
            var foundParents = [];
            this.each(function(elem){
                if(elem.parentNode && !InkArray.inArray(elem.parentNode,foundParents)){
                    foundParents.push(elem.parentNode);
                }
            });

            return kink(foundParents);
        },


        /**
         * gets the childrenNodes of a set of elements.
         *
         * @chainable
         */
        childs: function(i){
            var foundElements = [];
            this.each(function(elem){
                var collection = InkArray.convert(elem.children);
                kink(collection).each(function(childElem){
                    if(childElem && !InkArray.inArray(childElem,foundElements)){
                        foundElements.push(childElem);
                    }
                });
            });

            if(typeof i !== 'number' && !i){
                return kink(foundElements);
            }else{
                return kink(foundElements).get(i);
            }
        }

    });




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







    /**
     * @extends KinkResult
     * @uses  InkCSS
     *
     * CSS Class names
     */
    kink.result.extend({
            removeClass: function(className){
                if(className===undefined){
                    return this.each(function(elem){
                        if(elem && elem.hasOwnProperty('className')){
                            elem.className = null;
                        }
                    });
                }else if(className instanceof Array){
                    return this.each(function(elem){
                        kink.each(className,function(iclass){
                            InkCss.removeClassName(elem,iclass);
                        });
                    });
                }else{
                    return this.each(function(elem){
                        InkCss.removeClassName(elem,className);
                    });
                }
            },

            addClass: function(className){
                if(className===undefined){
                    return this;
                }else if(className instanceof Array){
                    return this.each(function(elem){
                        kink.each(className,function(iclass){
                            InkCss.addClassName(elem,iclass);
                        });
                    });
                }else{
                    return this.each(function(elem){
                        InkCss.addClassName(elem,className);
                    });
                }
            },

            hasClass: function(className){
                return this.some(function(elem){
                    return InkCss.hasClassName(elem,className);
                });
            },

            setClass: function(className){
                return this.removeClass().addClass(className);
            },

            class: function(className){
                if(className===undefined){
                    var elem = this.get(0);
                    return (elem && elem.hasOwnProperty('className')) ? elem.className : '';
                }else{
                    return this.setClass(className);
                }
            }
    });


    /**
     * @extends KinkResult
     * @uses  InkCSS
     *
     * CSS Styles
     */
   kink.result.extend({

        style: function(inlineStyle){
            if(inlineStyle instanceof String){
                return this.each(function(elem){
                    InkCss.setStyle(elem,inlineStyle);
                });
            }else if(inlineStyle===undefined){
                return this.attr('style');
            }else{
                return this;
            }
        },

        css: function(cssProp,value){
            //preventing type errors
            if(typeof this.get(0) !== "object" || !this.get(0).hasOwnProperty('style')){
                return this;
            }

            if(cssProp instanceof String){
                if(value===undefined){
                    return InkCss.getStyle(this.get(0),cssProp);
                }else{
                    return this.each(function(elem){
                        kink.extend(elem.style || {},{cssProp:value});
                    });
                }
            }else if(cssProp instanceof Object){
                return this.each(function(elem){
                    kink.extend(elem.style || {},cssProp);
                });
            }
        }
    });







    window.kk = kink;
    return kink;

    //end

});