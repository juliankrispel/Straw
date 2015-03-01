var React = require('react');
var _ = require('lodash');
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
        var _this = this;
        this.setState({running: !this.state.running});
        if(!this.state.running){
            this.setState({running: true});
            this.currentStream = taskRunner.start(_.cloneDeep(this.props.task.blocks));
            this.currentStream.on('data', function(){
                console.log('file', arguments);
            });
            this.currentStream.on('end', function(){
                _this.setState({running: false});
            });
        }else{
            this.currentStream.end();
        }
    },
    validate: function(){
        return true;
    },
    render: function(){
        return <button 
            className="btn-large" 
            disabled={!this.validate()} 
            onClick={this.handleToggle}>
            {this.state.running ? 'Stop' : 'Start'}
            </button>
    }
});

