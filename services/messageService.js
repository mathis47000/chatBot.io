import { MessageClass } from "../models/message";
import { filterBotAction } from "./botService";

export let listMessages = [];

export const addMessage = (message, author, time = new Date().toLocaleTimeString()) => {
    message = new MessageClass(message, author, time);
    listMessages.push(message);
}

export const sendUserMessage = async (message) => {
    addMessage(message, "me");
    await filterBotAction(message);
}

