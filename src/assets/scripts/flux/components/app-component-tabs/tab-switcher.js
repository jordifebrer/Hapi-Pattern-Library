import React from 'react';

class TabSwitcher extends React.Component {
    constructor(props) {
        super(props);

        this.state = props.data;
    }

    render() {
    }
}

module.export = props => new TabSwitcher(props);