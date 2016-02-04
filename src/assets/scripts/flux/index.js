import React from 'react';
import ComponentList from './components/app-component-list';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            components: props.components
        };
    }

    componentDidMount() {
        const _this = this;
        const socket = window.socket;

        socket.on('update', data => {
            _this.stateHandler({
                components: data.components
            });
        });
    }

    stateHandler(newState) {
        this.setState(newState);
    }

    render() {
      const components = this.state.components;

      return (
        <div>
          <ComponentList components={components} />
        </div>
      );
    }
}

module.exports = props => new App(props);