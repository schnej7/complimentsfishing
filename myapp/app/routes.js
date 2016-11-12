module.exports = function(app, passport) {

    var wordGame = require('../my_modules/wordGame.js');
    var jadeObject = require('../app/jadeObject.js');

    app.get('/', preReq, function (req, res) {
      res.render(
        'index',
        jadeObject.basic(req, 'Jerry Schneider')
      )
    });

    app.get('/blog', preReq, function (req, res) {
      res.render(
        'blog',
        jadeObject.basic(req, "Jerry's Blog")
        .setSocialDescription("The most recent blog posts by Jerry Schneider are waiting to be read!")
      )
    });

    app.get('/blog/*', preReq, function (req, res) {
      filename = req.params[0];
      if (!filename) {
          return;
      }
      console.log("rendering partial at: ", filename);
      res.render(
        "blog/"+filename,
        jadeObject.basic(req, filename)
        .setSocialDescription("Read this article and more at jerry-schneider.com/blog!")
        .customSEO(true)
      )
    });

    app.get('/google62bc3c09f7c33d86.html', preReq, function(req, res) {
      res.sendfile('static/google62bc3c09f7c33d86.html');
    });

    // accept POST request on the homepage
    app.post('/', function (req, res) {
      res.send('Got a POST request');
    });

    app.get('*', function(req, res){
      res.status(404).render(
        '404',
        jadeObject.noSocial(req, "404")
      )
    });
};

// route from www to non-www
function preReq(req, res, next) {
    if (req.headers.host.match(/^www/) !== null ) {
        res.redirect('http://' + req.headers.host.replace(/^www\./, '') + req.url);
    } else {
        return next();     
    }
}
