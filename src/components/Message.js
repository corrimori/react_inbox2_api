import React from 'react';

const Message = ({ message, toggleStarred, toggleSelected }) => {
  // array of labels stored in labelList
  let labelList = message.labels.map((label, index) => (
    <span key={index} className="label label-warning">
      {label}
    </span>
  ));

  return (
    <div
      className={`row message ${message.read ? 'read' : 'unread'}
      ${message.selected ? 'selected' : ''}`}
    >
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input
              type="checkbox"
              checked={message.selected}
              onChange={() => toggleSelected(message)}
            />
          </div>
          <div className="col-xs-2">
            <i
              onClick={() => toggleStarred(message)}
              className={`star fa fa-star${message.starred ? '' : '-o'}`}
            />
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {labelList}
        {message.subject}
      </div>
    </div>
  );
};

export default Message;
