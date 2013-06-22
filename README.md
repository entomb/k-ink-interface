What is k(InK)
==============

__k(Ink)__ is a kinky way to interact with the [ink.js library](https://github.com/sapo/ink.js) (currently used on all SAPO.pt projects and some OS as well) easing the pain of designers and developers alike when using the awesome [Ink css framework](http://ink.sapo.pt/).

__k(Ink)__ takes some of the functionality of the full fledged ink.js and creates a set of chainable methods and aliases, allowing for easy usage, fast implementation and code readability. The fan made library comes in a small <10kb minified file that works with the most recent Ink (v2) packag

How does it work
================

Lets say you want to create a dinamically generated menu. you prepare a script in JS that reads all the `div.content` elements and uses the content of the first `H2` as a title and then insejcts the `.sidebar` with links to the content. simple hum?

Lets see how that`s done using Ink.js

```js
Ink.Dom.Loaded.run(function(){

   var contentH2 = Ink.Dom.Selector.select('.content h2');
   var sidebar   = Ink.Dom.Selector.select('.sidebar ul')[0];
   
   Ink.Util.Array.each(contentH2,function(elem){
        var name  = Ink.Dom.Element.textContent(elem);
        var perma = name.replace(/\s/g,"-");

        elem.setAttribute('id',perma);

        Ink.Dom.Element.appendHTML(sidebar,"<li><a href='#"+perma+"'>"+name+"</a></li>");
   });

}); 
```

Ok... not that hard... how would someone who isn`t a full time javascript developer or has bad memory for namespaces do this kind of script?

Enter __k(Ink)__, a small wrapper for the Ink.js framework.
__k(Ink)__ does not add or remove any of Ink.js functionality, it`s a simple wrapper for the many methods and classes present on Ink allowing for chained calls with a simple human API. 

Check out the exact same functionality, but now using k(Ink)
```js
//find every h2 under the class .content
kk('.content').find('h2').each(function(elem){
    //get name and permalink
    var name  = kk(elem).html();
    var perma = name.replace(/\s/g,"-");
    //assign the new ID
    kk(elem).id(perma);
    //inject the menu on the .sidebar
    kk('.sidebar ul').appendHTML("<li><a href='#"+perma+"'>"+name+"</a></li>");
}); 
```

Looks Familiar... ?


Instalation
===========

__k(Ink)__ is built as a Ink.js module, So the requirements are the [Ink.js core](http://ink.sapo.pt/js/core).
after this you just need to include it on your script and it will load the dependencies. Its recommended that you use Ink-all.js so your page doesn't clutter with dependencie requests, bur for now __k(Ink)__ does not offer any wrapper for the Ink-UI modules.

```html
<script type="text/javascript" src="http://cdn.ink.sapo.pt/2.0.0/js/ink.min.js"></script>
<script type="text/javascript" src="/your/site/js/kink.js"></script> 
```


The kink (kk) Object
====================


The kink object, by default assigned to `kk` is the main selector and wrapper. It allways returns a kResult Object that can then be manipulated using the API. _Full API documentation is under construction._


Kink accepts many inputs, depending on your needs

`kink(selector[,context])`

###Example###
```js
//string
kk('div')

kk('div#mastodon')

kk('ul li a.active')

//array
kk([1,2,3])

//kResult object
var parent = kk('div')
kk(parent)

//dom element
kk(document.body)

//function
kk(function(){
    return "a.selected";
})

kk(function(context){
    return [1,2,3];
},context) 
```


Licence
=======
k(Ink) is under the [MIT licence}(http://opensource.org/licenses/MIT), so feel free to use, modify and contribute to its code



DEMO
====
http://inktest.eu01.aws.af.cm/
