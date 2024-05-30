import { cardsMovieDB } from "./cardsMovieDB"

export const BotMessage = (author, message) => {
    if (author.includes("The Movie DB")) {
        return cardsMovieDB(message);
    } else if (author.includes("news")) {
        return message.map(article => article.title).join('');
    } else if (author.includes("anime")) {
        return message.map(article => article.title).join('');
    } else {
        return `
            <p class="text-sm font-normal text-white">${message}</p>
        `;
    }
}