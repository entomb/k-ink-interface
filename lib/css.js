define(['kink.js'],function(kink){

    /**
     * Helper to convert an [x,y,z] array into a hex string. usefull for css colors
     *
     * @param  {arr} array to convert
     * @private
     */
    function _arrToHex(arr){
        //don't ask, don't tell!
        return [
                 String("0"+parseInt(arr[0],10).toString(16)).slice(-2),
                 String("0"+parseInt(arr[1],10).toString(16)).slice(-2),
                 String("0"+parseInt(arr[2],10).toString(16)).slice(-2)
            ].join("").toUpperCase();
    }


    /**
     * Helper to parse some CSS props into readable and valid values.
     *
     * @param  {string} str anyting returned by the Ink.Css.getStyle()
     * @private
     */
    function _parseCssValue(str){
        var rgbColor = /rgb\(([\d]{1,3}\, [\d]{1,3}, [\d]{1,3})\)/;
        var rgbaColor = /rgba\(([\d]{1,3}\, [\d]{1,3}, [\d]{1,3}, [\d]{1,3})\)/;

        var matchResult;

        //parse rgb strings
        if(rgbColor.test(str)){
            matchResult = str.match(rgbColor);
            if(matchResult && matchResult.length===2){
                return "#"+_arrToHex(matchResult[1].split(", "));
            }else{
                return str;
            }
        }

        //parse rgba strings to regular color hex
        //TODO: figure out if this is the way to go
        if(rgbaColor.test(str)){
            matchResult = str.match(rgbaColor);
            if(matchResult && matchResult.length===2){
                return "#"+_arrToHex(matchResult[1].split(", "));
            }else{
                return str;
            }
        }


        //no match
        return str;
    }


    /**
     * @module CSS
     * @for kResult
     *
     */

    /**
     * @Class CSS
     */
    kink.result.extend({


    /**
     * @method  .removeClass()
     * @param {String|Array|null} className className or array of classNames to remove
     * @description

    Adds one or more classes to all elements in the resultset


    ###Remove single className

        kk('#addClassTarget').removeClass('redClass');

    ###Remove multiple classNames
        kk('#addClassTarget').removeClass(['redClass','blueBorder]');

    ###Remove all classNames
        kk('#addClassTarget').removeClass();

    **/
        removeClass: function(className){
            if(className===undefined){
                return this.each(function(i,elem){
                    if(elem && elem.hasOwnProperty('className')){
                        elem.className = null;
                    }
                });
            }else if(className instanceof Array){
                return this.each(function(i,elem){
                    kink.each(className,function(k,iclass){
                        InkCss.removeClassName(elem,iclass);
                    });
                });
            }else{
                return this.each(function(i,elem){
                    InkCss.removeClassName(elem,className);
                });
            }
        },


    /**
     * @method  .addClass()
     * @param {String|Array} className className or array of classNames to add
     * @description

    Adds one or more classes to all elements in the resultset



    ###Add single className

        kk('#addClassTarget').addClass('redClass');

    ###Add multiple classNames
        kk('#addClassTarget').addClass(['redClass','blueBorder]');

    **/
        addClass: function(className){
            if(className===undefined){
                return this;
            }else if(className instanceof Array){
                return this.each(function(i,elem){
                    kink.each(className,function(k,iclass){
                        InkCss.addClassName(elem,iclass);
                    });
                });
            }else{
                return this.each(function(i,elem){
                    InkCss.addClassName(elem,className);
                });
            }
        },


        /**
         * @method  .hasClass()
         *
         */
        hasClass: function(className){
            return this.some(function(i,elem){
                return InkCss.hasClassName(elem,className);
            });
        },

        /**
         * @method  .setClass()
         *
         */
        setClass: function(className){
            return this.removeClass().addClass(className.split(/\s+/));
        },

        /**
         * @method  .class()
         *
         */
        class: function(className){
            if(className===undefined){
                var elem = this.get(0);
                return (elem && elem.hasOwnProperty('className')) ? elem.className : '';
            }else{
                return this.setClass(className);
            }
        },


        /**
         * @method  .style()
         *
         */
        style: function(inlineStyle){
            if(inlineStyle===undefined){
                //return this.attr('style');

                //temp while attr() is not ready
                return this.get(0).getAttribute('style').trim();
            }else if(typeof inlineStyle==="string"){
                if(inlineStyle===""){
                    return this.each(function(i,elem){
                        elem.setAttribute('style','');
                    });
                }else{
                    return this.each(function(i,elem){
                        InkCss.setStyle(elem,inlineStyle);
                    });
                }
            }else{
                return this;
            }
        },


        /**
         * @method  .css()
         *
         */
        css: function(cssProp,value){
            //preventing type errors
            if(typeof this.get(0) !== "object" || !this.get(0).hasOwnProperty('style')){
                return this;
            }

            if(kink.type(cssProp,'array')){

                var propValues = {};
                var elem = this.get(0);
                kink.each(cssProp,function(i,prop){
                    propValues[prop] = InkCss.getStyle(elem,prop);
                });

                return propValues;

            }else if(kink.type(cssProp,'string')){
                if(value===undefined){
                    var propValue = InkCss.getStyle(this.get(0),cssProp);

                    return _parseCssValue(propValue);
                }else{
                    return this.each(function(i,elem){
                        InkCss.setStyle(elem,cssProp+":"+value);
                    });
                }
            }else if(kink.type(cssProp,'object')){
                return this.each(function(i,elem){
                    InkCss.setStyle(elem,cssProp);
                    //kink.extend(elem.style || {},cssProp);
                });
            }else{
                return this;
            }
        },

        /**
         * @method  .hide()
         *
         */
        hide: function(){
            return this.each(function(i,elem){
               InkCss.hide(elem);
            });
        },

        /**
         * @method  .show()
         *
         */
        show: function(){
            return this.each(function(i,elem){
               InkCss.show(elem);
            });
        },

        /**
         * @method  .toggle()
         *
         */
        toggle: function(state){
            if(state!==undefined){
                return this.each(function(i,elem){
                   InkCss.showHide(elem,!!state);
                });
            }else{
                return this.each(function(i,elem){
                   InkCss.toggle(elem);
                });
            }
        },

        /**
         * @method  .visible()
         *
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

});