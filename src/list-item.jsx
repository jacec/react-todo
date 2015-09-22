var React = require('react');
var rootURL = require('./firebaseURL').rootURL;

module.exports = React.createClass({
  getInitialState: function(){
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
    }
  },
  componentWillMount: function() {
    this.fb = new Firebase(rootURL + 'items/' + this.props.item.key);
  },
  render: function() {
    return <div className="input-group">
      <span className="input-group-addon">
        <input
          type="checkbox"
          onChange={this.handleDoneChange}
          checked={this.state.done}
          />
      </span>
      <input type="text"
        disabled={this.state.done}
        className="form-control"
        value={this.state.text}
        onChange={this.handleTextChange}
        />
      <span className="input-group-btn">
        {this.changesButtons()}
        <button
          className="btn btn-default"
          onClick={this.handleDeleteClick}
          >
          Delete
        </button>
      </span>
    </div>
  },
  handleDoneChange: function(event){
    var update = {done: event.target.checked}
    this.setState(update);
    this.fb.update(update);
  },
  handleDeleteClick: function(){
    this.fb.remove();
  },
  handleTextChange: function(event){
    this.setState({
      text: event.target.value,
      textChanged: true
    })
  },
  changesButtons: function(){
    if(!this.state.textChanged) {
      return null
    } else {
      return [
        <button
          onClick={this.handleSaveClick}
          className="btn btn-default"
          >
          Save
        </button>,
        <button
          onClick={this.handleUndoClick}
          className="btn btn-default"
          >
          Undo
        </button>
      ]
    }
  },
  handleUndoClick: function(){
    this.setState({
      text: this.props.item.text,
      textChanged: false
    });
  },
  handleSaveClick: function(){
    this.fb.update({text: this.state.text});
    this.setState({textChanged: false});
  }
});
