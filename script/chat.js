class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsubscribe;
    }
    async addChat(message) {
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            sent_at: firebase.firestore.Timestamp.fromDate(now)
        };
        const response = await this.chats.add(chat);
        return response;
    }
    getChats(callback) {
        this.unsubscribe = this.chats
            .where('room', '==', this.room)
            .orderBy('sent_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        callback(change.doc.data());
                    }
                });
            });
    }
    updateName(username) {
        this.username = username;
    }
    updateRoom(room) {
        this.room = room;
        console.log(`Room Changed to ${room}`);
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}