
var fs = require('fs');

var FuckWord = function () {
    this.regexp = null;
    this.init();
}

FuckWord.prototype.init = function () {
    var self = this;
    var fuckwords = fs.readFileSync(__dirname+'/fuckword.txt','utf8');
    fuckwords = fuckwords.split('、');

    var regexMetachars = /[(){[*+?.\\^$|]/g;

    for (var i = 0; i < fuckwords.length; i++) {
        fuckwords[i] = fuckwords[i].replace(regexMetachars, "\\$&");
    }
    var regexp = new RegExp("(?:" + fuckwords.join("|") + ")", "gi");
    self.regexp = regexp;
}

FuckWord.prototype.check = function (word) {
    var self = this;

    var result = word.match(self.regexp) || [];

    if(result.length){
        result = result.filter(function (item) {
            return !!item;
        });
    }

    return result.length;
}

module.exports = new FuckWord();