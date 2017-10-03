import React, {Component} from 'react';

export class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {userInput: ''};
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(e) {
    this.setState({userInput: e.target.value});
  }

  render() {


    return (
      <label>
        {this.props.question}
        <br />
        <input type='text' name = {this.props.option} onChange={this.handleUserInput} value={this.state.userInput}/>
        <br />
        <br />
      </label>
    )

  }
}
