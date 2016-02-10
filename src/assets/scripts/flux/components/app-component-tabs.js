import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs/lib/main";

class ComponentTabs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.componentId,
            name: props.componentName,
            tabs: [
                {
                    name: "Docs",
                    content: props.data.docs
                },
                {
                    name: "Markup",
                    content: props.data.markup
                },
                {
                    name: "Context",
                    content: props.data.context
                },
                {
                    name: "Styles",
                    content: props.data.styles
                },
                {
                    name: "Scripts",
                    content: props.data.scripts
                }
            ]
        };
    }

    componentDidMount() {
        const _this = this;
        const socket = window.socket;

        socket.on("update", data => {
            if (data.file === this.state.name) {
                const component = data.components[_this.state.id];

                _this.setState({
                    id: component.id,
                    name: component.name,
                    tabs: [
                        {
                            name: "Docs",
                            content: component.docs
                        },
                        {
                            name: "Markup",
                            content: component.markup
                        },
                        {
                            name: "Context",
                            content: component.context
                        },
                        {
                            name: "Styles",
                            content: component.styles
                        },
                        {
                            name: "Scripts",
                            content: component.scripts
                        }
                    ]
                });
            }
        });
    }

    render() {
        return (
            <Tabs>
                <TabList>
                    {this.state.tabs.map((item, index) => {
                        return (
                            <Tab key={index}>{item.name}</Tab>
                        );
                    })}
                </TabList>
                {this.state.tabs.map((item, index) => {
                    let content = item.content;
                    if (typeof item.content === "object") {
                        content = JSON.stringify(item.content);
                    }

                    return (
                        <TabPanel key={index}>
                            <pre className="pl-component__pre"><code>{content}</code></pre>
                        </TabPanel>
                    );
                })}
            </Tabs>
        );
    }
}

module.exports = props => new ComponentTabs(props);
