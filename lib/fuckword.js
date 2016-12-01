
var fs = require('fs');

var FuckWord = function () {
    this.regex = null;
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
    var regex = new RegExp("(?:" + fuckwords.join("|") + ")", "gi");
    self.regex = regex;
}

FuckWord.prototype.check = function (word) {
    var self = this;

    var result = word.match(self.regex) || [];

    if(result.length){
        result = result.filter(function (item) {
            return !!item;
        });
    }

    return result.length;
}

module.exports = new FuckWord();