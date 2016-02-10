import React from "react";
import ComponentTabs from "./app-component-tabs";

class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.data.id,
            name: props.data.name,
            data: {
                markup: props.data.markup,
                compiledHtml: props.data.compiledHtml,
                context: props.data.context,
                styles: props.data.styles,
                scripts: props.data.scripts,
                docs: props.data.docs
            }
        };
    }

    componentDidMount() {
        const socket = window.socket;
        const iframes = Array.prototype.slice.call(document.querySelectorAll("iframe"));

        const resizeIframe = iframe =>
            iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";

        window.addEventListener("load", () => iframes.map(iframe => {
            resizeIframe(iframe);
        }), false);

        socket.on("update", data => {
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

    clickHandler() {
      if(window) {
        window.Prism.highlightAll();
      }
    }

    render() {
        const path = "/component/" + this.state.name;

        return (
            <div className="pl-component" onClick={this.clickHandler}>
                <h4 className="pl-component__title">
                    <a href={path} target="_blank">{this.state.name}</a>
                </h4>
                <iframe className="pl-component__iframe" src={path}
                        name={this.state.name}></iframe>
                <ComponentTabs data={this.state.data}
                               componentName={this.state.name}
                               componentId={this.state.id}/>
            </div>
        );
    }
}

module.exports = props => new Component(props);
