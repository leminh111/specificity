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

var TextField = React.createClass({
  handleChange: function(value) {
    // e.target.value will be value gotten from custominput
    this.props.onInput(value);
  },

  render: function() {
    // structure the props.data.segments data into each letter with types
    return (
      <div className="text-field">
        <CustomInput className="event-capture" setValue={this.props.data.segments} onChange={this.handleChange} />
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
  handleInput: function(selector, id) {
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
      </div>
    );
  }
});

var CustomInput = React.createClass({
  // TODO remove this.state.data
  getInitialState: function() {
    var selectorSpanNodes = this.props.setValue.map(function(ss) {
      var sel = ss.selector.split(''),
          typ = ss.type,
          nodes = {
            sel,
            typ
          };
      return nodes;
    });
    var selectorNodes = [];
    for (var k=0;k<selectorSpanNodes.length;k++) {
      for (var i=0;i<selectorSpanNodes[k].sel.length;i++) {
        var sel = selectorSpanNodes[k].sel[i],
            typ = selectorSpanNodes[k].typ,
            obj = {
              sel,
              typ
            };
        selectorNodes.push(obj);
      }
    }
    return {
      data: selectorNodes
    }
  },
  componentDidMount: function() {
    var textBox = document.getElementsByClassName('text-box')[0];
    textBox.addEventListener('keydown', this.handleKeyDown, true);
    //textBox.addEventListener('blur', this.focusOut, true);
    this.state.data.push({sel: ' ', typ: 0});
    this.state.raw = this.state.data.map(function(d) {
      return d.sel
    });
    this.state.index = this.state.raw.length - 1;
    // FIXME
    this.forceUpdate();
  },
  focusOut: function() {
    var spanArray = document.getElementsByClassName('text-box')[0].childNodes;
    for (var i=0; i<spanArray.length; i++) {
      spanArray[i].style.background= "none";
    }
  },
  focusEl: function() {
    var textBox = document.getElementsByClassName('text-box')[0];
    // DOMEl need tabIndex so that DOM can be focused
    textBox.focus();
    var spanArray = textBox.childNodes;
  },
  handleKeyDown: function(e) {
    var spanArray = document.getElementsByClassName('text-box')[0].childNodes;
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
    } else if (keyCode == 8) {
      // prevent backspace backward the page
      e.preventDefault();
      // Cant backspace if index <= 0
      if (this.state.index > 0) {
        this.state.raw.splice(this.state.index-1, 1);
        this.state.index--;
      }
    } else if (keyCode == 46) {
      // Delete
      e.preventDefault();
      // Cant delete if index > length
      if (this.state.index < this.state.raw.length-1) {
        this.state.raw.splice(this.state.index, 1);
      }
    } else if (keyCode == 37) {
      // arrowleft
      if (this.state.index > 0) {
        this.state.index-- ;
      }
    } else if (keyCode == 39) {
      // arrowright
      if (this.state.index < this.state.raw.length-1) {
        this.state.index++;
      }
    } else if (keyCode == 36) {
      // home
      this.state.index = 0;
    } else if (keyCode == 35) {
      // end
      if (this.state.index < this.state.raw.length-1) {
        this.state.index = this.state.raw.length - 1;
      }
    }

    if (keyValue) {
      this.state.raw.splice(this.state.index, 0, keyValue);
      this.state.index++;
    }
    this.props.onChange(this.state.raw.join(''));
    var spanArray = document.getElementsByClassName('text-box')[0].childNodes;
    for (var i=0; i<spanArray.length; i++) {
      spanArray[i].className = spanArray[i].className.replace(' cursor','');
    }
    spanArray[this.state.index].className += " cursor";
    this.forceUpdate();
  },
  render: function() {
    var selectorSpanNodes = this.props.setValue.map(function(ss) {
      var sel = ss.selector.split(''),
          typ = ss.type,
          nodes = {
            sel,
            typ
          };
      return nodes;
    });
    var selectorNodes = [];
    for (var k=0;k<selectorSpanNodes.length;k++) {
      for (var i=0;i<selectorSpanNodes[k].sel.length;i++) {
        var sel = selectorSpanNodes[k].sel[i],
            typ = selectorSpanNodes[k].typ,
            obj = {
              sel,
              typ
            };
        selectorNodes.push(obj);
      }
    }
    var CharacterNodes = selectorNodes.map(function(c) {
      var className = 'type-' + c.typ;
      return (
        <span className={className}>{c.sel}</span>
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

