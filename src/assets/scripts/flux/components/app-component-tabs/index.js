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

  render() {
    let closeButtonClass;
    if(this.state.active){
      closeButtonClass = 'enabled';
    } else {
      closeButtonClass = 'disabled';
    }

    return (
      <div>
        <button className={closeButtonClass}>Close</button>
        <TabSwicther data={this.state} />
        <TabContent data={this.state} />
      </div>
    );
  }
}

module.export = props => new ComponentTabs(props);
