var _ = require('lodash');
var React = require('react/addons');
var blockTypes = require('./block-types');
var Task = require('./task');

var mapStringifiedBlock = function(block){
    for(var i = 0; i < blockTypes.length; i++){
        if(block.ref === blockTypes[i].ref){
            block = _.extend(_.cloneDeep(blockTypes[i]), block);
            break ;
        }
    }
    return block;
};

var Tasks = React.createClass({
    getInitialState: function(){
        var state = JSON.parse(window.localStorage.getItem('plumber'));
        if(state && state.tasks && state.tasks[0].blocks){
            var tasks = state.tasks.map(function(task){
                task.blocks = task.blocks.map(mapStringifiedBlock);
                return task;
            });
            state.tasks = tasks;
            return state;
        }else{
            return {
                tasks: [{
                    blocks: []
                }]
            };
        }
    },

    addTask: function(){
        this.state.tasks.push({blocks: []});
        this.setState(this.state);
    },

    handleTaskChanged: function(index, task){
        this.state.tasks[index] = task;
        this.forceUpdate();
        window.localStorage.setItem('plumber', JSON.stringify(this.state));
    },

    render: function(){
        var _this = this;
        return <div className="nowrap">
            {this.state.tasks.map(function(taskData, i){
                    return <Task 
                        onTaskChanged={_this.handleTaskChanged.bind(_this, i)}
                        data={taskData}></Task>
            })}
            <button onClick={this.addTask.bind(this)} className="btn-large add-task">+</button>
        </div>;
    }

});

module.exports = Tasks;
