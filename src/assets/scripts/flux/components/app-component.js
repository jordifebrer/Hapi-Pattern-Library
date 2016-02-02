import React from 'react';

class Component extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.data;
  }

  componentDidMount() {
    const _this = this;
    const socket = window.socket;

    socket.on('update', data => {
      _this.stateHandler(data.components[_this.state.id]);
    });
  }

  stateHandler(newState) {
    this.setState(newState);
  }

  render() {
    const component = this.state;
    const path = "/component/" + component.name;
    return (
      <div>
        <h2>{component.name}</h2>
        <iframe src={path} name={component.name} width="420" height="420"></iframe>
      </div>
    );
  }
}

module.exports = props => new Component(props);
