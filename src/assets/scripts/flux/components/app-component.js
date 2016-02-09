import React from 'react';
import ComponentTabs from './app-component-tabs';

class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.data.id,
            name: props.data.name,
            data: {
                markup: props.data.markup,
                context: props.data.context,
                styles: props.data.styles,
                scripts: props.data.scripts,
                docs: props.data.docs
            }
        };
    }

    componentDidMount() {
        const socket = window.socket;
        const iframes = Array.prototype.slice.call(document.querySelectorAll('iframe'));

        const resizeIframe = iframe =>
            iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';

        window.addEventListener('load', () => iframes.map(iframe => {
            resizeIframe(iframe);
        }), false);

        socket.on('update', data => {
            if (data.file === this.state.name) {
                iframes.map(iframe => {
                    if (iframe.name === data.file) {
                        iframe.contentWindow.location.reload();

                        resizeIframe(iframe);
                    }
                });
            }
        });
    }

    render() {
        const path = "/component/" + this.state.name;

        return (
            <div className="app-component">
                <h4 className="app-component__title">{this.state.name}</h4>
                <iframe className="app-component__iframe" src={path}
                        name={this.state.name}></iframe>
                <ComponentTabs data={this.state.data}
                               componentName={this.state.name}
                               componentId={this.state.id}/>
            </div>
        );
    }
}

module.exports = props => new Component(props);
