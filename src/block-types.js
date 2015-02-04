var hasBlock = function(blocks, obj){
    var ar = blocks.filter(function(block){
        var containsObject = true;
        for(var key in obj){
            if(block[key] !== obj[key]){
                containsObject = false;
            }
        }
        return containsObject;
    });
    if(ar.length > 0){
        return true;
    }else{
        return false;
    }
}

module.exports = [
    {
        ref: 'watch',
        package: 'gulp-watch',
        type: 'readable-stream',
        name: 'Watch Stream',
        description: 'Create a stream from watching files',
        config: [
            {
                name: 'Watch Glob',
                ref: 'glob',
                type: 'textInput',
                value: '',
                required: true
            }
        ],
        validate: function(task){
            return !hasBlock(task.blocks, {type: 'readable-stream'});
        }
    },
    {
        ref: 'src',
        package: null,
        type: 'readable-stream',
        name: 'File Stream',
        description: 'Create a stream from one or more files',
        config: [
            {
                name: 'Source Glob',
                ref: 'glob',
                type: 'textInput',
                value: '',
                required: true
            }
        ],
        validate: function(task){
            return !hasBlock(task.blocks, {type: 'readable-stream'});
        }
    },
    {
        ref: 'dest',
        package: null,
        name: 'Destination',
        type: 'writable-stream',
        description: 'Write stream to directory',
        config: [
            {
                name: 'Path',
                ref: 'path',
                type: 'textInput',
                value: '',
                required: true
            }
        ],
        validate: function(task){
            return hasBlock(task.blocks, {type: 'readable-stream'});
        }
    },
    {
        ref: 'concat',
        package: 'gulp-concat',
        name: 'Concatenate Files',
        type: 'through-stream',
        description: 'Concatenate everything into one file',
        config: [
            {
                name: 'File-name',
                ref: 'filename',
                type: 'textInput',
                value: '',
                required: true
            }
        ],
        validate: function(task){
            return !hasBlock(task.blocks, {ref: 'concat'}) && 
                hasBlock(task.blocks, {type: 'readable-stream'});
        }
    },
    {
        ref: 'less',
        package: 'gulp-less',
        name: 'Compile Less',
        type: 'through-stream',
        description: 'Compile less into CSS files',
        config: [
            {
                name: 'Drop Line-numbers ',
                ref: 'dropLineNumbers',
                type: 'radio',
                options: [
                    {name: 'Yes', value: true}, 
                    {name: 'No', value: false}
                ],
                value: false,
                required: false
            },
            {
                name: 'Environment',
                ref: 'env',
                type: 'radio',
                options: [
                    {name: 'Development', value: 'development'},
                    {name: 'Production', value: 'production'}
                ],
                value: 'development',
                required: false,
            },
        ],
        validate: function(task){
            return !hasBlock(task.blocks, 'less') &&
                hasBlock(task.blocks, {type: 'readable-stream'});
        }

    },
    {
        ref: 'coffee',
        package: 'gulp-coffee',
        type: 'through-stream',
        name: 'Compile Coffeescript',
        description: 'Compile Coffeescript into JavaScript',
        config: [
            {
                name: 'Bare',
                ref: 'bare',
                type: 'radio',
                options: [
                    {name: 'Yes', value: true},
                    {name: 'No', value: false}
                ],
                value: false,
                required: false
            }
        ],
        validate: function(task){
            return !hasBlock(task.blocks, 'coffee') &&
                hasBlock(task.blocks, {type: 'readable-stream'});
        }
    }
];
