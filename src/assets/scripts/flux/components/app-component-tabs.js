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
                    highlighting: false,
                    content: props.data.docs
                },
                {
                    name: "HTML",
                    highlighting: "language-html",
                    content: props.data.compiledHtml
                },
                {
                    name: "Markup",
                    highlighting: "language-html",
                    content: props.data.markup
                },
                {
                    name: "Context",
                    highlighting: "language-javascript",
                    content: props.data.context
                },
                {
                    name: "Styles",
                    highlighting: "language-css",
                    content: props.data.styles
                },
                {
                    name: "Scripts",
                    highlighting: "language-javascript",
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
                            highlighting: "language-markdown",
                            content: component.docs
                        },
                        {
                            name: "HTML",
                            highlighting: "language-html",
                            content: component.compiledHtml
                        },
                        {
                            name: "Markup",
                            highlighting: "language-html",
                            content: component.markup
                        },
                        {
                            name: "Context",
                            highlighting: "language-javascript",
                            content: component.context
                        },
                        {
                            name: "Styles",
                            highlighting: "language-css",
                            content: component.styles
                        },
                        {
                            name: "Scripts",
                            highlighting: "language-javascript",
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

                    function createMarkup(html) { return {__html: html}; };

                    if (item.name === "Docs") {
                        console.log(item.content)
                        return (
                            <TabPanel key={index}>
                                <div dangerouslySetInnerHTML={createMarkup(item.content)} />
                            </TabPanel>
                        );
                    } else {
                        return (
                            <TabPanel key={index}>
                                <pre className={item.highlighting}><code>{content}</code></pre>
                            </TabPanel>
                        );
                    }
                })}
            </Tabs>
        );
    }
}

module.exports = props => new ComponentTabs(props);
