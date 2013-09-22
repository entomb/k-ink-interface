Kink Tests
==========

###browser
To run the tests simply open the /tests/index.html page on your browser. Tests are powered by [qunit](http://qunitjs.com/)

###phantomjs
if whant to run them from your console, you'll need phantomjs (using this [addon](https://github.com/jquery/qunit/tree/master/addons))

```sh
$ phantomjs runner.js index.html
```

###Grunt
Run the tests when you compile k(ink).

```sh
$ grunt tests
```

this will compile all lib/*.js files and run unit tests