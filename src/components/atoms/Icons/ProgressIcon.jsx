import React, { Component } from 'react';

export default class ProgressIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: this.props.progress,
            backgroundColor: "#fff",
        }
    }

    componentWillMount() {
        let background;
        if(this.state.progress) {
            background = "#FEFBA9";
        } 
        else {  
            background = "#fff";
        }
        this.setState({backgroundColor: background})
    }

    async change(e) {
        let background;
        if(!this.state.progress) {
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
        await this.setState({ 
              progress: !this.state.progress,
              backgroundColor: background});
          this.props.onProgressChange(this.state.progress)
    }


  render(){
      return (
          <div onClick={(e) => this.change(e)} style={{
            backgroundColor: this.state.backgroundColor,
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
            justifyContent: "center"
        }
          }>...
          </div>
      )
  }
}