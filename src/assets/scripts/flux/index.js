const isNode = typeof module !== 'undefined' && module.exports
  , React = isNode ? require('react') : window.React
  , ReactDOM = isNode ? require('react') : window.ReactDOM;


class App extends React.Component {
  render() {
    return (
      <div>{this.props[0].name}</div>
    );
  }
}

if (isNode) {
  module.exports = App;
} else {
  module.exports = ReactDOM.render(<App data={window.reactClient} />, document.getElementById('react-root'));
}