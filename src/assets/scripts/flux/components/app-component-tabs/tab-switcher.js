import React from 'react';

class TabSwitcher extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data.tabs,
            active: props.data.active
        };
    }

    render() {
        return (
            <ul>
                {this.state.data.map((item, index) => {
                    return (
                        <li key={index}><a href={`#${item.name}`}>{item.name}</a></li>
                    );
                })}
            </ul>
        );
    }
}

module.exports = props => new TabSwitcher(props);