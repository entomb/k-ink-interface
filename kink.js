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
    Browser,
    Selector,
    Event,
    Element,
    Css,
    Loaded,
    InkArray,
    InkUrl,
    InkString,
    InkDate,
    InkCookie,
    Ajax,
    JsonP
){

    /**
     * This function is the 'binded' handler that will take care of all the 'live' definitions (see live() method).
     *
     * @function liveEventsHandler
     * @param  {String} event Event to be listened in the document element
     * @return {Function} Returns a function to be added in the Event.observe().
     */
    var liveEventsHandler = function( event ) {
        return Ink.bindEvent(
            function( e ){
                for( var selector in kink.liveEvents[event] ){
                    var
                        arrElem = Selector.select(selector),
                        tgtEl = Event.element(e)
                    ;
                    if( arrElem.indexOf(tgtEl) !== -1 ){
                        InkArray.each(kink.liveEvents[event][selector], function(fn){
                            fn.call(tgtEl,e);
                        });
                    }
                }
        },this);
    };

    /**
     * @class kResult
     * @constructor
     * @version 1
     * @param {Array} resultArray   Array to be manipulated
     * @private
     */
    var kResult = function(resultArray,selector){
        this.selector = selector || false;
        if(resultArray instanceof Array){
            this.arr = resultArray || [];
        }else{
            return kink(resultArray);
        }


        this.get = function(i) {
            if(i === undefined) { i = 0; }

            return new kResult(this.arr[i]);
        };

        this.result = function(i) {
            if(i===undefined){
                return this.arr;
            }else{
                return this.arr[i];
            }
        };

        this.last = function(i) {
            return new kResult(this.arr[this.arr.length-1]);
        };

        this.first = function(i) {
            return new kResult(this.arr[0]);
        };

        return this;
    };

    /**
     * returns how many elements are on the resultset
     *
     * @method length
     * @return {int} length of the result array
     * @public
     */
    kResult.prototype.length = function() {
        return this.arr.length;
    };

    /**
     * Alias for the Ink.Util.Array.each method
     * adding support for chaining.
     *
     * @method each
     * @param {Function} iterator Callback to run for each item
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.each = function(iterator) {
        InkArray.each(this.arr,iterator);
        return this;
    };


    /**
     * Alias for Array.filter
     * adding support for chaining.
     *
     * @method filter
     * @param {Function} iterator Callback to run for each item. must return true or false
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.filter = function(iterator) {
        this.arr = this.arr.filter(iterator);
        return this;
    };

    /**
     * Alias for the Ink.Util.Array.some method
     * adding support for chaining.
     *
     * @method some
     * @param {Function} iterator Callback to run for each item that will return true or false, specifying if the item should be
     * in the returned array
     * @param {Object} [context] Context in which the callback will run
     * @return {Array} Returns an array with the items where that the callback returned true.
     * @public
     */
    kResult.prototype.some = function(iterator,context) {
        return InkArray.some(this.arr,iterator,context);
    };


    /**
     * Kind of an Alias for the Ink.Util.Array.inArray method (result has param)
     *
     * @method has
     * @param  {mixed} param the array to compare
     * @return {Bool}
     * @public
     */
    kResult.prototype.has = function(param) {
        return InkArray.inArray(kink(param).result(0) || param,this.arr);
    };


    /**
     * Kind of an Alias for the Ink.Util.Array.inArray method (param has first result)
     *
     * @method is
     * @param  {mixed} selector to fetch a result to compare
     * @return {Bool}
     * @public
     */
    kResult.prototype.in = function(param) {
        return InkArray.inArray(this.result(0) || this.selector,kk(param).result());
    };


    /**
     * Alias for the Ink.Dom.Css.addClassName method
     * adding support for chaining.
     *
     * @method addClass
     * @param {String|Array} className Class  or array of Classes to be added to the element(s)
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.addClassName = kResult.prototype.addClass = function(className){

        return this.each(function(elem){
            if(className instanceof Array){
                kink(className).each(function(iclass){
                    Css.addClassName(elem,iclass);
                });
            }else{
                Css.addClassName(elem,className);
            }
        });

    };

    /**
     * Alias for the Ink.Dom.Css.removeClassName method
     * adding support for chaining.
     *
     * @method removeClass
     * @param {String|Array|undefined} className Class or array of Classes to be removed from the element(s). if undefined will remove all classes
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.removeClassName = kResult.prototype.removeClass = function(className){

        return this.each(function(elem){
            if(className===undefined ){
                elem.className=null;
            }else if(className instanceof Array){
                kink(className).each(function(iclass){
                    Css.removeClassName(elem,iclass);
                });
            }else{
                Css.removeClassName(elem,className);
            }
        });

    };


    /**
     * will get or set the class name of the elements in the resultset
     *
     * @method class
     * @param {String} className Class to be get/set to/from the element(s)
     * @return {kResult|array|null} Returns the same object to support chaining or an array with all class names in the first element.
     * @public
     */
    kResult.prototype.class = function(className){
        if(className!=null){
            return this.each(function(elem,key){
               if(elem.hasOwnProperty('className')){
                    if(typeof className == "string"){
                        elem.className = className;
                    }else{
                        elem.className = "";
                        kink(elem).addClassName(className);
                    }
               }
            });
        }else{
            var className = this.attr('class')
            if(className!==null){
                return className.split(" ");
            }else{
                return [];
            }
        }
    };

    /**
     * Alias for the Ink.Dom.Css.hasClassName method
     * adding support for chaining.
     *
     * @method hasClass
     * @param {string} className Class to be checked if it is in the element(s)' classList
     * @return {Array} Returns an array with the elements that have the class.
     * @public
     */
    kResult.prototype.hasClassName = kResult.prototype.hasClass = function(className){
        return this.some(function(elem,key){
            return Css.hasClassName(elem,className);
        });
    };

    /**
     * Will check if the first element is visible and return its state
     *
     * @method visible
     * @return {bool} State of visibilty based on (display:none) OR (opacity:0) OR (visibility:hidden)
     * @public
     */
    kResult.prototype.visible = function(){
        return (this.css('display')!="none" && this.css('opacity')>0 && this.css('visibility')!= "hidden");
    };


    /**
     * Alias for the Ink.Dom.Css.hide method
     * adding support for chaining.
     *
     * @method hide
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.hide = function(){
        return this.each(function(elem){
            Css.hide(elem);
        });
    };

    /**
     * Alias for the Ink.Dom.Css.show method
     * adding support for chaining.
     *
     * @method show
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.show = function(){
        return this.each(function(elem){
            Css.show(elem);
        });
    };

    /**
     * Alias for the Ink.Dom.Css.showHide method
     * adding support for chaining.
     *
     * @method showHide
     * @param {Boolean} boolState Flag that determines if the element(s) should be showed or hidden
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.showHide = function(boolState){
        return this.each(function(elem){
            Css.showHide(elem,boolState);
        });
    };

    /**
     * Alias for the Ink.Dom.Css.toggle method
     * adding support for chaining.
     *
     * @method toggle
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.toggle = function(){
        return this.each(function(elem){
            Css.toggle(elem);
        });
    };

    /**
     * Alias for the Ink.Dom.Css.setStyle method
     * adding support for chaining.
     *
     * @method style
     * @param {String} inlineStyle Style string to be added to the element(s)' style attribute
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.style = kResult.prototype.setStyle = function(inlineStyle){
        //TODO: style getter, Object format
        return this.each(function(elem){
            Css.setStyle(elem,inlineStyle);
        });
    };


    /**
     * Alias for the Ink.Dom.Css.setStyle and Ink.Dom.Css.getStyle
     * adding support for chaining.
     *
     * @method css
     * @param {String} prop property to set or get
     * @param {String} Optional value value to set
     * @return {kResult|mixed} Returns the same object to support chaining or the style value
     * @public
     */
    kResult.prototype.css = function(prop,value){
        //preventing type errors
        if(typeof this.result(0) == "object" && this.result(0).hasOwnProperty('style')){
            if(value===undefined){
                return Css.getStyle(this.result(0),prop);
            }else{
                return this.setStyle(prop+":"+value);
            }
        }else{
            return null;
        }
    };


    /**
     * Alias for the Ink.Dom.Event.observe and Ink.Dom.Event.fire methods
     * adding support for chaining.
     *
     * @method on
     * @param {String} ev Event to be triggered or listened.
     * @param {Function} [callback] Callback to be executed when the specified event is triggered
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.on = kResult.prototype.bind = function(ev,selector,callback){
        if(selector!==undefined){
            if(typeof selector === 'function'){
                callback = selector;
            } else {
                var cb = callback;
                callback = Ink.bindEvent(function( event ){
                    var elm = Event.element(event);
                    var context = this.find(selector);

                    var result = true;
                    if( context.result().indexOf(elm) === -1 ){
                        result = context.some(
                            Ink.bind(function(elem){
                                return Ink.ss(elm.nodeName,elem).indexOf( elm )!==-1;
                            },this)
                        );
                        if( !result ){
                            return;
                        }
                    }

                    if( result ){
                        cb.call(this,event,elm);
                    }
                },this);
            }
        }

        if(callback === undefined){

            //call
            this.each(function(elem){
                Event.fire(elem,ev);
            });
        }else{
            //bind
            this.each(function(elem){
                Event.observe(elem,ev,callback);
            });
        }

        return this;
    };

    /**
     * It will create a list of events and selectors to be checking when those events in that list are triggered.
     * That way we can run callbacks on events triggered by new elements (dynamically created after the listener has been created).
     *
     * @method live
     * @param {String} event Name of the event that was added on live()
     * @param {Function} callback Function/listener you want to run when the event is triggered.
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.live = function(event, callback){
        if( typeof(this.selector) !== 'string' ){
            return;
        }

        if( !(event in kink.liveEvents) ){
            Event.observe(document,event, liveEventsHandler(event) );
        }

        if( !(event in kink.liveEvents) ){
            kink.liveEvents[event] = {};
        }

        if( !(this.selector in kink.liveEvents[event]) ){
            kink.liveEvents[event][this.selector] = [];
        }
        kink.liveEvents[event][this.selector].push( callback );

        return this;
    };

    /**
     * Removes event listenings added with the live() method
     *
     * @method die
     * @param {String} event Name of the event that was added on live()
     * @param {Function} [handler] Function/listener you want to remove. If you don't pass a handler, it will remove all listeners related with the specified event (and selector)
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.die = function(event, handler){

        if( typeof handler !== 'undefined' ){

            if( !(this.selector in kink.liveEvents[event]) ){
                return;
            }

            var pos = kink.liveEvents[event][this.selector].indexOf(handler);
            if( pos !== -1 ){
                kink.liveEvents[event][this.selector].splice(pos,1);
            }
        } else {
            kink.liveEvents[event][this.selector].splice(0,(kink.liveEvents[event][this.selector].length-1));
        }

        if( kink.liveEvents[event][this.selector].length === 0 ){
            delete kink.liveEvents[event][this.selector];
        }

        var numProps = 0;
        for( var sel in kink.liveEvents[event] ){
            if( kink.liveEvents[event].hasOwnProperty(sel) ){ numProps++; }
        }
        if( numProps === 0){
            Event.stopObserving(document, event, liveEventsHandler(event));
        }
        return this;
    };

    /**
     * Alias for the Ink.Dom.Event.observe method with the event already defined (click)
     * adding support for chaining.
     *
     * @method click
     * @param {Function} callback Callback function to be executed when the specified event is triggered
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.click = function(callback){
        return this.bind('click',callback);
    };

    /**
     * Alias for the Ink.Dom.Event.observe method with the event already defined (dblclick)
     * adding support for chaining.
     *
     * @method dblclick
     * @param {Function} callback Callback function to be executed when the specified event is triggered
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.dblclick = function(callback){
        return this.bind('dblclick',callback);
    };


    /**
     * Alias for the Ink.Dom.Event.observe method with the event already defined (focus)
     * adding support for chaining.
     *
     * @method focus
     * @param {Function} callback Callback function to be executed when the specified event is triggered
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.focus = function(callback){
        return this.bind('focus',callback);
    };


    /**
     * Alias for the Ink.Dom.Event.observe method with the event already defined (blur)
     * adding support for chaining.
     *
     * @method blur
     * @param {Function} callback Callback function to be executed when the specified event is triggered
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.blur = function(callback){
        return this.bind('blur',callback);
    };


    /**
     * Alias for the Ink.Dom.Event.observe method with the event already defined (change)
     * adding support for chaining.
     *
     * @method change
     * @param {Function} callback Callback function to be executed when the specified event is triggered
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.change = function(callback){
        return this.bind('change',callback);
    };


    /**
     * Alias for the Ink.Dom.Event.observe method with the event already defined (mousemove)
     * adding support for chaining.
     *
     * @method mousemove
     * @param {Function} callback Callback function to be executed when the specified event is triggered
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.mousemove = function(callback){
        return this.bind('mousemove',callback);
    };

    /**
     * Alias for the Ink.Dom.Event.observe method with the event already defined (mouseover)
     * adding support for chaining.
     *
     * @method mouseover
     * @param {Function} callback Callback function to be executed when the specified event is triggered
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.mouseover = function(callback){
        return this.bind('mouseover',callback);
    };

    /**
     * Alias for the Ink.Dom.Event.observe method with the event already defined (mouseover)
     * adding support for chaining.
     *
     * @method mouseover
     * @param {Function} callback Callback function to be executed when the specified event is triggered
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.mouseout = function(callback){
        return this.bind('mouseout',callback);
    };

    /**
     * Alias for the kResult.mouseover and kResult.mouseout methods
     * adding support for chaining.
     *
     * @method hover
     * @param {Function} callbackIn Callback function to be executed when the mouseover event is triggered
     * @param {Function} [callbackOut] Callback function to be executed when the mouseout event is triggered
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.hover = function(callbackIn,callbackOut){
        if(callbackOut === undefined){
            this.mouseover(callbackIn);
        }else{
            this.mouseover(callbackIn).mouseout(callbackOut);
        }
        return this;
    };


    /**
     * Appends all resultset to the first result of a selector
     *
     * @method appendTo
     * @param {String} css selector to find an alement and append the current resultset to it, will append to the first element it finds
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.appendTo = function(select){
        return this.each(function(elem){
            kink(select).result(0).appendChild(elem);
        });
    };

    /**
     * creates and append an element to all the result set
     *
     * @method create
     * @uses kink.create()
     * @param {String} DOM tagName for the new element
     * @param {Object} DOM options
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.create = function(tag,options){
        return this.each(function(elem){
            kink.create(tag,options).appendTo(elem);
        });
    };


    /**
     * Sets the HTML of elements.
     *
     * @method html
     * @param {String} html HTML to be written inside the element.
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.html = function(html){
        if(html === undefined){
            return (this.result(0)!==undefined) ? this.result(0).innerHTML : undefined;
        }else{
            return this.each(function(elem){
                if(elem.hasOwnProperty('innerHTML')){
                    elem.innerHTML = html
                }
            });
        }
    };

    /**
     * Alias of the Ink.Dom.Element.appendHTML,
     * adding chaining support.
     *
     * @method appendHTML
     * @param {String} html HTML to be appended inside the element.
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.appendHTML = function(html){
        return this.each(function(elem){
            if(elem.hasOwnProperty('innerHTML')){
                elem.innerHTML+= html
            }
        });
    };

    /**
     * Alias of the Ink.Dom.Element.prependHTML,
     * adding chaining support.
     *
     * @method prependHTML
     * @param {String} html HTML to be prepended inside the element.
     * @return {kResult} Returns the same object to support chaining.
     * @public
     */
    kResult.prototype.prependHTML = function(html){
        return this.each(function(elem){
            if(elem.hasOwnProperty('innerHTML')){
                elem.innerHTML = html+elem.innerHTML
            }
        });
    };

    /**
     * Alias of the Ink.Dom.Element.remove
     *
     * @method remove
     * @return {Boolean} Returns true.
     * @public
     */
    kResult.prototype.remove = function(){
        this.each(function(elem){
            Element.remove(elem);
        });
        return true;
    };


    /**
     * Alias of the Ink.Dom.Element.data
     *
     * @method data
     * @param {String} Optional key, if not present the method will return the full Data element.
     * @param {String} Optional value, if present the method set the data attribute
     * @return {kResult} Returns the same object to support chaining or the dataset of the element.
     * @public
     */
    kResult.prototype.data = function(key,value){
        if(key!==undefined && value!==undefined){
            return this.attr('data-'+key,value);
        }else if(key!==undefined){
           return this.get(0).attr('data-'+key) || Element.data(this.result(0))[key];
        }else{
            return Element.data(this.result(0));
        }
    };

    /**
     * Alias of the Ink.Dom.Element.elementDimensions
     *
     * @method size
     * @return {Array} Returns an array where the first position is the width and the second is the height of the element.
     * @public
     */
    kResult.prototype.size = kResult.prototype.elementDimensions = function(){
        return Element.elementDimensions(this.result(0));
    };

    /**
     * Alias of the Ink.Dom.Element.elementHeight
     *
     * @method height
     * @return {Number} Returns the height in pixels.
     * @public
     */
    kResult.prototype.height = kResult.prototype.elementHeight = function(){
        return Element.elementHeight(this.result(0));
    };

    /**
     * Alias of the Ink.Dom.Element.elementWidth
     *
     * @method width
     * @return {Number} Returns the width of the element in pixels.
     * @public
     */
    kResult.prototype.width = kResult.prototype.elementWidth = function(){
        return Element.elementWidth(this.result(0));
    };

    /**
     * Alias of the Ink.Dom.Element.offset
     *
     * @method absolutePosition
     * @return {Array} Returns an array where the first position is the x coordinate and the second is the y coordinate of the element relative to the documents top left corner.
     * @public
     */
    kResult.prototype.absolutePosition = kResult.prototype.offset = function(){
        return Element.offset(this.result(0));
    };

    /**
     * Alias of the Ink.Dom.Element.offset
     *
     * @method position
     * @return {Array} Returns an array where the first position is the x coordinate and the second is the y coordinate of the element in the viewport.
     * @public
     */
    kResult.prototype.position = kResult.prototype.offset2 = function(){
        return Element.offset2(this.result(0));
    };


    /**
     * Setter and getter for attributes
     *
     * @method attribute
     * @param {String} attr Name of the attribute to check if it exists in the element
     * @return {Array} Returns an array of elements that have the attribute or kResult for chainning.
     * @public
     */
    kResult.prototype.attr = kResult.prototype.attribute = function(attr,value){
        if(value !== undefined){
            return this.each(function(elem){
                if(elem.setAttribute!=undefined){
                    elem.setAttribute(attr,value);
                }
            });
        }else{
            if(this.result(0)!==undefined && this.result(0).getAttribute!=undefined && Element.hasAttribute(this.result(0),attr)){
                return this.result(0).getAttribute(attr);
            }else{
                return null;
            }

        }
    };

    /**
     * Setter and getter for `name` attribute
     *
     * @method name
     * @param {String} value value to set to the "name" attribute
     * @return {Array|kResult} Returns an array of elements that have the attribute or kResult for chainning.
     * @public
     */
    kResult.prototype.name = function(value){
        if(value !== undefined){
            return this.attr('name',value);
        }else{
            return this.attr('name');
        }
    };


    /**
     * Setter and getter for `id` attribute
     *
     * @method id
     * @param {String} value value to set to the "id" attribute
     * @return {Array|kResult} Returns an array of elements that have the attribute or kResult for chainning.
     * @public
     */
    kResult.prototype.id = function(value){
        if(value !== undefined){
            return this.attr('id',value);
        }else{
            return this.attr('id');
        }
    };


    /**
     *  getter for the element tagName (will allways return UpperCase)
     *
     * @method tag
     * @return {string} returns an uppercase tag name for the first element found
     * @public
     */
    kResult.prototype.tag = function(){
        if(this.result(0)!==undefined){
            return this.result(0).nodeName.toUpperCase() || null;
        }else{
            return null;
        }
    };


     /**
     * Setter and getter for checked elements (checkbox and radio)
     *
     * @method attribute
     * @param {bool} (optional) the new value to set
     * @return {String|kResult} trows an onChange() event on all elements or returns the value.
     * @public
     */
    kResult.prototype.checked = function(value){
        if(value === undefined){
            var elem = this.get(0) || false;
            if(elem.attr('type')=='checkbox' || elem.attr('type')=='radio' ){
                return !!elem.attr('checked');
            }else{
                return false;
            }
        }else{
            this.each(function(elem){
                kink(elem).attr('checked',value ? 'checked' : '');
            });

            return this.on('change');
        }
    }


    /**
     * Setter and getter for values
     *
     * @method attribute
     * @param {String} value the value to set. if on a <select> it will select the option with this value.
     * @return {String|kResult} trows an onChange() event on all elements or returns the value.
     * @public
     */
    kResult.prototype.value = kResult.prototype.val = function(value){
        if(value === undefined){
            var elem = this.result(0);
            if(elem===undefined){
                return false;
            }
            if(elem.nodeName=='SELECT'){
                return elem.options[elem.selectedIndex].value;
            }else if(elem.nodeName=='TEXTAREA'){
                return elem.innerHTML;
            }else{
                return elem.value;
            }
        }else{
            this.each(function(elem){
                if(elem.nodeName=='SELECT'){
                    var index = false;
                    kink(InkArray.convert(elem.options)).each(function(opt,k){
                        if(opt.value==value){
                            index = k;
                        }
                    });
                    if(index){
                        //found index
                        elem.selectedIndex = index;
                    }
                }else if(elem.nodeName=='TEXTAREA'){
                    elem.innerHTML = value;
                }else{
                    elem.value = value;
                }
            });

            return this.on('change');
        }
    };



    /**
     * Alias of the Ink.Dom.Element.scroll
     *
     * @method scroll
     * @return {Array} Returns an array where the first position is the horizontal scroll position and the second is the vertical scroll position.
     * @public
     */
    kResult.prototype.scroll = function(){
        return Element.scroll(this.result(0));
    };

    /**
     * Alias of the Ink.Dom.Element.scrollTo
     *
     * @method scrollTo
     * @return {kResult} Scrolls to the element.
     * @public
     */
    kResult.prototype.scrollTo = function(){
        return Element.scrollTo(this.result(0));
    };

    /**
     * Alias of the Ink.Dom.Element.siblings,
     * adding chaining support.
     *
     * @method siblings
     * @return {kResult} Returns a new kResult object with an array of siblings.
     * @public
     */
    kResult.prototype.siblings = function(){
        var foundElements = []
        this.each(function(elem){
            var elemFilter = Element.siblings(elem);
            if(elemFilter){
                Ink.Util.Array.each(elemFilter,function(elemSibling){
                    if(!Ink.Util.Array.inArray(elemSibling,foundElements)){
                        foundElements.push(elemSibling);
                    }
                });
            }
        });
        return new kResult(foundElements);
    };


    /**
     * Alias of the Ink.Dom.Element.nextElementSibling,
     * adding chaining support.
     *
     * @method next
     * @return {kResult} Returns a new kResult object with an array of all the next siblings.
     * @public
     */
    kResult.prototype.next = function(){
        var foundElements = []
        this.each(function(elem){
            var elemFilter = Element.nextElementSibling(elem);
            if(elemFilter && !Ink.Util.Array.inArray(elemFilter,foundElements)){
                foundElements.push(elemFilter);
            }
        });
        return new kResult(foundElements);
    };


    /**
     * Alias of the Ink.Dom.Element.previousElementSibling,
     * adding chaining support.
     *
     * @method prev
     * @return {kResult} Returns a new kResult object with an array of all the previsous sibling.
     * @public
     */
    kResult.prototype.prev = function(){
        var foundElements = []
        this.each(function(elem){
            var elemFilter = Element.previousElementSibling(elem);
            if(elemFilter && !Ink.Util.Array.inArray(elemFilter,foundElements)){
                foundElements.push(elemFilter);
            }
        });
        return new kResult(foundElements);
    };

    /**
     * Alias of the <node>.parentNode,
     * adding chaining support.
     *
     * @method parentNode
     * @return {kResult} Returns a new kResult object with an array with of parentNodes.
     * @public
     */
    kResult.prototype.parent = function(){
        var parents = [];
        this.each(function(elem,num){
            if(elem.parentNode && !Ink.Util.Array.inArray(elem.parentNode,parents)){
                parents.push(elem.parentNode);
            }
        });

        //unique?
        //Using Ink.Util.Array.inArray instead
        //parents.filter(function (e,i,arr) { return arr.lastIndexOf(e) === i; });
        return new kResult(parents);
    };

    /**
     * Method to get the childrenNodes of a set of elements.
     *
     * @method childs
     * @param {Number} [i] Index of the specific item in the array of children nodes.
     * @return {kResult} Returns a new kResult object with the array of childrens.
     * @public
     */
    kResult.prototype.childs = function(i){
        var fetchedChilds = [];
        this.each(function(elem){
            var collection = InkArray.convert(elem.children);
            var childs = new kResult(collection);
            childs.each(function(childElem){
                fetchedChilds.push(childElem);
            });
        });
        if(typeof i === 'number'){
            return new kResult(fetchedChilds).get(i);
        }else{
            return new kResult(fetchedChilds);
        }
    };

    /**
     * Alias of the Ink.Dom.Selector.select with the second parameter filled,
     * adding chaining support.
     *
     * @method find
     * @param {String} param CSS Selector.
     * @return {kResult} Returns a new kResult object with the elements found.
     * @public
     */
    kResult.prototype.find = function(param){
        var foundElements = [];
        this.each(function(elem){
            var elements = new kResult(Selector.select(param,elem));
            elements.each(function(childElem){
                if(!Ink.Util.Array.inArray(childElem,foundElements)){
                    foundElements.push(childElem);
                }
            });
        });

        return new kResult(foundElements);
    };

    /**
     * The 'kink' object is in the base of the usage of the kResult class
     *
     * @function kink
     * @param {String} param CSS Selector.
     * @param {String} [context] Context in which the selector will act.
     * @return {kResult} Returns a new kResult object with the elements found.
     * @public
     */
    var kink = function(param,context){
        if(!param || param === null || param===undefined){
            return new kResult([]);
        }else if(typeof param === 'string'){
            return new kResult(Selector.select(param,context),param);
        }else if(param instanceof Array){
            return new kResult(param);
        }else if(param instanceof Function){
            return new kink(param.call(context));
        }if(param instanceof kResult){
            return param;
        }else{
            return new kResult([param]);
        }
    };


    /**
     * Kink object that will track the live() events registered.
     * @type {Object}
     * @public
     * @static
     */
    kink.liveEvents = {};

    /**
     * Alias of the Ink.Dom.Element.viewportHeight
     *
     * @method viewportHeight
     * @return {Number} Viewport's height in pixels
     */
    kink.viewportHeight = Element.viewportHeight;


    /**
     * Alias of the Ink.Dom.Element.viewportWidth
     *
     * @method viewportWidth
     * @return {Number} Viewport's width in pixels
     */
    kink.viewportWidth  = Element.viewportWidth;

    /**
     * Alias of the Ink.Dom.Loaded.run
     *
     * @method ready
     */
    kink.ready    = function(callable){Loaded.run(callable);};


    /**
     * Alias of the Ink.Dom.Css.appendStylesheet
     *
     * @method appendStylesheet
     */
    kink.appendStylesheet = function(path,options){Css.appendStylesheet(path,options);};

    /**
     * Alias of the Ink.Dom.Browser
     *
     * @property browser
     * @type {Object}
     * @static
     */
    kink.browser  = Browser;

    /**
     * Alias of the Ink.Util.Url
     *
     * @property url
     * @type {Object}
     */
    kink.url      = InkUrl;

    /**
     * Alias of the Ink.Util.Date
     *
     * @property date
     * @type {Object}
     */
    kink.date     = InkDate;

    /**
     * Alias of the Ink.Util.String
     *
     * @property string
     * @type {Object}
     */
    kink.string   = InkString;

    /**
     * Alias of the Ink.Util.Cookie
     *
     * @property cookie
     * @type {Object}
     */
    kink.cookie   = InkCookie;



    /**
     * Simple extender for the result prototype allowing for added functionality
     * will return false if the method could not be set
     *
     * @method extend
     * @param {String} method the new method/function name
     * @param {Function} callable  the new method function, scope of 'this' will be the kResult obj
     */
    kink.extend = function(method,callable){
        if(typeof callable == 'function'){
            kResult.prototype[method] = callable;
            return kink;
        }
    };


    /**
     * Alias of the Ink.Net.Ajax or Ink.Net.JsonP (depending on the usage)
     *
     * @method ajax
     * @param {String} url URL to be used in the call
     * @param {Object|Function} options Options to be passed when in an AJAX call. If it's a JSONP call it will be a callback function that will be executed onComplete.
     * @param {Function} onComplete Callback function for the AJAX call.
     */
    kink.ajax = function(url,options,onComplete){
        var cb = onComplete,
            method = 'Ajax';
        if(typeof options === 'function') {
            cb = options;
            options = { onComplete: cb };
        } else {
            options = Ink.extendObj(options, { onComplete: cb });
            if(options.jsonp) {
                method = 'JsonP';
            }
        }

        return new method.call(this, url, options);
    };


    /**
     * Alias of the Element.create
     * Creates a new DOM done and returns a new kResult.
     *
     * @method ajax
     * @param {String} DOM tagName for the new element
     * @param {Object} DOM options
     * @return {kResult} kResult objecto with the recently created object. after this your should use .appendTo('selector')
     */
    kink.create = function(tag,options){
        return new kResult([Element.create(tag,options)]);
    };

    //window.kResult = kResult;
    window.kk = kink;
    return kink;
});
