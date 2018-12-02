import React, { Component } from 'react';
import Toolbar from './components/Toolbar';
import Messages from './components/Messages';

let messages = [
  {
    id: 1,
    subject:
      "You can't input the protocol without calculating the mobile RSS protocol!",
    read: false,
    starred: true,
    labels: ['dev', 'personal'],
  },
  {
    id: 2,
    subject:
      "connecting the system won't do anything, we need to input the mobile AI panel!",
    read: false,
    starred: false,
    selected: true,
    labels: [],
  },
  {
    id: 3,
    subject:
      'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
    read: false,
    starred: true,
    labels: ['dev'],
  },
  {
    id: 4,
    subject: 'We need to program the primary TCP hard drive!',
    read: true,
    starred: false,
    selected: true,
    labels: [],
  },
  {
    id: 5,
    subject:
      'If we override the interface, we can get to the HTTP feed through the virtual EXE interface!',
    read: false,
    starred: false,
    labels: ['personal'],
  },
  {
    id: 6,
    subject: 'We need to back up the wireless GB driver!',
    read: true,
    starred: true,
    labels: [],
  },
  {
    id: 7,
    subject: 'We need to index the mobile PCI bus!',
    read: true,
    starred: false,
    labels: ['dev', 'personal'],
  },
  {
    id: 8,
    subject:
      'If we connect the sensor, we can get to the HDD port through the redundant IB firewall!',
    read: true,
    starred: true,
    labels: [],
  },
];

class App extends Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    this.setState({ messages });
  }

  toggleStarred = message => {
    console.log('in toggle Starred...');
    console.log('message===>>', message);
    message.starred = !message.starred;
    const messages = [...this.state.messages];
    this.setState({ messages });
    // concat is making a copy of array and merging so not updating state directly
    // this.setState(this.state.messages.concat(message));
  };

  toggleSelected = message => {
    console.log('in toggle selected...');
    message.selected = !message.selected;
    this.setState(this.state.messages.concat(message));
  };

  markedRead = () => {
    console.log('in markedRead...');
    let selectedMessages = this.state.messages.filter(
      message => message.selected
    );
    selectedMessages = selectedMessages.map(el => {
      el.read = true;
      return el;
    });
    this.setState(this.state.messages.concat(selectedMessages));
  };

  markedUnread = () => {
    console.log('in marked Unread...');
    let selectedMessages = this.state.messages.filter(
      message => message.selected
    );
    selectedMessages = selectedMessages.map(el => {
      el.read = false;
      return el;
    });
    this.setState(this.state.messages.concat(selectedMessages));
  };

  selectAll = () => {
    console.log('in select All...');
    // make a copy of messages and select all
    const messages = this.state.messages.map(el => {
      el.selected = true;
      return el;
    });
    this.setState({ messages });
  };

  deselectAll = () => {
    console.log('in deselect All...');
    // make a copy of messages and deselect all
    const messages = this.state.messages.map(el => {
      el.selected = false;
      return el;
    });
    this.setState({ messages });
  };

  selectedIndicator = () => {
    let totalMessageCnt = this.state.messages.length;
    let selectedAmt = this.state.messages.filter(message => message.selected)
      .length;

    let indicator = '';

    if (selectedAmt === totalMessageCnt) {
      indicator = '-check';
    } else if (selectedAmt === 0) {
      indicator = '';
    } else {
      indicator = '-minus';
    }

    return indicator;
  };

  isSelected = () => {
    console.log('in isSelected...');
    let totalMessageCnt = this.state.messages.length;
    console.log('total # messages>>>', totalMessageCnt);
    let selectedAmt = this.state.messages.filter(message => message.selected)
      .length;
    console.log('selected # messages>>>', selectedAmt);
    // compare length of selected and length of messages.
    // If all selected => deselect all. If not, select all
    if (selectedAmt === totalMessageCnt) {
      this.deselectAll();
    } else {
      this.selectAll();
    }
  };

  deleteMessage = () => {
    console.log('in delete Message...');
    let messages = this.state.messages.filter(message => !message.selected);
    this.setState({ messages });
    this.unreadMessages();
  };

  unreadMessages = () => {
    let unreadMessagesCnt = this.state.messages.filter(message => !message.read)
      .length;
    console.log('unread messages--->', unreadMessagesCnt);
    return unreadMessagesCnt;
  };

  // label in parameter is target.value
  addLabel = label => {
    console.log('in add label...');
    messages.map(message => {
      if (!message.labels.includes(label) && message.selected) {
        message.labels.push(label);
      }
      return message;
    });
    this.setState({ messages });
  };

  removeLabel = label => {
    console.log('in remove label...');
    messages.map(message => {
      if (message.labels.includes(label) && message.selected) {
        // filters thru all labels without label to delete
        message.labels = message.labels.filter(el => el !== label);
      }
      return message;
    });
    this.setState({ messages });
  };

  noSelectionDisable = () => {
    let selectedAmt = this.state.messages.filter(message => message.selected)
      .length;
    let disable = '';
    if (selectedAmt === 0) {
      disable = 'disabled';
    }
    return disable;
  };
  // .length === 0 : disable = 'disabled': disable = ''

  render() {
    return (
      <div className="App">
        <Toolbar
          selectAll={this.selectAll}
          markedRead={this.markedRead}
          markedUnread={this.markedUnread}
          isSelected={this.isSelected}
          selectedIndicator={this.selectedIndicator}
          unreadMessages={this.unreadMessages}
          deleteMessage={this.deleteMessage}
          addLabel={this.addLabel}
          removeLabel={this.removeLabel}
          noSelectionDisable={this.noSelectionDisable}
        />
        <Messages
          messages={this.state.messages}
          toggleStarred={this.toggleStarred}
          toggleSelected={this.toggleSelected}
        />
      </div>
    );
  }
}

export default App;
