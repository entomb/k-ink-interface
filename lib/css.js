define(['kink.js'],function(kink){

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

            if(typeof cssProp==="string"){
                if(value===undefined){
                    return InkCss.getStyle(this.get(0),cssProp);
                }else{
                    return this.each(function(i,elem){
                        InkCss.setStyle(elem,cssProp+":"+value);
                    });
                }
            }else if(cssProp instanceof Object){
                return this.each(function(i,elem){
                    kink.extend(elem.style || {},cssProp);
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