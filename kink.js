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
     * Allows new methods to be gived to the kinkResult Object
     * @param  {Object} extendObj
     */
    kink.result.extend = function(extendObj,callback){
        if('result' in extendObj){ //protect kink.extend and kink.result.extend
            //throw("Error extending kink.result: extend is a reserved word");
        }
        kink.extend(kink.result.prototype,extendObj,callback);
    };






    /**
     * @extends KinkResult
     * Basic result navigation
     *
     */
    kink.result.extend({

        /**
         * Gets all nodes or node[i] from a resultset
         *
         * @chainable
         */
        get: function(i) {
            return (i!==undefined) ? this[parseInt(i,10)] : InkArray.convert(this);
        },

        /**
         * gets a new resultset with only node[i]
         *
         * @chainable
         */
        result: function(i){
            return kink(this.get(i));
        },

        /**
         * gets a new resultset with only the last node
         *
         * @chainable
         */
        last: function() {
            return this.result(this.length-1);
        },

        /**
         * gets a new resultset with only the first node
         *
         * @chainable
         */
        first: function() {
            return this.result(0);
        },

        /**
         * finds elements inside each of the element on the result set.
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






    /**
     * @extends KinkResult
     * @uses  Ink.Dom.Element
     *
     * Dom and element
    */



    kink.result.extend({

        /**
         * Setter and getter for attributes
         *
         * @chainable
         */
        attr: function(attr,value){
            if(value !== undefined){
                return this.each(function(elem){
                    if(elem.setAttribute!==undefined){
                        elem.setAttribute(attr,value);
                    }
                });
            }else{
                var elem = this.get(0);
                if(elem!==undefined && elem.getAttribute!==undefined && Element.hasAttribute(elem,attr)){
                    return elem.getAttribute(attr);
                }else{
                    return null;
                }

            }
        },

        name: function(value){
            return this.attr('name',value);
        },

        id: function(value){
            return this.attr('id',value);
        },


        offset: function(){
            var offset2 = InkElement.offset2(this.get(0));
            return {
                top:    offset2[1],
                left:   offset2[0]
            };
        }

    });


     /*
    absolutePosition
    checked
    data
    hasAttribute

    height
    width
    html

    position
    scroll
    scrollTo
    size
    tag
    value
    */


;



    /**
     * @extends KinkResult
     * @uses  Ink.Dom.Css
     *
     * CSS Class names
     */
    kink.result.extend({

            /**
             * removes classNames from elements in the resultset.
             *
             * @uses Ink.Dom.Css.removeClassName
             * @chainable
             */
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


            /**
             * adds classNames to elements in the resultset.
             *
             * @uses Ink.Dom.Css.addClassName
             * @chainable
             */
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


            /**
             * checks if one or more elements has a given className
             *
             * @uses Ink.Dom.Css.hasClassName
             * @chainable
             */
            hasClass: function(className){
                return this.some(function(elem){
                    return InkCss.hasClassName(elem,className);
                });
            },

            /**
             * replaces all className on all elements
             *
             * @chainable
             */
            setClass: function(className){
                return this.removeClass().addClass(className.split(/\s+/));
            },

            /**
             * gets or sets the className of all elements
             *
             * @chainable
             */
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

        /**
         * gets or sets the style attribute of an element
         *
         * @uses  Ink.Dom.Css.setStyle
         * @chainable
         */
        style: function(inlineStyle){
            if(inlineStyle===undefined){
                //return this.attr('style');

                //temp while attr() is not ready
                return this.get(0).getAttribute('style').trim();
            }else if(typeof inlineStyle==="string"){
                if(inlineStyle===""){
                    return this.each(function(elem){
                        elem.setAttribute('style','');
                    });
                }else{
                    return this.each(function(elem){
                        InkCss.setStyle(elem,inlineStyle);
                    });
                }
            }else{
                return this;
            }
        },


        /**
         * gets or sets css properties of elements in the resultset
         *
         * @uses  Ink.Dom.Css.getStyle
         * @chainable
         */
        css: function(cssProp,value){
            //preventing type errors
            if(typeof this.get(0) !== "object" || !this.get(0).hasOwnProperty('style')){
                return this;
            }

            if(typeof cssProp==="string"){
                if(value===undefined){
                    return InkCss.getStyle(this.get(0),cssProp);
                }else{
                    return this.each(function(elem){
                        InkCss.setStyle(elem,cssProp+":"+value);
                    });
                }
            }else if(cssProp instanceof Object){
                return this.each(function(elem){
                    kink.extend(elem.style || {},cssProp);
                });
            }else{
                return this;
            }
        },

        /**
         * hides an element
         *
         * @uses  Ink.Dom.Css.hide
         * @chainable
         */
        hide: function(){
            return this.each(function(elem){
               InkCss.hide(elem);
            });
        },

        /**
         * shows an element
         *
         * @uses  Ink.Dom.Css.show
         * @chainable
         */
        show: function(){
            return this.each(function(elem){
               InkCss.show(elem);
            });
        },

        /**
         * shows/hides an element depending on its state or the state param
         *
         * @uses  Ink.Dom.Css.toggle
         * @uses  Ink.Dom.Css.showHide
         * @chainable
         */
        toggle: function(state){
            if(state!==undefined){
                return this.each(function(elem){
                   InkCss.showHide(elem,!!state);
                });
            }else{
                return this.each(function(elem){
                   InkCss.toggle(elem);
                });
            }
        },

        /**
         * checks if an element is visible
         *
         * @return {bool}
         */
        visible: function(){
            var elem = this.first();
            return (elem.offset().left>0 &&
                elem.offset().top>0 &&
                elem.css('display')!=="none" &&
                elem.css('visibility')!=="hidden" &&
                elem.css('opacity')>0
            );
        }
    });







    window.kk = window.kink = kink;
    return kink;

    //end

});