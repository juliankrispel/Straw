var gulp = require('gulp');

var streams = [];

var buildTaskRecursively = function(stream, blocks){
    var nextBlock;
    var pluginArgs;
    var plugin;
    if(!blocks || blocks.length < 1){
        return stream
    }else{
        nextBlock = blocks.shift();

        if(nextBlock.package){
            plugin = require(nextBlock.package);
        }else{
            plugin = gulp[nextBlock.ref];
        }
        pluginArgs = nextBlock.getConfigArguments();

        return buildTaskRecursively(
            stream.pipe(plugin.apply(plugin, pluginArgs)), 
            blocks);
    }
};

var BlockStream = function(stream, srcStream){
    this.srcStream = srcStream;
    this.stream = stream;
};

BlockStream.prototype.end = function(){
    if(this.srcStream.close){
        this.srcStream.close();
    }
    if(this.srcStream.end){
        this.srcStream.end();
    }
};

BlockStream.prototype.on = function(type, fn){
    this.srcStream.on(type, fn);
};

module.exports = {
    start: function(blocks){
        var firstBlock = blocks.shift();

        if(firstBlock.type !== 'readable-stream'){
            throw new Error('first block has to be a Readable Stream');
        }

        var streamFunction;
        if(!firstBlock.package && firstBlock.ref === 'src'){
            streamFunction = gulp.src;
        }else if(firstBlock.package){
            streamFunction = require(firstBlock.package);
        }
        var streamArguments = firstBlock.getConfigArguments();

        var srcStream = streamFunction.apply(this, streamArguments);
        return new BlockStream(buildTaskRecursively(srcStream, blocks), srcStream);
    }
};
