var React = require('react');
var blockTypes = require('./block-types.js');

var SelectBlock = React.createClass({
    getInitialState: function(){
        return { 
            blockTypes: blockTypes,
            active: false
        };
    },
    handleBlockSelected: function(){
        this.setState({active: false});
        if(typeof this.props.onSelect === 'function'){
            this.props.onSelect.apply(this, arguments);
        }
    },
    toggle: function(){
        this.setState({active: !this.state.active});
    },
    renderBlockOptions: function(){
        var _this = this;
        return <div className="select-block">
            {this.state.blockTypes.map(function(type){
                return <button 
                    disabled={!type.validate(_this.props.task)} 
                    onClick={_this.handleBlockSelected.bind(this, type)}>
                    {type.name}
                </button>;
            })}
            </div>
    },
    render: function(){
        if(this.state.active){
            return this.renderBlockOptions();
        }else{
            return <button onClick={this.toggle}>+</button>;
        }
    }
});

module.exports = SelectBlock;
