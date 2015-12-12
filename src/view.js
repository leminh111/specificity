var SelectorSpan = React.createClass({
  render: function() {
    var className;
    if (this.props.whitespace) {
      className = 'type-' + this.props.type + ' ' + this.props.whitespace;
    } else {
      className = 'type-' + this.props.type;
    }

    return (
      <span className={className}>
        {this.props.children}
      </span>
    );
  }
});

var TextField = React.createClass({
  getInitialState: function() {
    return {input: ''};
  },
  handleChange: function(e) {
    this.setState({input: e.target.value});
  },

  render: function() {
    var SelectorSpanNodes = this.props.data.segments.map(function(ss) {
      return (
        <SelectorSpan type={ss.type} whitespace={ss.whitespace ? ss.whitespace : null}>
          {ss.selector}
        </SelectorSpan>
      );
    });
    return (
      <div className="text-field">
        <input className="event-capture" value={this.state.input} onChange={this.handleChange} />
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
    render: function() {
      this.data = {
        raw: 'button.btn#btn1:hover img',
        types: {
          0:['button', 'img'],
          1:['.btn',':hover'],
          2:['#btn1']
        },
        segments:[
          {selector: 'button',type:0},
          {selector: '.btn', type:1},
          {selector: '#btn1', type:2},
          {selector:':hover', type:1},
          {selector:'img', type:0, whitespace: 'whitespace'}
        ]
      };

      return (
        <div className="content-box">
          <TextField data={this.data}/>
          <ListBox data={this.data}/>
        </div>
      );
    }
});

ReactDOM.render(
  <div>
    <SpecifictyTable />
    <SpecifictyTable />
    <SpecifictyTable />
  </div>,
    document.getElementById('container')
);
