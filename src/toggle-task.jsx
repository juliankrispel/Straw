var React = require('react');
var ipc = require('ipc');
var fs = require('fs');
var taskRunner = require('./task-runner');

module.exports = React.createClass({
    getInitialState: function(){
        return {
            running: false
        };
    },
    handleToggle: function(){
        this.setState({running: !this.state.running});
        if(!this.state.running){
            console.log('start');
            taskRunner.start(this.props.task.blocks);
            //ipc.send('start', this.props.task);
        }else{
            console.log('stop');
            //ipc.send('stop');
        }
    },
    validate: function(){
        return true;
    },
    render: function(){
        return <button n
            className="btn-large" 
            disabled={!this.validate()} 
            onClick={this.handleToggle}>
                Start
            </button>
    }
});

