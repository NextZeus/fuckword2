# check illegal word 检测非法词

### RegExp

```javascript

var regexp = new RegExp("(?:" + fuckwords.join("|") + ")", "gi");

```

### check

```javascript

var fuckword2 = require('fuckword2');

var word = "fuck";

var checkResult = fuckword2.check(word);

if(!!checkResult){
    console.log(word + ' is a illegal word!');
}

```


