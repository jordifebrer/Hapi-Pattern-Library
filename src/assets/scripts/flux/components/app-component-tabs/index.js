import React from 'react';
import TabSwitcher from './tab-switcher';
import TabContent from './tab-content';

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
      ],
      active: false
    };
  }

  render() {
    let closeButtonClass;
    if(this.state.active){
      closeButtonClass = 'enabled';
    } else {
      closeButtonClass = 'disabled';
    }

    return (
      <div>
        <button className={closeButtonClass}>Close Tabs</button>
        <TabSwitcher data={this.state} />
        <TabContent data={this.state} />
      </div>
    );
  }
}

module.exports = props => new ComponentTabs(props);
