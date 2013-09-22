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
                return this.removeClass().addClass(className);
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


});