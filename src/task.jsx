var React = require('react');
var Block = require('./block.jsx');
var SelectBlock = require('./select-block.jsx');

var Task = React.createClass({
    handleTaskChanged: function(){
        if(typeof this.props.onTaskChanged === 'function'){
            this.props.onTaskChanged.apply(this, arguments);
        }
    },
    handleBlockAdded: function(blockData){ 
        console.log('block added');
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
            <div>
                {this.renderBlocks()}
                <SelectBlock task={this.props.data} onSelect={this.handleBlockAdded}>+ Add Block</SelectBlock>
            </div>
        );
    }
});

module.exports = Task;
