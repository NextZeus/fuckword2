
var fs = require('fs');

var FuckWord = function () {
    this.regexp = null;
    this.init();
}

FuckWord.prototype.init = function () {
    var self = this;
    var path = __dirname + '/../config/fuckword.txt';

    var fuckwords = fs.readFileSync(path,'utf8');

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

    if(typeof word != 'string'){
        console.error('TypeError: '+ word + ' word is not a string!');
        return 0;
    }

    var result = word.match(self.regexp) || [];

    return result.length;
}

module.exports = new FuckWord();