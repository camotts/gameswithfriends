(function(){
class Logger {
    constructor(enable) {
        this.isEnabled = enable
    }
    log(...a){
        if(this.isEnabled) {
            var ret = ""
            a.forEach(function(v) {
                ret = ret.concat(v)
            })
            console.log(ret)
        }
    }
    logf(fmt, ...v){
        if(this.isEnabled){
            console.log(fmt, v)
        }
    }
    enable(y){
        this.isEnabled = y
    }
}

if ((typeof module !== 'undefined' && typeof module.exports !== 'undefined')) {
    module.exports = Logger
} else {
    window.Logger = Logger
}
})();