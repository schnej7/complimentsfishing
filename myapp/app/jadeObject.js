var moment = require('moment');
var URL = require('url');

function JadeObject(req){

    this.myPath = "http://complimentsfish.com"+URL.parse(req.originalUrl).pathname;

    this.socialDescription = "Fishing for Compliments is the PREMIERE fishing channel for all thing fishing! There is no better resource for fishing, IT'S HUGE!";
    this.socialImageUrl = "http://complimentsfish.com/images/MEAGAIN.png";

    this.year = (moment(Date.now())).format('YYYY');

    this.socialEnabled = true;

    this.setTitle = function(a_title) {
        this.title = a_title;
        return this;
    }

    this.setSocialEnabled = function(a_socialEnabled) {
        this.socialEnabled = !!a_socialEnabled;
        return this;
    }

    this.setUser = function(req) {
        this.user = req.user;
        return this;
    }

    this.setSocialDescription = function(desc) {
        this.socialDescription = desc;
        return this;
    }

    this.setSocialImgUrl = function(url) {
        this.socialImageUrl = url;
        return this;
    }

    this.customSEO = function(isCustom) {
        this.customSEO = isCustom;
        return this;
    }
};

exports.noSocial = function(req, title) {
    var jo = new JadeObject(req);
    return jo.setTitle(title).setSocialEnabled(false);
}

exports.basic = function(req, title) {
    var jo = new JadeObject(req);
    return jo.setTitle(title);
}
