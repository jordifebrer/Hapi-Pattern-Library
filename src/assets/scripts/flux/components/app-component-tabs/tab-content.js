import React from 'react';

class TabContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data.tabs,
            active: props.data.active
        };
    }

    render() {
        return (
            <div>
                {this.state.data.map((item, index) => {
                    let content = item.content;
                    if(typeof item.content === 'object') {
                        content = JSON.stringify(item.content);
                    }
                    return (
                        <div key={index}>
                            <pre><code>{content}</code></pre>
                        </div>
                    );
                })}
            </div>
        );
    }
}

module.exports = props => new TabContent(props);