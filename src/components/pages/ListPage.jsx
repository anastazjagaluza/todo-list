import React, { Component } from 'react';
import ListItem from '../atoms/ListItem';

export default class ListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
           items: [],
           status: undefined,
           noteOpacity: 0
        }
    }

 async componentDidMount(){
     let res = await fetch("http://localhost:8080/items");
     let items = await res.json();
     this.setState({items: items});
 }

async removeItem(i){
    let res = await fetch("http://localhost:8080/item/" + i, {
        method: "DELETE",
        headers: {
            'Content-Type': 'text/plain',
        },
        body: i
    });
    let newItems = await res.json();
    await this.setState({items: newItems})
}

async updateValue(v, i) {
    let res = await fetch("http://localhost:8080/item/" + i.id, {
       method: "PATCH",
       headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({value: v})
   })
   let newItems = await res.json();
}

async updateDone(v, i) {
    let res = await fetch("http://localhost:8080/item-done/" + i.id, {
       method: "PATCH",
       headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({value: v})
   })
   let newItems = await res.json();
   let status = v ? "done" : "not done";
   this.setState({items: newItems, status: `Updated "${i.value}" to "${status}"`});
   setTimeout(() => {
    this.setState({status: undefined});
    }, 2000);
}

async updateProgress(v, i) {
    let res = await fetch("http://localhost:8080/item-progress/" + i.id, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({value: v})
    })
    let newItems = await res.json();
    this.setState({ items: newItems });
    let status = v ? "in progress" : "not in progress";
    this.setState({items: newItems, status: `Updated "${i.value}" to "${status}"`});
   setTimeout(() => {
    this.setState({status: undefined});
    }, 2000);

}


async newItem(v) {
    let newItem = { value: v, done: false, progress: false }
    let res = await fetch("http://localhost:8080/items", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem)
    });
    let newItems = await res.json();
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
            onUpdatedValue={(v) => this.updateValue(v, item)} 
            value={item.value} key={item.id} 
            canDelete 
            done={item.done} 
            progress={item.progress} 
            onDelete={() => this.removeItem(item.id)} 
            onUpdateDoneStatus={(v) => this.updateDone(v, item)}
            onUpdateProgress={(v) => this.updateProgress(v, item)}
            />
        ) )}
        <ListItem new onCreatedValue={(v) => this.newItem(v)} />
        
        {status != null ? <p>{status}</p> : undefined}

        </div>
      )
  }
}