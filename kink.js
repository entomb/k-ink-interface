var kk = (function(Ink){

    //query selector result class
    var Result = function(resultArray){
        this.arr = resultArray;


        this.get = function(i) {
            if(i==undefined) i = 0;

            return new Result([this.arr[i]]);
        };

        this.result = function(i) {
            if(i==undefined){
                return this.arr;
            }else{
                return this.arr[i];
            }
        };

        return this;
    }

    //Ink.Util.Array
    Result.prototype.each = function(iterator) {
        Ink.Util.Array.each(this.arr,iterator);
        return this;
    };


    //Ink.Dom.Css
    Result.prototype.addClassName = Result.prototype.addClass = function(className){
        this.each(function(elem,key){
            Ink.Dom.Css.addClassName(elem,className);
        });

        return this;
    };

    Result.prototype.removeClassName = Result.prototype.removeClass = function(className){
        this.each(function(elem,key){
            Ink.Dom.Css.removeClassName(elem,className);
        });

        return this;
    };

    Result.prototype.setClassName = Result.prototype.setClass = function(className,boolState){
        this.each(function(elem,key){
            Ink.Dom.Css.setClassName(elem,className,boolState);
        });

        return this;
    };

    Result.prototype.hasClassName = Result.prototype.hasClass = function(className){
        return this.some(function(elem,key){
            return Ink.Dom.Css.hasClassName(elem,className);
        });
    };

    Result.prototype.hide = function(){
         this.each(function(elem){
            Ink.Dom.Css.hide(elem);
        });
        return this;
    };

    Result.prototype.show = function(){
        this.each(function(elem){
            Ink.Dom.Css.show(elem);
        });
        return this;
    };

    Result.prototype.showHide = function(boolState){
        this.each(function(elem){
            Ink.Dom.Css.showHide(elem,boolState);
        });
        return this;
    };

    Result.prototype.toggle = function(){
        this.each(function(elem){
            Ink.Dom.Css.toggle(elem,boolState);
        });
        return this;
    };

    Result.prototype.style = Result.prototype.setStyle = function(inlineStyle){
        this.each(function(elem){
            Ink.Dom.Css.setStyle(elem,inlineStyle);
        });
        return this;
    };

    //Ink.Dom.Event
    Result.prototype.bind = function(ev,calable){
        if(calable==null){
            //call
            this.each(function(elem){
                Ink.Dom.Event.fire(elem,ev);
            });
        }else{
            //bind
            this.each(function(elem){
                Ink.Dom.Event.observe(elem,ev,calable);
            });
        }

        return this;
    };

    Result.prototype.click = function(calable){
        return this.bind('click',calable);
    };

    Result.prototype.dblclick = function(calable){
        return this.bind('dblclick',calable);
    };

    Result.prototype.mousemove = function(calable){
        return this.bind('mousemove',calable);
    };

    Result.prototype.mouseover = function(calable){
        this.bind('mouseover',calable);
        return this;
    };
    Result.prototype.mouseout = function(calable){
        this.bind('mouseout',calable);
        return this;
    };

    Result.prototype.hover = function(calableIn,calableOut){
        if(calableOut==undefined){
            this.mouseover(calableIn);
        }else{
            this.mouseover(calableIn).mouseout(calableOut);
        }

        return this;
    };



    //Ink.Dom.Element
    Result.prototype.html = function(html){
        if(html==null && this.arr.length===1){
            return Ink.Dom.Element.textContent(this.result(0));
        }

        this.each(function(elem){
            Ink.Dom.Element.setTextContent(elem,html);
        });

        return this;
    };

    Result.prototype.appendHTML = function(html){

        this.each(function(elem){
            Ink.Dom.Element.appendHTML(elem,html);
        });

        return this;
    };

    Result.prototype.prependHTML = function(html){

        this.each(function(elem){
            Ink.Dom.Element.prependHTML(elem,html);
        });

        return this;
    };

    Result.prototype.remove = function(){
        this.each(function(elem){
            Ink.Dom.Element.remove(elem);
        });
        return true;
    };

    Result.prototype.data = function(){
        return Ink.Dom.Element.data(this.result(0));
    };

    Result.prototype.size = Result.prototype.elementDimensions = function(){
        return Ink.Dom.Element.elementDimensions(this.result(0));
    };

    Result.prototype.height = Result.prototype.elementHeight = function(){
        return Ink.Dom.Element.elementHeight(this.result(0));
    };

    Result.prototype.width = Result.prototype.elementWidth = function(){
        return Ink.Dom.Element.elementWidth(this.result(0));
    };

    Result.prototype.hasAttribute = function(attr){
        return this.some(function(elem){
            return Ink.Dom.Element.hasAttribute(elem,attr);
        });
    };

    Result.prototype.scroll = function(){
        return Ink.Dom.Element.scroll(this.result(0));
    };

    Result.prototype.scrollTo = function(){
        return Ink.Dom.Element.scrollTo(this.result(0));
    };

    Result.prototype.siblings = function(){
        return new Result(Ink.Dom.Element.siblings(this.result(0)));
    };

    Result.prototype.parent = function(){
        return new Result([this.result(0).parentNode]);
    };

    Result.prototype.childs = function(i){

        var fetchedChilds = [];

        this.each(function(elem){
            var collection = Ink.Util.Array.convert(elem.children);
            var childs = new Result(collection);
            childs.each(function(childElem){
                fetchedChilds.push(childElem);
            });
        });

        if(i==undefined){
            return new Result(fetchedChilds);
        }else{
            return new Result(fetchedChilds).get(i);
        }
    };

    Result.prototype.find = function(param){
        var foundElements = [];

        this.each(function(elem){
            var elements = new Result(Ink.Dom.Selector.select(param,elem));
            elements.each(function(childElem){
                foundElements.push(childElem);
            });
        });

        return new Result(foundElements);
    }

    var kink = function(param,context){
        if(typeof param == 'string'){
            return new Result(Ink.Dom.Selector.select(param,context));
        }else if(param instanceof Array){
            return new Result(param);
        }else{
            return new Result([param]);
        }
    };


    kink.viewportHeight = Ink.Dom.Element.viewportHeight;
    kink.viewportWidth  = Ink.Dom.Element.viewportWidth;

    kink.ready    = function(callable){Ink.Dom.Loaded.run(callable)};
    kink.browser  = Ink.Dom.Browser;
    kink.url      = Ink.Util.Url;
    kink.date     = Ink.Util.Date;
    kink.string   = Ink.Util.String;
    kink.cookie   = Ink.Util.Cookie;

    // AJAX
    kink.ajax = function(url,options,onComplete){
        if(typeof options=='function'){
            var onComplete = options;
            var options = new Object();
        }else if(options==undefined){
            var options = new Object();
        }

        if(onComplete!=undefined){
            options.onComplete = onComplete;
        }

        return new Ink.Net.Ajax(url,options);
    }

    // JsonP
    kink.JsonP = function(url,options,onComplete){
        if(typeof options=='function'){
            var onComplete = options;
            var options = new Object();
        }else if(options==undefined){
            var options = new Object();
        }

        if(onComplete!=undefined){
            options.onComplete = onComplete;
        }

        return new Ink.Net.JsonP(url,options);
    }



 return kink
})(Ink);