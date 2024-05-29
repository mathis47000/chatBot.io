import { Chat } from './components/chat'
import { Header } from './components/header';
import { Input } from './components/input';
import './style.css'
// set up tailwindcss
import 'tailwindcss/tailwind.css'


document.getElementById('header').innerHTML = Header();
document.getElementById('chat').innerHTML = Chat();
document.getElementById('input').innerHTML = Input();