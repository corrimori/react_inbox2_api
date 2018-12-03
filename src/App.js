import React, { Component } from 'react';
import Toolbar from './components/Toolbar';
import Messages from './components/Messages';
import ComposeMessage from './components/ComposeMessage';

let BaseURL = 'http://localhost:8082';

class App extends Component {
  state = {
    messages: [],
    showCompose: false,
  };

  async componentDidMount() {
    console.log('in componentDidMount...');
    this.getMessages();
  }

  // take this.state.messages (mapping thru) and
  // return array of ids and pass as parameter to method
  toggleStarred = async message => {
    console.log('in toggle Starred...');
    let payload = {
      messageIds: [message.id],
      command: 'star',
      star: !message.starred,
    };

    const response = await fetch(`${BaseURL}/api/messages`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    message.starred = !message.starred;
    const messages = [...this.state.messages];

    // const message = await response.json();
    this.setState({ messages });
  };

  toggleSelected = message => {
    console.log('in toggle selected...');
    message.selected = !message.selected;
    this.setState(this.state.messages.concat(message));
    // concat is making a copy of array and merging so not updating state directly
  };

  markedRead = async () => {
    console.log('in markedRead...');
    let { messages } = this.state;

    let selectedMessages = this.state.messages.filter(
      message => message.selected
    );
    // create array of ids of selected messages
    let selectedMessagesId = selectedMessages.map(message => message.id);

    let payload = {
      messageIds: selectedMessagesId,
      command: 'read',
      read: true,
    };

    const response = await fetch(`${BaseURL}/api/messages`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // const message = await response.json();
    messages = await response.json();
    this.setState({ messages });
  };

  markedUnread = async () => {
    console.log('in marked Unread...');
    let { messages } = this.state;

    let selectedMessages = this.state.messages.filter(
      message => message.selected
    );
    // create array of ids of selected messages
    let selectedMessagesId = selectedMessages.map(message => message.id);

    let payload = {
      messageIds: selectedMessagesId,
      command: 'read',
      read: false,
    };

    const response = await fetch(`${BaseURL}/api/messages`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // const message = await response.json();
    messages = await response.json();
    this.setState({ messages });
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

  deleteMessage = async () => {
    console.log('in delete Message...');
    let { messages } = this.state;

    let selectedMessages = this.state.messages.filter(
      message => message.selected
    );

    // array of ids of selected messages
    let selectedMessagesId = selectedMessages.map(message => message.id);

    let payload = {
      messageIds: selectedMessagesId,
      command: 'delete',
    };

    const response = await fetch(`${BaseURL}/api/messages`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // const message = await response.json();
    messages = await response.json();
    this.setState({ messages });
    this.unreadMessages();
  };

  // counts to unread messages
  unreadMessages = () => {
    let unreadMessagesCnt = this.state.messages.filter(message => !message.read)
      .length;
    console.log('unread messages--->', unreadMessagesCnt);
    return unreadMessagesCnt;
  };

  // label in parameter is target.value
  addLabel = async label => {
    console.log('in add label...');
    let { messages } = this.state;

    let selectedMessages = this.state.messages.filter(
      message => message.selected
    );
    // array of ids of selected messages
    let selectedMessagesId = selectedMessages.map(message => message.id);

    let payload = {
      messageIds: selectedMessagesId,
      command: 'addLabel',
      label,
    };

    const response = await fetch(`${BaseURL}/api/messages`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // const message = await response.json();
    messages = await response.json();
    this.setState({ messages });
  };

  removeLabel = async label => {
    console.log('in remove label...');
    let { messages } = this.state;

    let selectedMessages = this.state.messages.filter(
      message => message.selected
    );
    // array of ids of selected messages
    let selectedMessagesId = selectedMessages.map(message => message.id);

    let payload = {
      messageIds: selectedMessagesId,
      command: 'removeLabel',
      label,
    };

    const response = await fetch(`${BaseURL}/api/messages`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // const message = await response.json();
    messages = await response.json();
    this.setState({ messages });
    //
    //
    // const messages = this.state.messages.map(message => {
    //   if (message.labels.includes(label) && message.selected) {
    //     // filters thru all labels without label to delete
    //     message.labels = message.labels.filter(el => el !== label);
    //   }
    //   return message;
    // });
    // this.setState({ messages });
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

  toggleCompose = () => {
    console.log('in toggleCompose...');
    this.setState({ showCompose: !this.state.showCompose });
  };

  createNewMsg = async msgData => {
    console.log('in send message...');
    console.log('composedMsgData***********', msgData);
    fetch(`${BaseURL}/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        subject: msgData.subject,
        body: msgData.body,
      }),
    }).then(() => {
      this.getMessages();
    });
  };

  // Refresh the message list with GET request, set State
  getMessages = async () => {
    const response = await fetch(`${BaseURL}/api/messages`);
    const messagesJSON = await response.json();
    this.setState({ messages: messagesJSON });
  };

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
          toggleCompose={this.toggleCompose}
        />
        {this.state.showCompose ? (
          <ComposeMessage
            createNewMsg={this.createNewMsg}
            toggleCompose={this.toggleCompose}
          />
        ) : (
          false
        )}
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
