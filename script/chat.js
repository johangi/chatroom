class Chatroom {
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats')
    }
}

const chatroom = new Chatroom('2ITA', 'johan')
console.log(chatroom)