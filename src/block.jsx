var React = require('react');
var BlockOption = require('./block-option.jsx');

var Block = React.createClass({
    handleBlockChanged: function(){
        if(typeof this.props.onBlockChanged === 'function'){
            this.props.onBlockChanged.apply(this, arguments);
        }
    },
    onBlockConfigChange: function(index, value){
        var blockData = this.props.data;
        blockData.config[index].value = value;
        this.handleBlockChanged(blockData);
    },
    handleBlockRemove: function(){
        if(typeof this.props.onBlockRemoved === 'function'){
            this.props.onBlockRemoved();
        }
    },
    renderBlockConfig: function(){
        var _this = this;
        if(this.props.data.config && this.props.data.config.length > 0){
            return this.props.data.config.map(function(option, i){
                return <BlockOption key={i} onOptionChange={_this.onBlockConfigChange.bind(_this, i)} data={option}></BlockOption> 
            });
        }
    },
    render: function(){
        return <div>
            <h2>{this.props.data.name}</h2>
            <button onClick={this.handleBlockRemove}>Remove</button>
            {this.renderBlockConfig()}
        </div>;
    }
});

module.exports = Block;
