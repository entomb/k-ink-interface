/**
 * @module window
 */
define([
        'kink-core.js',
        'helper.js',
        'result.js',
        'array.js',
        'element.js',
        'dom.js',
        'css.js'
    ],function(kink){

    /**
    * Kink main and global object

    * @property kink
    * @type {Class}
    * @for window
    * @global
    */
    window.kink = kink;

    /**
    * Shorthand for the Kink main and global object
    * @property kk
    * @type {Class}
    * @for window
    * @global
    */
    window.kk = kink;


    return kink;
});