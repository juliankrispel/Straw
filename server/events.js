var tasks = require('./tasks');
var ipc = require('ipc'); 
var dialog = require('dialog');

module.exports = function(){
    ipc.on('start', function(_, data){
        tasks.run(data);
    });
    ipc.on('openDialog', function(){
        console.log('>>>>>>> hey');
        console.log(arguments);
    });
};

