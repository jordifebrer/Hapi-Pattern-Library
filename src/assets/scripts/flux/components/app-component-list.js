import React from 'react';
import Component from './app-component';

class ComponentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      components: props.components
    };
  }

  render() {
    return (
      <div>
      {this.state.components.map((component, index) => {
        return <Component key={index} data={component} />
      })}
      </div>
    );
  }
}

module.exports = props => new ComponentList(props);
