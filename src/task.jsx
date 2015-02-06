var React = require('react/addons');
var Block = require('./block');
var SelectBlock = require('./select-block');
var ToggleTask = require('./toggle-task');

var Task = React.createClass({
    handleTaskChanged: function(){
        if(typeof this.props.onTaskChanged === 'function'){
            this.props.onTaskChanged.apply(this, arguments);
        }
    },
    handleBlockAdded: function(blockData){ 
        var taskData = this.props.data;
        taskData.blocks.push(blockData);
        this.handleTaskChanged(taskData);
    },
    handleBlockChanged: function(index, block){
        var taskData = this.props.data;
        taskData.blocks[index] = block;
        this.handleTaskChanged(taskData);
    },
    handleBlockRemoved: function(index){
        var taskData = this.props.data;
        taskData.blocks.splice(index, 1);
        this.handleTaskChanged(taskData);
    },
    renderBlocks: function(){
        var _this = this;
        if(this.props.data && this.props.data.blocks.length > 0){
            return this.props.data.blocks.map(function(blockData, i){
                return (
                    <Block 
                        onBlockRemoved={_this.handleBlockRemoved.bind(_this, i)} 
                        onBlockChanged={_this.handleBlockChanged.bind(_this, i)} 
                        data={blockData}></Block>
                );
            });
        }
    },
    render: function(){
        return (
            <div className="task text-left">
                {this.renderBlocks()}
                <div className="row">
                    <div className="c2in4"><SelectBlock task={this.props.data} onSelect={this.handleBlockAdded.bind(this)}></SelectBlock></div>
                    <div className="c2in4"><ToggleTask task={this.props.data}></ToggleTask></div>
                </div>
            </div>
        );
    }
});

module.exports = Task;
