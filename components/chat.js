import { listMessages } from "../services/messageService";
import { Message } from "./messages/message";

export const Chat = () => {
    return `    
    <div id="message-container" class="flex gap-2.5 h-[calc(100vh-142px)] p-3 overflow-y-auto flex-col">
       ${listMessages.map((message) => Message(message)).join('')}
    </div>
    `;
}
