define(['kink.js'],function(kink){

    /**
     * @DISCLAIMER
     * largely ispired in the jQuery core code. no need to re-invent the wheel here.
     */


     /**
      * Helper var with valid object types for .type()
      * @private
      */
     var objectTypes = "object function array string number boolean date error regexp".split(" ");


    /**
     * @module Helper
     * @for kResult
     */

    /**
     * @Class Helper




     */
    kink.extend({
        /**
         * @property kink.browser
         * @for kink
         * @public
         */
        browser: InkBrowser,


        /**
         * @method kink.type()
         * @param  {mixed} element to inspect
         * @return {string} returns the type of the object.
         * @description

    #type table:
        true               === "boolean"
        new Boolean()      === "boolean"
        3                  === "number"
        new Number(3)      === "number"
        "test"             === "string"
        new String("test") === "string"
        function(){}       === "function"
        []                 === "array"
        new Array()        === "array"
        new Date()         === "date"
        new Error()        === "error"
        /test/             === "regexp"


         */
        type: function(target,compare){

            var jsType = typeof target;

            if(target===null){
                jsType = 'null';
            }else if(target===undefined){
                jsType = 'undefined';
            }else if(jsType==='object'){
                /* global toString */
                var evalType = (toString.call(target)).replace(/\[object|\s|\]/ig,'').toLowerCase();

                jsType = (this.inArray(evalType,objectTypes)>0) ? evalType : jsType;
            }

            return (compare===undefined) ? jsType : (jsType===compare);
        },


        /**
         * @method kink.now()
         * @return {int} unix timestamp
         */
        now: function(){
            return (new Date()).toTime();
        },


        /**
         * @method kink.isJSON()
         * @return {bool}
         */
        isJSON: InkString.isJSON,


        /**
         * @method kink.isFunction()
         * @return {bool}
         */
        isFunction: function(target) {
            return (this.type(target,"function"));
        },


        /**
         * @method kink.isWindow()
         * @return {bool}
         */
        isWindow: function(target) {
            return this.type(target,'object') ? (target===target.window) : false;
        },


        /**
         * @method kink.isNumeric()
         * @return {bool}
         */
        isNumeric: function(target) {
            return (target - parseFloat(target)>=0);
        },


        /**
         * checks if an object is empty
         * @method kink.isEmptyObject()
         * @param  {array|object} the element to inspect
         * @return {bool}
         */
        isEmptyObject: function(target) {
            var i;
            for ( i in target ) {
                return false;
            }
            return true;
        },


        /**
         * @method kink.isArray()
         * @param  {mixed} the element to inspect
         */
        isArray: function(target){
            return (this.type(target,"array"));
        },


        /**
         * @method kink.isDOM()
         * @param  {mixed} the element to inspect
         */
        isDOM: function(target){
            //TODO: better check if dom element
            //Take a look at http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object

            return (target instanceof HTMLElement && target.nodeType!==undefined);
        },

        /**
         * Trows an error.
         * @method kink.kink()
         * @param  {string} msg Error menssage
         * @return {void}
         */
        error: function(msg) {
            throw new Error(msg);
        },


        /**
         * Turns a dashed string into a camelCase one
         * @method kink.camelCase()
         * @param  {string} string some-dashed-string-like-this
         * @return {string} stringLikeThis
         */
        camelCase: function( target ) {
            if(this.type(target,'string')){
                return false;
            }

            return target.replace( /-([\da-z])/gi,function(all,letter) {
                                                    return letter.toUpperCase();
                                                });
        },


        /**
         * Truncates a string, breaking words and adding ... at the end
         *
         * @method kink.truncateString()
         * @param {String} string
         * @param {Number} length - length limit for the string. String will be at most this big, ellipsis included.
         * @return {String} string truncated
         */
        truncate: InkString.truncateString,


        /**
         * Remove spaces and new line from biggin and ends of string
         *
         * @method kink.trim()
         * @param {String} string
         * @return {String} string trimmed
         */
        trim: function(str){
            str = (str==="" || str===undefined || str===null) ? "" : String(str);
            return InkString.trim(str);
        },


        /**
         * Remove spaces and new line from biggin and ends of string
         *
         * @method kink.stripTags()
         * @param {String} string
         * @return {String} string trimmed
         */
        stripTags: function(str){
            if(!this.type(str,'string')){
                return false;
            }

            return InkString.stripTags(str);
        },


        /**
         * Convert listed characters to HTML entities
         *
         * @method kink.htmlEntitiesEncode()
         * @param {String} string
         * @return {String} string encoded
         */
        htmlEntitiesencode: function(str){
            if(!this.type(str,'string')){
                return false;
            }

            return InkString.htmlEntitiesEncode(str);
        },


        /**
         * Convert listed HTML entities to character
         *
         * @method kink.htmlEntitiesDecode()
         * @param {String} string
         * @return {String} string decoded
         */
        htmlEntitiesDecode: function(str){
            if(!this.type(str,'string')){
                return false;
            }

            return InkString.htmlEntitiesDecode(str);
        },

        /**
         * Parses a string into an HTML fragment, then returns an array with each element generated
         *
         * @param  {string} html String to parse. must be valid HTML
         * @return {Array}  Array of elements generated from the string
         */
        parseHTML: function(html){
            if(this.type('html','string')){
                var fragment = InkElement.htmlToFragment(html);
                return InkArray.convert(fragment.children);
            }else{
                return [];
            }
	},


        /**
         * Just an empty function
         * @method kink.noop()
         * @return {void}
         */
        noop: function() {}

     });



});
