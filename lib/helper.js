define(['kink.js'],function(kink){

    /**
     * @DISCLAIMER
     * largely ispired in the jQuery core code. no need to re-invent the wheel here.
     */




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
        type: function(target){

            if(target===null){
                return 'null';
            }

            if(target===undefined){
                return 'undefined';
            }

            var objectTypes = "object function array string number boolean date error regexp".split(" ");
            var jsType = typeof target;

            if(jsType==='object'){
                /* global toString */
                var evalType = (toString.call(target)).replace(/\[object|\s|\]/ig,'').toLowerCase();

                return (this.inArray(evalType,objectTypes)>0) ?  evalType : jsType;

            }else{
                return jsType;
            }
        },


        /**
         * @method kink.now()
         * @for kink
         * @return {int} unix timestamp
         */
        now: function(){
            return (new Date()).toTime();
        },


        /**
         * @method kink.isJSON()
         * @for kink
         * @return {bool}
         */
        isJSON: InkString.isJSON,


        /**
         * @method kink.isFunction()
         * @for kink
         * @return {bool}
         */
        isFunction: function(target) {
            return (this.type(target)==="function");
        },


        /**
         * @method kink.isWindow()
         * @for kink
         * @return {bool}
         */
        isWindow: function(target) {
            return (target===target.window);
        },


        /**
         * @method kink.isNumeric()
         * @for kink
         * @return {bool}
         */
        isNumeric: function(target) {
            return (target - parseFloat(target)>=0);
        },


        /**
         * checks if an object is empty
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
         * Trows an error.
         * @param  {string} msg Error menssage
         * @return {void}
         */
        error: function(msg) {
            throw new Error(msg);
        },


        /**
         * Turns a dashed string into a camelCase one
         * @param  {string} string some-dashed-string-like-this
         * @return {string} stringLikeThis
         */
        camelCase: function( string ) {
            return string.replace( /-([\da-z])/gi,function(all,letter) {
                                                    return letter.toUpperCase();
                                                });
        },


        /**
         * Truncates a string, breaking words and adding ... at the end
         *
         * @method .truncateString()
         * @param {String} string
         * @param {Number} length - length limit for the string. String will be at most this big, ellipsis included.
         * @return {String} string truncated
         */
        truncate: InkString.truncateString,


        /**
         * Remove spaces and new line from biggin and ends of string
         *
         * @method trim
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
         * @method trim
         * @param {String} string
         * @return {String} string trimmed
         */
        stripTags: InkString.stripTags,


        /**
         * Convert listed characters to HTML entities
         *
         * @method htmlEntitiesEncode
         * @param {String} string
         * @return {String} string encoded
         */
        htmlEntitiesencode: InkString.htmlEntitiesEncode,


        /**
         * Convert listed HTML entities to character
         *
         * @method htmlEntitiesDecode
         * @param {String} string
         * @return {String} string decoded
         */
        htmlEntitiesDecode: InkString.htmlEntitiesDecode,


        /**
         * Just an empty function
         * @return {void}
         */
        noop: function() {}

     });



});