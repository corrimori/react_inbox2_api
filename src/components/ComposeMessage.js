import React, { Component } from 'react';

class ComposeMessage extends Component {
  render() {
    return (
      <form
        className={`form-horizontal well ${
          this.props.showCompose ? '' : 'hidden'
        }`}
        onSubmit={this.submitHandler}
      >
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">
            Subject
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="subject"
              value={this.props.composedMsgData.subject}
              placeholder="Enter a subject"
              name="subject"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">
            Body
          </label>
          <div className="col-sm-8">
            <textarea
              name="body"
              id="body"
              className="form-control"
              value={this.props.composedMsgData.body}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input
              onClick={this.props.sendMessage(this.props.composedMsgData)}
              type="submit"
              value="Send"
              className="btn btn-primary"
            />
          </div>
        </div>
      </form>
    );
  }
}

export default ComposeMessage;
