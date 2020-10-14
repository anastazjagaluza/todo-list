import React, { Component } from 'react';

export default class Input extends Component {

  constructor(props){
    super(props);
    this.state = {
      value: this.props.value
    }
  }

  newValue(e) {
  const newValue = e.target.value;
  if(this.state.value === undefined && e.keyCode === 13) {
  e.target.value = "";
  this.props.onCreatedValue(newValue);
    }
  }

  async updateValue(e) {
  const newValue = e.target.value;
  if(this.state.value !== undefined) {
  await this.setState({value: newValue});
  this.props.onUpdatedValue(newValue);
    }
  }

  render(){
      return (
        <input
            type="text"
            onKeyDown={e => this.newValue(e)}
            onChange={e => this.updateValue(e)}
            style={{
            width: "70%",
            outline: "none",
            border: "1px solid #FDFBFB",
            backgroundColor: "#FDFBFB",
            borderRadius: ".4rem",
            fontFamily: "Roboto Mono"}}
            defaultValue={this.state.value} 
            ></input>
      )
  }
}