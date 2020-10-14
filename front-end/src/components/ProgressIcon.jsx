import React, { Component } from 'react';

export default class ProgressIcon extends Component {
    async change(e) {
        let background;
        if (!this.props.progress) {
            background = "#FEFBA9";
        } 
        else {  
            background = "#fff";
        }
      
        e.target.animate([
            {opacity: "0"},
            { transform: 'rotate(360deg) scale(2)' },
            {opacity: "1"},
            {transform: 'rotate(0) scale(1)'}],
        { duration: 400,
          iterations: 1 });
        this.props.onProgressChange(!this.props.progress);
        await this.setState({ 
              progress: !this.props.progress,
              backgroundColor: background});
    }


  render() {
      return (
          <div onClick={(e) => this.change(e)} style={{
            backgroundColor: this.props.progress ? "#FEFBA9" : "#fff",
            borderWidth: "4px",
            borderStyle: "solid",
            borderColor: "#FEFBA9",
            width: "1.5rem",
            height: "1.5rem",
            borderRadius: "30%",
            color: "white",
            fontSize: "100%",
            fontWeight: "bolder",
            cursor: "pointer",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center"}}>...</div>
      )
  }
}