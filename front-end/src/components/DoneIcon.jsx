import React, { Component } from 'react';

export default class DoneIcon extends Component {
    componentDidMount() {
        let background;
        if (this.props.done) {
            background = "#A5F7A8";
        } 
        else {  
            background = "#fff";
        }
        this.setState({backgroundColor: background});
    }

   async change(e) {
        e.target.animate([
                { opacity: "0"},
                { transform: 'rotate(360deg) scale(2)' },
                { opacity: "1"},
            { transform: 'rotate(0) scale(1)'}],
            { duration: 400, iterations: 1 });
        this.props.onDoneChange(!this.props.done);
    }


  render() {
      return (
          <div onClick={(event) => this.change(event)} style={{
            backgroundColor: this.props.done ? "#A5F7A8" : "#fff",
            borderWidth: "4px",
            borderStyle: "solid",
            borderColor: "#A5F7A8",
            width: "1.5rem",
            height: "1.5rem",
            borderRadius: "30%",
            cursor: "pointer"}}>
            <svg pointerEvents="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="#fff" d="M18.71,7.21a1,1,0,0,0-1.42,0L9.84,14.67,6.71,11.53A1,1,0,1,0,5.29,13l3.84,3.84a1,1,0,0,0,1.42,0l8.16-8.16A1,1,0,0,0,18.71,7.21Z"/>
              </svg>
          </div>
      )
  }
}