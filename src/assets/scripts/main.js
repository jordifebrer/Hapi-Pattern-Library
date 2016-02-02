require('jquery');
require('bootstrap');
require('./client');

if (document.getElementById('react-root')) {
  const React = require('react');
  const ReactDOM = require('react-dom');
  const App = require('./flux');


  ReactDOM.render(
    <App components={window.reactClient} />,
    document.getElementById('react-root'));
}