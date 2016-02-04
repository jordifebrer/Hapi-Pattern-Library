import React from 'react';

class TabContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = props.data;
    }

    render() {
    }
}

module.exports = props => new TabContent(props);