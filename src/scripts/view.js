//<Spec>
  //<SpecTab>
    //<Text>
      //<CustomInput>
    //<List>
      //<Box>
    //<Extra>
//<SpecifictyTable
//  onInput={d.handleInput}
//  onDup={d.handleDup}
//  onRemove={d.handleRemove}
//  handleFocus={d.handleFocus}
//  tabindex={d.tabindex}
//  id={d.id}
//  key={d.id}
//  data={d.parse}
///>
//<TextField
//  data={this.props.data}
//  handleFocus={this.handleFocus}
//  tabindex={this.props.tabindex}
//  onInput={this.handleInput}
///>
//<ListBox
//  data={this.props.data}
///>
//<Extras
//  onDup={this.handleDup}
//  onRemove={this.handleRemove}
///>
//<CustomInput className="event-capture"
//  handleFocus={this.props.handleFocus}
//  tabindex={this.props.tabindex}
//  setValue={this.props.data.segments}
//  onChange={this.handleChange}
///>
//<BoxType type="2" desc="IDs" 
//  number={this.props.data.types[2].length}
///>
var React = require('react');
var ReactDOM = require('react-dom');
var parser = require('./index.js');

var Extras = React.createClass({
  render: function() {
    return (
      <div className="extras">
        <div className="btn btn-success extra-left" onClick={this.props.onDup}>
          <div className="icon icon-copy">
            <div className="paper paper-first">
              <div className="top-left"></div>
              <div className="top-right"></div>
              <div className="bottom">
                <div className="lines">
                  <div className="line line-normal"></div>
                  <div className="line line-normal"></div>
                  <div className="line line-normal"></div>
                  <div className="line line-short"></div>
                </div>
              </div>
            </div>
            <div className="paper paper-second">
              <div className="top-left"></div>
              <div className="top-right"></div>
              <div className="bottom">
                <div className="lines">
                  <div className="line line-normal"></div>
                  <div className="line line-normal"></div>
                  <div className="line line-normal"></div>
                  <div className="line line-short"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="btn btn-danger extra-right" onClick={this.props.onRemove}>
          <div className="icon icon-trash">
            <div className="trash-body">
              <div className="lid">
                <div className="top">
                  <div className="inside"></div>
                </div>
                <div className="bottom"></div>
              </div>
              <div className="can">
                <div className="lines">
                  <div className="line v-line"></div>
                  <div className="line v-line"></div>
                  <div className="line v-line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var TextField = React.createClass({
//<TextField
//  data={this.props.data}
//  handleFocus={this.handleFocus}
//  tabindex={this.props.tabindex}
//  onInput={this.handleInput}
///>
  //this.props.data = {
  //  raw:,types:,segments:[Obj,Obj]
  //  eg: Obj = {selector: "button", type: "none"}
  //}
  handleChange: function(value) {
    // e.target.value will be value gotten from custominput
    this.props.onInput(value);
  },

  render: function() {
    // structure the props.data.segments data into each letter with types
    return (
      <div className="text-field">
        <CustomInput className="event-capture" handleFocus={this.props.handleFocus} tabindex={this.props.tabindex} setValue={this.props.data.segments} onChange={this.handleChange} />
      </div>
    );
  }
});

var BoxType = React.createClass({
//<BoxType type="2" desc="IDs" 
//  number={this.props.data.types[2].length}
///>
  render: function() {
    var className="box type-" + this.props.type;
    return (
      <div className="table-cell">
        <div className={className}>
          <div className="inner">
            <span className="number">{this.props.number}</span>
            <span className="description">{this.props.desc}</span>
          </div>
        </div>
      </div>
    );
  }
});

var ListBox = React.createClass({
//<ListBox
//  data={this.props.data}
///>
  // this.props.data = {
  //   raw:,
  //   types: [Arr,Arr,Arr],
  //   segments:
  // }
  render: function() {
    return (
      <div className="list-box-container">
        <div className="list-box">
          <BoxType type="2" desc="IDs"
            number={this.props.data.types[2].length} />
          <BoxType type="1" desc="Classes, attributes and pseudo-classes"
            number={this.props.data.types[1].length} />
          <BoxType type="0" desc="Elements and pseudo-elements"
            number={this.props.data.types[0].length} />
        </div>
      </div>
    );
  }
});

var CustomInput = React.createClass({
//<TextField
//  data={this.props.data}
//  handleFocus={this.handleFocus}
//  tabindex={this.props.tabindex}
//  onInput={this.handleInput}
///>
  //this.props.data = {
  //  raw:,types:,segments:[Obj,Obj]
  //  eg: Obj = {selector: "button", type: "none"}
  //}
//<CustomInput className="event-capture"
//  handleFocus={this.props.handleFocus}
//  tabindex={this.props.tabindex}
//  setValue={this.props.data.segments}
//  onChange={this.handleChange}
///>
  //selectorSpanNodes =
  //  [{sel:['b','u'],typ:0},{}]
  //
  //selectorNodes =
  //  [{sel:'b', typ:0},{}]
  //
  // TODO remove this.state.data
  transformParseValue: function(arrSelTyp) {
    var selectorSpanNodes = arrSelTyp.map(function(ss) {
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
    return selectorNodes
  },
  specTableIndex: function() {
    return this.props.tabindex
  },
  specTable: function() {
    return document.getElementsByClassName('action-event')[this.specTableIndex()]
  },
  currentTextBox: function() {
    return this.specTable().getElementsByClassName('text-box')[0]
  },
  getInitialState: function() {
    var selectorNodes = this.transformParseValue(this.props.setValue);
    return {
      data: selectorNodes
    }
  },
  componentDidMount: function() {
    var textBox = this.currentTextBox();
    textBox.addEventListener('keydown', this.handleKeyDown, true);
    textBox.addEventListener('blur', this.focusOut, true);
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
      spanArray[i].className = spanArray[i].className.replace(' cursor','');
    }
  },
  focusEl: function() {
    this.props.handleFocus();
//    var textBox = document.getElementsByClassName('text-box')[0];
//    console.log(document.getElementsByClassName('text-box'));
//    // DOMEl need tabIndex so that DOM can be focused
//    textBox.focus();
//    var spanArray = textBox.childNodes;
//    spanArray[this.state.index].className += " cursor";
  },
  handleKeyDown: function(e) {
    var spanArray = this.specTable().getElementsByClassName('text-box')[0].childNodes;
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
    var spanArray = this.specTable().getElementsByClassName('text-box')[0].childNodes;
    for (var i=0; i<spanArray.length; i++) {
      spanArray[i].className = spanArray[i].className.replace(' cursor','');
    }
    spanArray[this.state.index].className += " cursor";
    this.forceUpdate();
  },
  render: function() {
    var selectorNodes = this.transformParseValue(this.props.setValue);
    var CharacterNodes = selectorNodes.map(function(c) {
      var className = 'type-' + c.typ;
      return (
        <span className={className}>{c.sel}</span>
      )
    });
    return (
      <div className="text-box" tabIndex={this.specTableIndex()} onClick={this.focusEl}>
        {CharacterNodes}
      </div>
    );
  }
});


var SpecifictyTable = React.createClass({
//<SpecifictyTable
//  onInput={d.handleInput}
//  onDup={d.handleDup}
//  onRemove={d.handleRemove}
//  handleFocus={d.handleFocus}
//  tabindex={d.tabindex}
//  id={d.id}
//  key={d.id}
//  data={d.parse}
///>
  handleInput: function(selector) {
    this.props.onInput(selector, this.props.id);
  },
  handleDup: function() {
    this.props.onDup(this.props.id, this.props.data);
  },
  handleRemove: function() {
    this.props.onRemove(this.props.id);
  },
  handleFocus: function() {
    this.props.handleFocus(this.props.id);
  },
  render: function() {
    return (
      <div className="action-event">
        <div className="content-box active">
          <TextField data={this.props.data} handleFocus={this.handleFocus} tabindex={this.props.tabindex} onInput={this.handleInput}/>
          <ListBox data={this.props.data}/>
          <Extras onDup={this.handleDup} onRemove={this.handleRemove}/>
        </div>
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
          handleFocus: this.handleFocus,
          tabindex: 0,
          parse: parser('button .btn.btn-primary[data-select="link"] button#btn1:hover > span::first-letter#abc:hover::first-line')
        }
      ]
    };
  },
  specTableArr: function() {
    return this.state.data
  },
  specTableIndex: function(id) {
    return this.specTableArr().map(function(d){return d.id}).indexOf(id)
  },
  // TODO change forceUpdate() to setState
  handleInput: function(selector, id) {
    var specTable = this.specTableArr()[this.specTableIndex(id)];
    specTable.parse = parser(selector);
    this.forceUpdate();
  },
  handleDup: function(id, data) {
    var nextSpecTableIndex = this.specTableIndex(id) + 1;
    this.specTableArr().splice(nextSpecTableIndex, 0, {
      id: Math.random(),
      handleInput: this.handleInput,
      handleDup: this.handleDup,
      handleRemove: this.handleRemove,
      handleFocus: this.handleFocus,
      tabindex: nextSpecTableIndex,
      parse: data
    });
    // TODO change the random number generate system
    // this.forceUpdate() alternate for this.setState, rerender
    this.forceUpdate();
  },
  handleRemove: function(id) {
    if (this.specTableIndex(id) > -1) {
      this.specTableArr().splice(this.specTableIndex(id), 1);
    }
    this.forceUpdate();
  },
  handleSort: function() {
    this.specTableArr().sort(function(a, b) {
      var specA = a.parse.types[0].length + a.parse.types[1].length * 1000 + a.parse.types[2].length * 1000000
        , specB = b.parse.types[0].length + b.parse.types[1].length * 1000 + b.parse.types[2].length * 1000000;

      return specA > specB ? -1 : (specA < specB ? 1 : 0);
    });
    this.forceUpdate();
  },
  handleFocus: function(id) {
    var clickedSpecTable = document.getElementsByClassName('action-event')[this.specTableIndex(id)];
    var focusedTextBox = clickedSpecTable.getElementsByClassName('text-box')[0];
    focusedTextBox.focus();
//    var spanArray = textBox.childNodes;
//    spanArray[this.state.index].className += " cursor";
  },
  render: function() {
    var SpecifictyNodes = this.specTableArr().map(function(d) {
      return (
        <SpecifictyTable onInput={d.handleInput} onDup={d.handleDup} onRemove={d.handleRemove} handleFocus={d.handleFocus} tabindex={d.tabindex} id={d.id} key={d.id} data={d.parse}/>
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

ReactDOM.render(
  <div>
    <Specificty/>
  </div>,
    document.getElementById('list')
);

