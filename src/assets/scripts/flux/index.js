import React from 'react';

//import ComponentList from './components/app-component-list';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            components: this.props.components
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
      return (
        <div>
        {this.state.components.map(component => {
          return <div>{component.name}</div>
        })}
        </div>
      );
    }
}

module.exports = props => new App(props);