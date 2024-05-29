import { BotClass } from "../models/bot";

export const listBot = [
    new BotClass("google", "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", "https://www.google.com/"),
    new BotClass("facebook", "https://www.facebook.com/images/fb_icon_325x325.png", "https://www.facebook.com/"),
    new BotClass("chatGpt", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png", "https://www.chatGpt.com/"),
];

export const getBotFromName = (name) => {
    return listBot.find(bot => bot.name == name);
}