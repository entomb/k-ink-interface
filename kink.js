/**
 * @module Ink.UI.Kink_1
 * @author entomb ( https://github.com/entomb/k-ink-interface ) and ported by inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.Util.Kink',1,[
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
     * @class Result
     * @constructor
     * @version 1
     * @param {Array} resultArray   Array to be manipulated
     * @private
     */
    var Result = function(resultArray,selector){
        this.selector = selector;
        this.arr = resultArray;

        this.get = function(i) {
            if(i === undefined) { i = 0; }

            return new Result([this.arr[i]]);
        };

        this.result = function(i) {
            if(i===undefined){
                return this.arr;
            }else{
                return this.arr[i];
            }
        };

        return this;
    };

    /**
     * Alias for the Ink.Util.Array.each method
     * adding support for chaining.
     *
     * @method each
     * @param {Function} iterator Callback to run for each item
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.each = function(iterator) {
        InkArray.each(this.arr,iterator);
        return this;
    };

    /**
     * Alias for the Ink.Util.Array.some method
     * adding support for chaining.
     *
     * @method some
     * @param {Function} iterator Callback to run for each item that will return true or false, specifying if the item should be
     * in the returned array
     * @param {Object} [callable] Context in which the callback will run
     * @return {Array} Returns an array with the items where that the callback returned true.
     * @public
     */
    Result.prototype.some = function(iterator,callable) {
        return InkArray.some(this.arr,iterator,callable);
    };


    /**
     * Alias for the Ink.Dom.Css.addClassName method
     * adding support for chaining.
     *
     * @method addClass
     * @param {String} className Class to be added to the element(s)
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.addClassName = Result.prototype.addClass = function(className){
        this.each(function(elem,key){
            Css.addClassName(elem,className);
        });
        return this;
    };

    /**
     * Alias for the Ink.Dom.Css.removeClassName method
     * adding support for chaining.
     *
     * @method removeClass
     * @param {String} className Class to be removed from the element(s)
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.removeClassName = Result.prototype.removeClass = function(className){
        this.each(function(elem,key){
            Css.removeClassName(elem,className);
        });
        return this;
    };

    /**
     * Alias for the Ink.Dom.Css.setClassName method
     * adding support for chaining.
     *
     * @method setClass
     * @param {String} className Class to be added/removed to/from the element(s)
     * @param {Boolean} boolState Flag that determines if the class should be added or removed
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.setClassName = Result.prototype.setClass = function(className,boolState){
        this.each(function(elem,key){
            Css.setClassName(elem,className,boolState);
        });
        return this;
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
    Result.prototype.hasClassName = Result.prototype.hasClass = function(className){
        return this.some(function(elem,key){
            return Css.hasClassName(elem,className);
        });
    };

    /**
     * Alias for the Ink.Dom.Css.hide method
     * adding support for chaining.
     *
     * @method hide
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.hide = function(){
         this.each(function(elem){
            Css.hide(elem);
        });
        return this;
    };

    /**
     * Alias for the Ink.Dom.Css.show method
     * adding support for chaining.
     *
     * @method show
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.show = function(){
        this.each(function(elem){
            Css.show(elem);
        });
        return this;
    };

    /**
     * Alias for the Ink.Dom.Css.showHide method
     * adding support for chaining.
     *
     * @method showHide
     * @param {Boolean} boolState Flag that determines if the element(s) should be showed or hidden
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.showHide = function(boolState){
        this.each(function(elem){
            Css.showHide(elem,boolState);
        });
        return this;
    };

    /**
     * Alias for the Ink.Dom.Css.toggle method
     * adding support for chaining.
     *
     * @method toggle
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.toggle = function(){
        this.each(function(elem){
            Css.toggle(elem,boolState);
        });
        return this;
    };

    /**
     * Alias for the Ink.Dom.Css.setStyle method
     * adding support for chaining.
     *
     * @method style
     * @param {String} inlineStyle Style string to be added to the element(s)' style attribute
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.style = Result.prototype.setStyle = function(inlineStyle){
        this.each(function(elem){
            Css.setStyle(elem,inlineStyle);
        });
        return this;
    };


    /**
     * Alias for the Ink.Dom.Event.observe and Ink.Dom.Event.fire methods
     * adding support for chaining.
     *
     * @method on
     * @param {String} ev Event to be triggered or listened.
     * @param {Function} [callback] Callback to be executed when the specified event is triggered
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.on = Result.prototype.bind = function(ev,callback){
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
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.live = function(event, callback){
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
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.die = function(event, handler){

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
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.click = function(callback){
        return this.bind('click',callback);
    };

    /**
     * Alias for the Ink.Dom.Event.observe method with the event already defined (dblclick)
     * adding support for chaining.
     *
     * @method dblclick
     * @param {Function} callback Callback function to be executed when the specified event is triggered
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.dblclick = function(callback){
        return this.bind('dblclick',callback);
    };


    /**
     * Alias for the Ink.Dom.Event.observe method with the event already defined (focus)
     * adding support for chaining.
     *
     * @method focus
     * @param {Function} callback Callback function to be executed when the specified event is triggered
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.focus = function(callback){
        return this.bind('focus',callback);
    };


    /**
     * Alias for the Ink.Dom.Event.observe method with the event already defined (blur)
     * adding support for chaining.
     *
     * @method blur
     * @param {Function} callback Callback function to be executed when the specified event is triggered
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.blur = function(callback){
        return this.bind('blur',callback);
    };


    /**
     * Alias for the Ink.Dom.Event.observe method with the event already defined (change)
     * adding support for chaining.
     *
     * @method change
     * @param {Function} callback Callback function to be executed when the specified event is triggered
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.change = function(callback){
        return this.bind('change',callback);
    };


    /**
     * Alias for the Ink.Dom.Event.observe method with the event already defined (mousemove)
     * adding support for chaining.
     *
     * @method mousemove
     * @param {Function} callback Callback function to be executed when the specified event is triggered
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.mousemove = function(callback){
        return this.bind('mousemove',callback);
    };

    /**
     * Alias for the Ink.Dom.Event.observe method with the event already defined (mouseover)
     * adding support for chaining.
     *
     * @method mouseover
     * @param {Function} callback Callback function to be executed when the specified event is triggered
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.mouseover = function(callback){
        this.bind('mouseover',callback);
        return this;
    };

    /**
     * Alias for the Ink.Dom.Event.observe method with the event already defined (mouseover)
     * adding support for chaining.
     *
     * @method mouseover
     * @param {Function} callback Callback function to be executed when the specified event is triggered
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.mouseout = function(callback){
        this.bind('mouseout',callback);
        return this;
    };

    /**
     * Alias for the Result.mouseover and Result.mouseout methods
     * adding support for chaining.
     *
     * @method hover
     * @param {Function} callbackIn Callback function to be executed when the mouseover event is triggered
     * @param {Function} [callbackOut] Callback function to be executed when the mouseout event is triggered
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.hover = function(callbackIn,callbackOut){
        if(callbackOut === undefined){
            this.mouseover(callbackIn);
        }else{
            this.mouseover(callbackIn).mouseout(callbackOut);
        }
        return this;
    };


    /**
     * Sets the HTML of elements.
     *
     * @method html
     * @param {String} html HTML to be written inside the element.
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.html = function(html){
        if(html === undefined){
            var html = "";

            this.each(function(elem){
                html+=Element.textContent(elem).replace(/\n/g," ");
            });

            return html;
        }

        this.each(function(elem){
            Element.setTextContent(elem,html);
        });
        return this;
    };

    /**
     * Alias of the Ink.Dom.Element.appendHTML,
     * adding chaining support.
     *
     * @method appendHTML
     * @param {String} html HTML to be appended inside the element.
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.appendHTML = function(html){
        this.each(function(elem){
            Element.appendHTML(elem,html);
        });
        return this;
    };

    /**
     * Alias of the Ink.Dom.Element.prependHTML,
     * adding chaining support.
     *
     * @method prependHTML
     * @param {String} html HTML to be prepended inside the element.
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.prependHTML = function(html){

        this.each(function(elem){
            Element.prependHTML(elem,html);
        });
        return this;
    };

    /**
     * Alias of the Ink.Dom.Element.remove
     *
     * @method remove
     * @return {Boolean} Returns true.
     * @public
     */
    Result.prototype.remove = function(){
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
     * @return {Result} Returns the same object to support chaining.
     * @public
     */
    Result.prototype.data = function(key){
        if(key!==undefined){
            var Data = Element.data(this.result(0));
            return (Data[key]!==undefined) ? Data[key] : null
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
    Result.prototype.size = Result.prototype.elementDimensions = function(){
        return Element.elementDimensions(this.result(0));
    };

    /**
     * Alias of the Ink.Dom.Element.elementHeight
     *
     * @method height
     * @return {Number} Returns the height in pixels.
     * @public
     */
    Result.prototype.height = Result.prototype.elementHeight = function(){
        return Element.elementHeight(this.result(0));
    };

    /**
     * Alias of the Ink.Dom.Element.elementWidth
     *
     * @method width
     * @return {Number} Returns the width of the element in pixels.
     * @public
     */
    Result.prototype.width = Result.prototype.elementWidth = function(){
        return Element.elementWidth(this.result(0));
    };

    /**
     * Alias of the Ink.Dom.Element.offset
     *
     * @method absolutePosition
     * @return {Array} Returns an array where the first position is the x coordinate and the second is the y coordinate of the element relative to the documents top left corner.
     * @public
     */
    Result.prototype.absolutePosition = Result.prototype.offset = function(){
        return Element.offset(this.result(0));
    };

    /**
     * Alias of the Ink.Dom.Element.offset
     *
     * @method position
     * @return {Array} Returns an array where the first position is the x coordinate and the second is the y coordinate of the element in the viewport.
     * @public
     */
    Result.prototype.position = Result.prototype.offset2 = function(){
        return Element.offset2(this.result(0));
    };

    /**
     * Alias of the Ink.Dom.Element.hasAttribute
     *
     * @method hasAttribute
     * @param {String} attr Name of the attribute to check if it exists in the element
     * @return {Array} Returns an array of elements that have the attribute.
     * @public
     */
    Result.prototype.hasAttribute = function(attr){
        return this.some(function(elem){
            return Element.hasAttribute(elem,attr);
        });
    };

    /**
     * Setter and getter for attributes
     *
     * @method attribute
     * @param {String} attr Name of the attribute to check if it exists in the element
     * @return {Array} Returns an array of elements that have the attribute.
     * @public
     */
    Result.prototype.attr = Result.prototype.attribute = function(attr,value){
        if(value!=undefined){
            this.each(function(elem){
                elem.setAttribute(attr,value);
            });
            return this;
        }else{
            return this.result(0).getAttribute(attr);
        }
    };


     /**
     * Setter and getter for values
     *
     * @method attribute
     * @param {String} value the value to set. if on a <select> it will select the option with this value.
     * @return {String|Result} trows an onChange() event on all elements or returns the value.
     * @public
     */
    Result.prototype.value = Result.prototype.val = function(value){
        if(value==undefined){
            var elem = this.result(0);
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
    Result.prototype.scroll = function(){
        return Element.scroll(this.result(0));
    };

    /**
     * Alias of the Ink.Dom.Element.scrollTo
     *
     * @method scrollTo
     * @return {Result} Scrolls to the element.
     * @public
     */
    Result.prototype.scrollTo = function(){
        return Element.scrollTo(this.result(0));
    };

    /**
     * Alias of the Ink.Dom.Element.siblings,
     * adding chaining support.
     *
     * @method siblings
     * @return {Result} Returns a new Result object with an array of siblings.
     * @public
     */
    Result.prototype.siblings = function(){
        return new Result(Element.siblings(this.result(0)));
    };


    /**
     * Alias of the Ink.Dom.Element.nextElementSibling,
     * adding chaining support.
     *
     * @method next
     * @return {Result} Returns a new Result object with an array[1] witgh the next sibling.
     * @public
     */
    Result.prototype.next = function(){
        return new Result([Element.nextElementSibling(this.result(0))]);
    };


    /**
     * Alias of the Ink.Dom.Element.previousElementSibling,
     * adding chaining support.
     *
     * @method prev
     * @return {Result} Returns a new Result object with an array[1] witgh the previsous sibling.
     * @public
     */
    Result.prototype.prev = function(){
        return new Result([Element.previousElementSibling(this.result(0))]);
    };

    /**
     * Alias of the <node>.parentNode,
     * adding chaining support.
     *
     * @method parentNode
     * @return {Result} Returns a new Result object with an array with the parentNode.
     * @public
     */
    Result.prototype.parent = function(){
        var parents = [];
        this.each(function(elem,num){
            if(!Ink.Util.Array.inArray(elem.parentNode,parents)){
                parents.push(elem.parentNode);
            }
        });

        //unique?
        //Using Ink.Util.Array.inArray instead
        //parents.filter(function (e,i,arr) { return arr.lastIndexOf(e) === i; });
        return new Result(parents);
    };

    /**
     * Method to get the childrenNodes of a set of elements.
     *
     * @method childs
     * @param {Number} [i] Index of the specific item in the array of children nodes.
     * @return {Result} Returns a new Result object with the array of childrens.
     * @public
     */
    Result.prototype.childs = function(i){
        var fetchedChilds = [];
        this.each(function(elem){
            var collection = InkArray.convert(elem.children);
            var childs = new Result(collection);
            childs.each(function(childElem){
                fetchedChilds.push(childElem);
            });
        });
        if(typeof i !== 'number' && !i){
            return new Result(fetchedChilds);
        }else{
            return new Result(fetchedChilds).get(i);
        }
    };

    /**
     * Alias of the Ink.Dom.Selector.select with the second parameter filled,
     * adding chaining support.
     *
     * @method find
     * @param {String} param CSS Selector.
     * @return {Result} Returns a new Result object with the elements found.
     * @public
     */
    Result.prototype.find = function(param){
        var foundElements = [];

        this.each(function(elem){
            var elements = new Result(Selector.select(param,elem));
            elements.each(function(childElem){
                foundElements.push(childElem);
            });
        });

        return new Result(foundElements);
    };

    /**
     * The 'kink' object is in the base of the usage of the Result class
     *
     * @function kink
     * @param {String} param CSS Selector.
     * @param {String} [context] Context in which the selector will act.
     * @return {Result} Returns a new Result object with the elements found.
     * @public
     */
    var kink = function(param,context){
        if(typeof param === 'string'){
            return new Result(Selector.select(param,context),param);
        }else if(param instanceof Array){
            return new Result(param);
        }if(param instanceof Result){
            return new param;
        }else{
            return new Result([param]);
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
    kink.appendStylesheet = function(path,options){Css.appendStylesheet(path,options)};

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
     * @param {Function} callable  the new method function, scope of 'this' will be the Result obj
     */
    kink.extend = function(method,callable){
        if(Result.prototype[method]===undefined){
            Result.prototype[method] = callable;
            return true;
        }
        return false;
    }


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

        return new method.call(this,url, options);
    };

    window.kk = kink;
    return kink;
});
