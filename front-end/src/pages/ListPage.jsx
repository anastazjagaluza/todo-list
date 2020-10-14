import React, { Component } from 'react';
import ListItem from '../components/ListItem';

export default class ListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
           items: [],
           status: undefined
        }
    }

async componentDidMount() {
     const res = await fetch("http://localhost:8080/items");
     const items = await res.json();
     this.setState({items: items});
 }

async removeItem(id) {
    const res = await fetch("http://localhost:8080/items/" + id, {
        method: "DELETE",
        headers: {
            'Content-Type': 'text/plain',
        },
        body: id
    });
    const newItems = await res.json();
    this.setState({items: newItems})
}

async updateValue(value, item) {
    const res = await fetch("http://localhost:8080/items/" + item.id, {
       method: "PATCH",
       headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({value: value})
   })
   const newItems = await res.json();
   this.setState({items: newItems});
}

async updateDone(value, item) {
    const res = await fetch("http://localhost:8080/item-done/" + item.id, {
       method: "PATCH",
       headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({value: value})
   })
   const newItems = await res.json();
   const status = value ? "done" : "not done";
   this.setState({items: newItems, status: `Updated "${item.value}" to "${status}"`});
   setTimeout(() => {
       this.setState({status: undefined});
    }, 2000);
}

async updateProgress(value, item) {
    const res = await fetch("http://localhost:8080/item-progress/" + item.id, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({value: value})
    })
    const newItems = await res.json();
    const status = value ? "in progress" : "not in progress";
    this.setState({items: newItems, status: `Updated "${item.value}" to "${status}"`});
    setTimeout(() => {
    this.setState({status: undefined});
    }, 2000);

}


async newItem(value) {
    const newItem = { value: value, done: false, progress: false }
    const res = await fetch("http://localhost:8080/items", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem)
    });
    const newItems = await res.json();
    this.setState({items: newItems})
}

render(){
      const { status } = this.state;
      return (
         <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
        <h2>Welcome to your to-do list</h2>
        {this.state.items.map(item => (
          <ListItem
            onUpdatedValue={(value) => this.updateValue(value, item)} 
            value={item.value} 
            key={item.id} 
            id={item.id} 
            canDelete 
            done={item.done} 
            progress={item.progress} 
            onDelete={() => this.removeItem(item.id)} 
            onUpdateDoneStatus={(value) => this.updateDone(value, item)}
            onUpdateProgress={(value) => this.updateProgress(value, item)}
            />
        ) )}
        <ListItem new onCreatedValue={(value) => this.newItem(value)} />
        
        {status != null ? <p>{status}</p> : undefined}

        </div>
      )
  }
}