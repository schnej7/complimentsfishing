module.exports = function(app) {

    var jadeObject = require('../app/jadeObject.js');

    app.get('/', preReq, function (req, res) {
      res.render(
        'index',
        jadeObject.basic(req, 'Fishing for Compliments')
      )
    });

    app.get('/blog', preReq, function (req, res) {
      res.render(
        'blog',
        jadeObject.basic(req, "Blog")
        .setSocialDescription("The most recent blog posts by Fishing for Compliments are waiting to be read!")
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
        .setSocialDescription("Read this article and more at complimentsfish.com/blog!")
        .customSEO(true)
      )
    });

    app.get('/google83fbe56aa3c7f77e.html', preReq, function(req, res) {
      res.sendfile('static/google83fbe56aa3c7f77e.html');
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
