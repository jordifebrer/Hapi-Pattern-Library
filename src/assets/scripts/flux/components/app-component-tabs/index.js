import React from 'react';
import TabSwicther from 'tab-switcher';
import TabContent from 'tab-content';

class ComponentTabs extends React.Component {
  constructor(props) {
    super(props);

    const data = props.data;

    this.state = {
      tabs: [
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
        },
        {
          name: 'Docs',
          content: data.docs
        }
      ],
      active: false
    };
  }

  componentDidMount() {

  }

  closeTabs() {
    this.setState({active: false});
  }

  handleClick(_) {
    this.setState({active: _});
  }

  render() {
    const names = this.state.tabs.map(tab => tab.name);

    return (
      <div>
        {if(this.state.active) {
          return <button onClick={this.closeTabs}>Close</button>
        }}
        <TabSwicther items={names} active={this.state.active} onTabClick={this.handleClick} />
        <TabContent items={this.state.tabs} active={this.state.active} />
      </div>
    );
  }
}

module.export = props => new ComponentTabs(props);
