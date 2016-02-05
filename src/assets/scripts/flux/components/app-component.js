import React from 'react';
import ComponentTabs from './app-component-tabs';

class Component extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.data;
  }

  componentDidMount() {
    const _this = this;
    const socket = window.socket;
    const iframes = Array.prototype.slice.call(document.querySelectorAll('iframe'));

    const resizeIframe = iframe =>
      iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';

    window.addEventListener('load', () => iframes.map(iframe => {
        resizeIframe(iframe);
    }), false);

    socket.on('update', data => {
      if(data.components[_this.state.id] !== this.state){
        _this.stateHandler(data.components[_this.state.id]);

        iframes.map(iframe => {
          if(iframe.name === data.file) {
            iframe.contentWindow.location.reload();

            resizeIframe(iframe);
          }
        });
      }
    });
  }

  stateHandler(newState) {
    this.setState(newState);
  }

  render() {
    const component = this.state;
    const path = "/component/" + component.name;

    const data = {
      markup: component.markup,
      context: component.context,
      styles: component.styles,
      scripts: component.scripts,
      docs: component.docs
    };

    return (
      <div className="app-component">
        <h2 className="app-component__title">{component.name}</h2>
        <iframe className="app-component__iframe" src={path} name={component.name}></iframe>
        <ComponentTabs data={data} />
      </div>
    );
  }
}

module.exports = props => new Component(props);
