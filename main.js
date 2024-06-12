import { Chat } from './components/chat'
import { Header } from './components/header';
import { Input } from './components/input';
import { sendUserMessage } from './services/messageService';
import './style.css'


document.getElementById('header').innerHTML = Header();
document.getElementById('chat').innerHTML = Chat();
document.getElementById('input').innerHTML = Input();

// dom interaction

const sendMessage = () => {
    const message = document.getElementById('input-send').value;
    sendUserMessage(message);
    document.getElementById('input-send').value = '';
    document.getElementById('input-send').focus();
    renderChat();
}

export const renderChat = () => {
    document.getElementById('chat').innerHTML = Chat();
    document.getElementById('message-container').scrollTop = document.getElementById('message-container').scrollHeight;
}

document.getElementById('send').addEventListener('click', (event) => {
    event.preventDefault();
    sendMessage();
});

document.getElementById('input-send').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

renderChat();
document.getElementById('input-send').focus();
if (localStorage.getItem('messages') === null) {
    document.getElementById('input-send').value = 'try "help" to get started';
}