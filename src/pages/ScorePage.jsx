import React, { Component } from 'react';

export default class ListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
           items: [],
           inProgress: 0,
           doneTasks: 0
        }
    }

async componentDidMount() {
     let res = await fetch("http://localhost:8080/items");
     let items = await res.json();
     let inProgress = items.filter(item => item.progress)
     let doneTasks = items.filter(item => item.done)
     this.setState({items: items, inProgress: inProgress.length, doneTasks: doneTasks.length});
}

render() {
      return (
         <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
              <h2>Check out your score</h2>
                <p>{this.state.inProgress} tasks in progress</p>
                <p>{this.state.doneTasks} tasks done</p>
                <p>{this.state.items.length} tasks in total</p>
        </div>
            )
        }
}