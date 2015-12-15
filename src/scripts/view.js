var React = require('react');
var ReactDOM = require('react-dom');
var parser = require('./index.js');

var Extras = React.createClass({
  render: function() {
    return (
      <div className="extras">
        <button type="button" onClick={this.props.onDup}>Dup</button>
        <button type="button" onClick={this.props.onRemove}>Remove</button>
      </div>
    );
  }
});

var SelectorSpan = React.createClass({
  render: function() {
    var className;
    className = 'type-' + this.props.type;

    return (
      <span className={className}>
        {this.props.children}
      </span>
    );
  }
});

var TextField = React.createClass({
  handleChange: function(e) {
    this.props.onInput(e.target.value);
  },

  render: function() {
    var SelectorSpanNodes = this.props.data.segments.map(function(ss) {
      return (
        <SelectorSpan type={ss.type} key={ss.id}>
          {ss.selector}
        </SelectorSpan>
      );
    });
    return (
      <div className="text-field">
        <input className="event-capture" value={this.props.data.raw} onChange={this.handleChange} />
        {SelectorSpanNodes}
      </div>
    );
  }
});

var BoxType = React.createClass({
  render: function() {
    var className="box type-" + this.props.type;
    return (
      <div className={className}>
        <div className="inner">
          <span className="number">{this.props.number}</span>
          <span className="description">{this.props.desc}</span>
        </div>
      </div>
    );
  }
});

var ListBox = React.createClass({
  render: function() {
    return (
      <div className="list-box">
        <BoxType type="2" desc="IDs"
          number={this.props.data.types[2].length} />
        <BoxType type="1" desc="classes"
          number={this.props.data.types[1].length} />
        <BoxType type="0" desc="el"
          number={this.props.data.types[0].length} />
      </div>
    );
  }
});

var SpecifictyTable = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  handleInput: function(selector) {
    this.props.onInput(selector, this.props.id);
  },
  handleDup: function() {
    this.props.onDup(this.props.id, this.props.data);
  },
  handleRemove: function() {
    this.props.onRemove(this.props.id);
  },
  render: function() {
    return (
      <div className="content-box">
        <TextField data={this.props.data} onInput={this.handleInput}/>
        <ListBox data={this.props.data}/>
        <Extras onDup={this.handleDup} onRemove={this.handleRemove}/>
      </div>
    );
  }
});

var Specificty = React.createClass({
  getInitialState: function() {
    return {
      data: [
        {
          id:11111,
          handleInput: this.handleInput,
          handleDup: this.handleDup,
          handleRemove: this.handleRemove,
          parse: parser('button .btn.btn-primary[data-select="link"] button#btn1:hover > span::first-letter#abc:hover::first-line')
        }
      ]
    };
  },
  // TODO change forceUpdate() to setState
  handleInput: function(selector, id, data) {
    var index = this.state.data.map(function(d){return d.id}).indexOf(id);
    this.state.data[index].parse = parser(selector);
    this.forceUpdate();
  },
  handleDup: function(id, data) {
    var index = this.state.data.map(function(d){return d.id}).indexOf(id) + 1;
    this.state.data.splice(index, 0, {id: Math.random(), handleInput: this.handleInput, handleDup: this.handleDup, handleRemove: this.handleRemove, parse: data});
    // TODO change the random number generate system
    // this.forceUpdate() alternate for this.setState, rerender
    this.forceUpdate();
  },
  handleRemove: function(id) {
    var index = this.state.data.map(function(d){return d.id}).indexOf(id);
    if (index > -1) {
      this.state.data.splice(index, 1);
    }
    this.forceUpdate();
  },
  handleSort: function() {
    this.state.data.sort(function(a, b) {
      var specA = a.parse.types[0].length + a.parse.types[1].length * 1000 + a.parse.types[2].length * 1000000
        , specB = b.parse.types[0].length + b.parse.types[1].length * 1000 + b.parse.types[2].length * 1000000;
    console.log(specA,specB);


      return specA > specB ? -1 : (specA < specB ? 1 : 0);
    });
    this.forceUpdate();
  },
  render: function() {
    var SpecifictyNodes = this.state.data.map(function(d) {
      return (
        <SpecifictyTable onInput={d.handleInput} onDup={d.handleDup} onRemove={d.handleRemove} id={d.id} key={d.id} data={d.parse}/>
      );
    });
    return (
      <div className="main-content">
        <button type="button" onClick={this.handleSort}>Sort</button>
        {SpecifictyNodes}
        <CustomInput/>
      </div>
    );
  }
});

var CustomInput = React.createClass({
  getInitialState: function() {
    return {
      data: [
        "f", "u", "k"
      ]
    }
  },
  componentDidMount: function() {
    var textBox = document.getElementById('container');
    textBox.addEventListener('keydown', this.handleKeyDown);
  },
  focusEl: function() {
    var textBox = document.getElementsByClassName('text-box')[0];
    // DOMEl need tabIndex so that DOM can be focused
    textBox.focus();
  },
  handleKeyDown: function(e) {
    var keyCode = e.keyCode;

    var keyValue = null;
    if(keyCode <= 90 && keyCode >= 65) {
      // key for alphabet
      if(e.shiftKey) {
        keyValue = String.fromCharCode(keyCode);
      } else {
        keyValue = String.fromCharCode(keyCode + 32);
      }
    } else if (keyCode >= 48 && keyCode <= 57) {
      // key for numbers
      if (e.shiftKey) {
        keyValue = null;
        if (keyCode == 51) {
          // key for #
          keyValue = String.fromCharCode(35);
        }
      } else {
        keyValue = String.fromCharCode(keyCode);
      }
    } else if (keyCode == 190) {
      // key for . and >
      if (e.shiftKey) {
        keyValue = String.fromCharCode(62);
      } else {
        keyValue = String.fromCharCode(46);
      }
    } else if (keyCode == 189) {
      // key for - and _
      if (e.shiftKey) {
        keyValue = String.fromCharCode(95);
      } else {
        keyValue = String.fromCharCode(45);
      }
    } else if (keyCode == 222) {
      // key for ' and "
      if (e.shiftKey) {
        keyValue = String.fromCharCode(34);
      } else {
        keyValue = String.fromCharCode(39);
      }
    } else if (keyCode == 187) {
      // key for = and not +
      keyValue = String.fromCharCode(61);
      if (e.shiftKey) {
        keyValue = null;
      }
    } else if (keyCode == 186 && e.shiftKey) {
      // key for : and not ;
      keyValue = String.fromCharCode(58);
    } else if (keyCode == 192 && e.shiftKey) {
      // key for ~ and not `
      keyValue = String.fromCharCode(126);
    } else if (keyCode == 219) {
      // key for [ and not {
      keyValue = String.fromCharCode(91);
      if (e.shiftKey) {
        keyValue = null;
      }
    } else if (keyCode == 221) {
      // key for ] and not }
      keyValue = String.fromCharCode(93);
      if (e.shiftKey) {
        keyValue = null;
      }
    } else if (keyCode == 32) {
      keyValue = String.fromCharCode(keyCode);
    }

    console.log(keyCode);
    this.state.data.push(keyValue);
    this.forceUpdate();
  },
  render: function() {
    var CharacterNodes = this.state.data.map(function(c) {
      return (
        <span>{c}</span>
      )
    });
    return (
      <div className="text-box" tabIndex="0" onClick={this.focusEl}>
        {CharacterNodes}
      </div>
    );
  }
});

ReactDOM.render(
  <div>
    <Specificty/>
  </div>,
    document.getElementById('container')
);

