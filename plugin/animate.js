(function(Ink){

    Ink.Dom.Css.appendStylesheet('plugin/animate.css');

    kk.extend('animate',function(effect){

        this.each(function(elem){
            var currentAnimation = kk(elem).data().animation;
            if(currentAnimation!=undefined){
                kk(elem).removeClass(currentAnimation);
            }
           elem.dataset.animation = effect;
           kk(elem).addClass('animated').addClass(effect);
        });

    });


})(Ink);