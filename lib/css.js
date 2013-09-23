define(['kink.js'],function(kink){


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
            //@TODO:  add .offset() calls instead of this
            return (elem.get(0).offsetHeight>0 &&
                elem.get(0).offsetWidth>0 &&
                elem.css('display')!=="none" &&
                elem.css('visibility')!=="hidden" &&
                elem.css('opacity')>0
            );
        }
    });


});