var React = require('react');

var BlockOption = React.createClass({
    handleOptionChange: function(value){
        if(typeof this.props.onOptionChange === 'function'){
            this.props.onOptionChange.apply(this, [value]);
        }
    },
    handleInputChange: function(e){
        this.handleOptionChange(e.target.value);
    },
    renderRadioOptions: function(options, name, selected){
        var _this = this;
        var opts = options.map(function(option){
            return (
                <label>
                    <input onChange={_this.handleOptionChange.bind(_this, option.value)} 
                        name={name} 
                        type="radio" 
                        checked={selected === option.value} 
                        value={option.value}/>
                    {option.name}
                </label>);
        });
        console.log(opts);

        return opts;
    },
    render: function(){
        var output;
        var _this = this;
        switch(this.props.data.type){
            case 'textInput':
                output = <div>
                        <label 
                            for={this.props.data.ref}>
                            {this.props.data.name}</label>
                        <input 
                            onChange={_this.handleInputChange} 
                            type="text" 
                            value={this.props.data.value}/>
                    </div>;
                break ;
            case 'radio':
                output = 
                    <div>
                        {this.renderRadioOptions(this.props.data.options, this.props.data.ref, this.props.data.value)}
                    </div>
                break;
            default:
                break;
        }

        return output;
    }
});

module.exports = BlockOption;
