define(['kink.js'],function(kink){


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


});