import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs/lib/main';

class ComponentTabs extends React.Component {
    constructor(props) {
        super(props);

        const data = props.data;

        this.state = {
            tabs: [
                {
                    name: 'Docs',
                    content: data.docs
                },
                {
                    name: 'Markup',
                    content: data.markup
                },
                {
                    name: 'Content',
                    content: data.context
                },
                {
                    name: 'Styles',
                    content: data.styles
                },
                {
                    name: 'Scripts',
                    content: data.scripts
                }
            ]
        };
    }

    handleSelect(index, last) {
        console.log('Selected tab: ' + index + ', last tab: ' + last);
    }

    render() {
        return (
            <div>
                <Tabs onSelect={this.handleSelect}>
                    <TabList>
                        {this.state.tabs.map((item, index) => {
                            return (
                                <Tab key={index}>{item.name}</Tab>
                            );
                        })}
                    </TabList>
                    {this.state.tabs.map((item, index) => {
                        let content = item.content;
                        if (typeof item.content === 'object') {
                            content = JSON.stringify(item.content);
                        }

                        return (
                            <TabPanel key={index}>
                                <pre><code>{content}</code></pre>
                            </TabPanel>
                        );
                    })}
                </Tabs>
            </div>
        );
    }
}

module.exports = props => new ComponentTabs(props);
