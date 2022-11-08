const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMessage = document.querySelector('.update-message');
const rooms = document.querySelector('.chat-rooms');

newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err))
});

newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = newNameForm.name.value.trim();
    chatroom.updateName(username);
    newNameForm.reset();
    updateMessage.innerText = `Username changed to ${username}`
    setTimeout(() => updateMessage.innerHTML = '', 3000)
})

rooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
})

const username = localStorage.username ? localStorage.username : 'anonymous'

const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('classified', username);

chatroom.getChats(data => chatUI.render(data));