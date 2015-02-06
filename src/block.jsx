var React = require('react/addons');
var BlockOption = require('./block-option');

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
        return <div className="block">
            <div className="row m-b--l cf">
                <h3 className="left">{this.props.data.name}</h3>
                <button className="right remove-block" onClick={this.handleBlockRemove}>&times;</button>
            </div>
            {this.renderBlockConfig()}
        </div>;
    }
});

module.exports = Block;
