import React, { Component } from 'react';
import DoneIcon from "./Icons/DoneIcon";
import ProgressIcon from "./Icons/ProgressIcon";
import Input from "./Input";

export default class ListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            done: this.props.done,
            progress: this.props.progress
        }
    }

    dispatchDelete = () => {
        this.props.onDelete()
    }

    updateValue(value) {
        this.props.onUpdatedValue(value);
    }

    createValue(value) {
        this.props.onCreatedValue(value);
    }
    
    toggle(e) {      
        e.target.animate([
            {transform: 'scale(1)'},
            { transform: 'scale(1.6)' }],
        { duration: 400,
          iterations: 1 });
    }

    handleDoneChange(value){
        if(!this.props.new) {
        this.setState({done: value});
        this.props.onUpdateDoneStatus(value)}
        else return;
    }

    handleProgressChange(value){
        if(!this.props.new) {
        this.setState({progress: value});
        this.props.onUpdateProgress(value);
        }
        else return;
    }

    render() {
        const canDelete = this.props.canDelete;
        return (
            <div style={{
                display: "flex",
                width: "22rem",
                justifyContent: "space-between",
                marginBottom: "1rem"
            }}>
                <DoneIcon onDoneChange={(value) => this.handleDoneChange(value)} done={this.state.done}/>
                <ProgressIcon onProgressChange={(value) => this.handleProgressChange(value)} progress={this.state.progress} />
                <Input onUpdatedValue={(value) => this.updateValue(value)} onCreatedValue={(value) => this.createValue(value)} value={this.props.value}/>
                <span onClick={this.dispatchDelete} onMouseOver={(e) => this.toggle(e)} style={{
                    cursor: "pointer",
                    visibility: !canDelete ? "hidden" : "visible"
                }}
          >x</span>
            </div>
        )
    }
}