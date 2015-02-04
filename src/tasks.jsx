var React = require('react');
var Task = require('./task.jsx');

var Tasks = React.createClass({
    getInitialState: function(){
        return {
            tasks: [{
                blocks: []
            }]
        };
    },
    handleTaskChanged: function(index, task){
        this.state.tasks[index] = task;
        this.forceUpdate();
    },
    render: function(){
        var _this = this;
        return <div>{
            this.state.tasks.map(function(taskData, i){
                return <Task 
                    onTaskChanged={_this.handleTaskChanged.bind(_this, i)}
                    data={taskData}></Task>
            })}
        </div>;
    }
});

module.exports = Tasks;
