import React, { Component } from 'react';
import Message from './Message';

class Messages extends Component {
  render() {
    const { toggleStarred, toggleSelected } = this.props;
    console.log('Messages props>>>>', this.props);
    let messages = this.props.messages.map(message => (
      <Message
        key={message.id}
        message={message}
        toggleStarred={toggleStarred}
        toggleSelected={toggleSelected}
      />
    ));

    return <div>{messages}</div>;
  }
}

export default Messages;
