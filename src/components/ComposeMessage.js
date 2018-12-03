import React, { Component } from 'react';

class ComposeMessage extends Component {
  state = {
    subject: '',
    body: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // on submit button clicked, pass state/args to createNewMsg
  handleSubmit = e => {
    e.preventDefault();
    this.props.createNewMsg(this.state);
    // this.props.toggleCompose();
  };

  render() {
    return (
      <form
        className={`form-horizontal well ${
          this.props.showCompose ? '' : 'hidden'
        }`}
        onSubmit={this.handleSubmit}
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
              onChange={this.handleChange}
              type="text"
              className="form-control"
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
              onChange={this.handleChange}
              name="body"
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input type="submit" className="btn btn-primary" />
          </div>
        </div>
      </form>
    );
  }
}

export default ComposeMessage;
