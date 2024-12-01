module.exports = () => {
const app = require('../../index').app;
const db = require('../../index').db;

if(db.get('lists').then(lists => { if(lists == null) { console.log("Oops!"); db.set('lists', [{id: 100, content: [{id:0, content:"meow"}]},{id: 200, content: [{id:0, content:"cat"}]}]) }}))
console.log("Did check, started.");

app.get('/api/core/makeListWithId', async (req, res) => {
    

    db.get("lists").then(lists => {
        if(!lists.some(x => x.id == req.query.id)) {
            var el = {id: req.query.id, content: []};
            db.push('lists', el);
            res.send(el)
        } else {
            res.send("List already exists!");
        }
    })
});

app.get('/api/core/getListById', async (req, res) => {
    

    db.get("lists").then(lists => {
        if(lists == null) {
            res.send("Uhh.. Ooopss.");
            return;
        }
        if(!lists.some(x => x.id == req.query.id)) {
            res.send("No list found!");
        } else {
            res.send(lists.find(x => x.id == req.query.id));
        }
    });
});

app.get('/api/core/addToList', async (req, res) => {
    

    db.get('lists').then(lists => {
        if(lists.some(x => x.id == req.query.id)) {
            var list = lists.find(x => x.id == req.query.id);
            if(list.content == [] || !list.content.some(x => x.id == req.query.eid)) {
                list.content.push({id: req.query.eid, content: req.query.content});
                db.set("lists", lists);
                res.send(list);
            } else {
                res.send("Element with id already exist!");
            }
        } else {
            res.send("List does not exist!");
        }
    })
});

app.get('/api/core/setElementInList', async (req, res) => {
    

    db.get('lists').then(lists => {
        if(lists.some(x => x.id == req.query.id)) {
            var list = lists.find(x => x.id == req.query.id);
            if(list.content == [] || !list.content.some(x => x.id == req.query.eid)) {
                res.send("Element with id doesn't exist!");
            } else {
                list.content[list.content.findIndex( x => x.id == req.query.eid)].content = req.query.content;
                db.set("lists", lists);
                res.send(list);
            }
        } else {
            res.send("List does not exist!");
        }
    })
});
app.get('/api/core/removeFromList', async (req, res) => {
    

    db.get('lists').then(lists => {
        if(lists.some(x => x.id == req.query.id)) {
            var list = lists.find(x => x.id == req.query.id);
            if(list.content == [] || !list.content.some(x => x.id == req.query.eid)) {
                res.send("Element with id doesn't exist!");
            } else {
                list.content[list.content.findIndex( x => x.id == req.query.eid)].content;
                db.set("lists", lists);
                res.send(list);
            }
        } else {
            res.send("List does not exist!");
        }
    })
});

app.get('/api/core/deleteList', async (req, res) => {
    

    db.get("lists").then(lists => {
        if(lists.some(x => x.id == req.query.id)) {
            lists.delete(lists.find( x => x.id == req.query.id));
            db.set('lists', lists);
            res.send(true);
        } else {
            res.send("List doesn't exist!");
        }
    })
});

app.get('/api/core/findListElementById', async (req, res) => {
    

    db.get('lists').then(lists => {
        if(lists.some( x => x.id == req.query.id)) {
            var list = lists.find(x => x.id == req.query.id);
             if(list.content == [] || !list.content.some(x => x.id == req.query.eid)) {
                 res.send("Element with id doesn't exist!");
             } else {
                 res.send(list.content[list.content.findIndex( x => x.id == req.query.eid)]);
             }
        } else {
            res.send("List doesn't exist!")
        }
    })
});

app.get('/api/core/listExists', async (req, res) => {
    db.get('lists').then(lists => {
        res.send(lists.some( x => x.id == req.query.id));
    })
});

app.get('/api/core/elementExists', async (req, res) => {
    

    db.get('lists').then(lists => {
        if(lists.some( x => x.id == req.query.id)) {
            var list = lists.find(x => x.id == req.query.id);
             res.send(!(list.content == [] || !list.content.some(x => x.id == req.query.eid)));
        } else {
            res.send("List doesn't exist!");
        }
    })
});

app.get('/api/core/getListCount', async (req, res) => {
    
    db.get('lists').then(lists => {
        if(lists.some( x => x.id == req.query.id)) {
            var list = lists.find(x => x.id == req.query.id);
             res.send({value: Object.keys(list.content).length});
        } else {
            res.send("List doesn't exist!")
        }
    })
});}