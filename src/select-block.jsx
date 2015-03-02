var React = require('react/addons');
var blockTypes = require('./block-types.js');
window.React = React;

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
        this.setState(
            {active: !this.state.active}
        );
    },
    renderBlockOptions: function(){
        var classes = React.addons.classSet({
            'select-block': true,
            'active': this.state.active
        });

        var _this = this;
        return <div className={classes}>
            {this.state.blockTypes.map(function(type){
                return <button 
                    disabled={!type.validate(_this.props.task)} 
                    onClick={_this.handleBlockSelected.bind(this, type)}>
                    {type.name}
                </button>;
            })}
            <button className="closeBlockSelection" onClick={this.toggle}>&times;</button>
            </div>;
    },
    render: function(){
        if(this.state.active){
            return this.renderBlockOptions();
        }else{
            return <button onClick={this.toggle} className="btn-large">+</button>;
        }
    }
});

module.exports = SelectBlock;
