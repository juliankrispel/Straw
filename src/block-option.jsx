var React = require('react/addons');
var ipc = require('ipc');
var remote = require('remote');
var dialog = remote.require('dialog');

var BlockOption = React.createClass({
    getInitialState: function(){
        return {
            valid: true
        }
    },
    handleOptionChange: function(value){
        if(typeof this.props.onOptionChange === 'function'){
            this.props.onOptionChange.apply(this, [value]);
        }
    },
    handleInputChange: function(e){
        this.handleOptionChange(e.target.value);
        var validateInput = this.props.data.validate;
        if(typeof validateInput === 'function' && !validateInput(e.target.value)){
            this.setState({ valid: false });
        }
    },
    renderSelect: function(options, name, selected){
        var _this = this;

        return <select value={selected} onChange={this.handleInputChange} name={name}>
        {options.map(function(option){
            return (
                <option  
                    value={option.value}>
                    {option.name}
                </option>
            );
        })}</select>

        return opts;

    },
    directoryInput: function(e){
        var _this = this;
        e.target.blur();
        dialog.showOpenDialog({title: 'Pick folder', properties: ['openDirectory']}, function(paths){
            if(paths && paths.length > 0){
                _this.handleOptionChange(paths[0]);
            }
        });    
    },
    renderDirectoryInput: function(){
        return <input 
            type="text" 
            placeholder={this.props.data.name} 
            onFocus={this.directoryInput} 
            value={this.props.data.value}/>
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

        return opts;
    },
    render: function(){
        var output;
        var _this = this;

        var inputClasses = React.addons.classSet({
            'invalid': !this.state.valid
        });

        switch(this.props.data.type){
            case 'textInput':
                output = <div className="row">
                        <label 
                            className="c2in5"
                            for={this.props.data.ref}>
                            {this.props.data.name}
                        </label>
                        <div className="c3in5">
                            <input 
                                className={inputClasses}
                                onChange={_this.handleInputChange} 
                                type="text" 
                                value={this.props.data.value}/>
                        </div>
                    </div>;
                break;
            case 'directory':
                output =
                    <div className="row m-b">
                        <label className="c2in5" for={this.props.data.ref}>{this.props.data.name}</label>
                        <div className="c3in5">{this.renderDirectoryInput()}</div>
                    </div>;
                break;
            case 'select':
                output = 
                    <div className="row m-b">
                        <label className="c2in5" for={this.props.data.ref}>{this.props.data.name}</label>
                        <div className="c3in5">{this.renderSelect(this.props.data.options, this.props.data.ref, this.props.data.value)}</div>
                    </div>;
                break;
            case 'radio':
                output = 
                    <div className="row">
                        <label className="c2in5">{this.props.data.name}</label>
                        <div className="c3in5">{this.renderRadioOptions(this.props.data.options, this.props.data.ref, this.props.data.value)}</div>
                    </div>;
                break;
            default:
                break;
        }

        return output;
    }
});

module.exports = BlockOption;
