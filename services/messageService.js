import { MessageClass } from "../models/message";
import { filterBotAction } from "./botService";

export let listMessages = JSON.parse(localStorage.getItem("messages")) || [];

export const saveMessages = () => {
    localStorage.setItem("messages", JSON.stringify(listMessages));
}

export const addMessage = (message, author, time = new Date().toLocaleTimeString()) => {
    message = new MessageClass(message, author, time);
    listMessages.push(message);
    saveMessages();
}

export const sendUserMessage = async (message) => {
    addMessage(message, "me");
    await filterBotAction(message);
}