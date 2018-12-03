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
    const messagesResponse = await fetch(`${BaseURL}/api/messages`);
    const messagesJSON = await messagesResponse.json();
    this.setState({ messages: messagesJSON });
  }

  // async updateMessages = payload => {
  //   await this.request('')
  // }

  // take this.state.messages (mapping thru) and return array of ids and pass as parameter to method
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
    const messages = this.state.messages.map(message => {
      if (!message.labels.includes(label) && message.selected) {
        message.labels.push(label);
      }
      return message;
    });
    this.setState({ messages });
  };

  removeLabel = label => {
    console.log('in remove label...');
    const messages = this.state.messages.map(message => {
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

  toggleCompose = () => {
    console.log('in toggleCompose...');
    this.setState({ showCompose: !this.state.showCompose });
  };

  createNewMsg = async msgData => {
    console.log('in send message...');
    console.log('composedMsgData', msgData);
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
      // Refresh the message list with GET request
      const getMessages = async () => {
        const response = await fetch(`${BaseURL}/api/messages`);
        const messagesJSON = await response.json();
        console.log('messagejson'.messagesJSON);
        this.setState({ messages: messagesJSON });
      };
      getMessages();
    });
  };

  // const response = await fetch(`${BaseURL}/api/messages`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //   },
  //   body: JSON.stringify({
  //     subject: msgData.subject,
  //     body: msgData.body,
  //   }),
  // });
  // const messagesJSON = await response.json();
  // this.setState({ messages: messagesJSON });
  // };

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
        <ComposeMessage
          createNewMsg={this.createNewMsg}
          showCompose={this.state.showCompose}
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
