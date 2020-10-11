const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let items = [
    { id: 0, value: "To the dishes", done: false, progress: true },
    { id: 1, value: "Meditate", done: false, progress: false },
    { id: 2, value: "Read a book", done: true, progress: false },
];

let initialId = 2;

app.get("/items", (req, res) => {
    return res.send(items);
})

app.post("/items", (req, res) => {
    initialId = initialId + 1;
    let newItem = {...req.body, id: initialId}
    items.push(newItem);
    console.log(items);
    return res.send(items);
})

app.delete("/item/:i", (req, res) => {
    items = items.filter(item => item.id != Number(req.params.i));
    return res.send(items);
})

app.patch("/item/:i", (req, res) => {
    items = items.map(item => {
        if(item.id === Number(req.params.i)) {
            item.value = req.body.value;
        }
        return item;
    })
   console.log(items);
   return res.send(items);
})

app.patch("/item-done/:i", (req, res) => {
    items = items.map(item => {
        if(item.id === Number(req.params.i)) {
            item.done = req.body.value;
            if(item.done === true) {
                item.progress = false;
            }
        }
        return item;
    })
   return res.send(items);
})

app.patch("/item-progress/:i", (req, res) => {
    items = items.map(item => {
        if(item.id === Number(req.params.i)) {
            item.progress = req.body.value;
            if(item.progress === true) {
                item.done = false;
            }
        }
        return item;
    })
   return res.send(items);
})

app.listen(8080, (err) => {
    if(err) console.log("Something went wrong: " + err)
    else console.log("Server is running on port 8080")
})