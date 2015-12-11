var Type2Cal = React.createClass({
    render: function() {
        return (
          <div>
          </div>
        );
    }
});

var SpecDup = React.createClass({
    render: function() {
        return (
          <a />
        );
    }
});

var SpecDisplay = React.createClass({
    render: function() {
        return (
          <Type2Cal />
          //<Type1Cal />
          //<Type0Cal />
        );
    }
});

var SpecInput = React.createClass({
    render: function() {
        return (
          <textarea className="input" type="text" />
        );
    }
});

var SpecificityBox = React.createClass({
    render: function() {
        return (
            <div className="item">
                <SpecInput />
                <SpecDisplay />
                <SpecDup />
            </div>
        );
    }
});

ReactDOM.render(
  <SpecificityBox />,
  document.getElementById('content')
);
