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
    this.setState({data: parser(selector.toString())});
  },
  handleDup: function() {
    this.props.onDup(this.props.id, this.state.data);
  },
  handleRemove: function() {
    this.props.onRemove(this.props.id);
  },
  render: function() {
    return (
      <div className="content-box">
        <TextField data={this.state.data} onInput={this.handleInput}/>
        <ListBox data={this.state.data}/>
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
          handleDup: this.handleDup,
          handleRemove: this.handleRemove,
          parse: parser('button .btn.btn-primary[data-select="link"] button#btn1:hover > span::first-letter#abc:hover::first-line')
        }
      ]
    };
  },
  handleDup: function(id, data) {
    var index = this.state.data.map(function(d){return d.id}).indexOf(id) + 1;
    this.state.data.splice(index, 0, {id: Math.random(), handleDup: this.handleDup, handleRemove: this.handleRemove, parse: data});
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
  render: function() {
    var SpecifictyNodes = this.state.data.map(function(d) {
      return (
        <SpecifictyTable onDup={d.handleDup} onRemove={d.handleRemove} id={d.id} key={d.id} data={d.parse}/>
      );
    });
    return (
      <div className="main-content">
        {SpecifictyNodes}
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

