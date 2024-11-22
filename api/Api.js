class API {
    static db = require('../index').db;

    static ServerListID = 0;
    static UserListID = 1;
    static AuthListID = 2;
    static GetUser(UserID) {
        return CoreAPI.findListElementById(this.UserListID, UserID);
    }
    static GetUserServers(UserID) {
        return this.GetUser(UserID).servers;
    }
}

class CoreAPI {
    static db = require('../index').db;

    static makeListWithId(id) {
        db.get("lists").then(lists => {
            if(!lists.some(x => x.id == id)) {
                var el = {id: id, content: []};
                db.push('lists', el);
                return el;
            } else {
                return Error("list.exists");
            }
        })
    }

    static getListById(id) {
        db.get("lists").then(lists => {
            if(lists == null) {
                return Error("list.null");
            }
            if(!lists.some(x => x.id == id)) {
                return Error("list.notexists");
            } else {
                return lists.find(x => x.id == id);
            }
        });
    }

    static addToList(id, eid, content) {
        db.get('lists').then(lists => {
            if(lists.some(x => x.id == req.query.id)) {
                var list = lists.find(x => x.id == id);
                if(list.content == [] || !list.content.some(x => x.id == eid)) {
                    list.content.push({id: req.query.eid, content: content});
                    db.set("lists", lists);
                    return list;
                } else {
                    return Error("list.element.exists");
                }
            } else {
                return Error("list.exists");
            }
        })
    }

    static setElementInList(id, eid, content) {
        db.get('lists').then(lists => {
            if(lists.some(x => x.id == id)) {
                var list = lists.find(x => x.id == id);
                if(list.content == [] || !list.content.some(x => x.id == eid)) {  
                    return Error("list.element.notexists");
                } else {
                    list.content[list.content.findIndex( x => x.id == eid)].content = content;
                    db.set("lists", lists);
                    return list;
                }
            } else {
                return Error("list.notexists");
            }
        })
    }
    
    static removeFromList(id, eid) {
        db.get('lists').then(lists => {
            if(lists.some(x => x.id == id)) {
                var list = lists.find(x => x.id == id);
                if(list.content == [] || !list.content.some(x => x.id == eid)) {
                    return Error("list.element.notexists");
                } else {
                    list.content = list.content.filter(x => x != list.content.findIndex(x => x.id == eid));
                    db.set("lists", lists);
                    return list;
                }
            } else {
                return Error("list.notexists");
            }
        })
    }

    static deleteList(id) {
        db.get("lists").then(lists => {
            if(lists.some(x => x.id == id)) {
                lists.delete(lists.find( x => x.id == id));
                db.set('lists', lists);
                return true;
            } else {
                return Error("list.notexists");
            }
        })
    }

    static findListElementById(id, eid) {
        db.get('lists').then(lists => {
            if(lists.some( x => x.id == id)) {
                var list = lists.find(x => x.id == req.query.id);
                 if(list.content == [] || !list.content.some(x => x.id == eid)) {
                    return Error("list.element.notexists");
                 } else {
                     return list.content[list.content.findIndex( x => x.id == eid)];
                 }
            } else {
                return Error("list.notexists");
            }
        })
    }

    static listExists(id) {
        db.get('lists').then(lists => {
            return lists.some( x => x.id == id);
        })
    }

    static elementExists(id, eid) {
        db.get('lists').then(lists => {
            if(lists.some( x => x.id == id)) {
                var list = lists.find(x => x.id == id);
                 return (!(list.content == [] || !list.content.some(x => x.id == eid)));
            } else {
                return Error("list.notexists");
            }
        })
    }

    static getListCount(id) {
        db.get('lists').then(lists => {
            if(lists.some( x => x.id == id)) {
                var list = lists.find(x => x.id == id);
                return Object.keys(list.content).length;
            } else {
                return Error("list.notexists");
            }
        })
    }
}