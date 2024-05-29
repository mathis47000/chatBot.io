import { Message } from "./message";
import { MessageClass } from "../models/message";

const listMessages = [
    new MessageClass("Hello", "me"),
    new MessageClass("Hi", "chatGpt"),
    new MessageClass("How are you?", "me"),
    new MessageClass("I'm fine, thank you", "chatGpt"),
    new MessageClass("What about you?", "chatGpt"),
    new MessageClass("I'm good too", "me")
];

export const Chat = () => {
    return `    
    <div class="flex gap-2.5 h-[calc(100vh-142px)] p-3 overflow-y-auto flex-col">
       ${listMessages.map((message) => Message(message)).join('')}
    </div>
    `;
}
