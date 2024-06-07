import { cardsAnimes } from "../components/messages/cardsAnimes";
import { cardsMovieDB } from "../components/messages/cardsMovieDB";
import { CardsNews } from "../components/messages/cardsNews";
import { Help } from "../components/messages/help";
import { renderChat } from "../main";
import { BotClass } from "../models/bot";
import { addMessage } from "./messageService";

export const listBot = [
    new BotClass("The Movie DB",
        "https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg",
        "https://api.themoviedb.org/3/",
        ["movie", "tv"],
        ["popular", "top_rated", "upcoming", "now_playing", "on_the_air", "airing_today"]),
    new BotClass("jikan.moe",
        "https://avatars.githubusercontent.com/u/30051078?s=280&v=4",
        "https://api.jikan.moe/v4/",
        ["anime", "manga"],
        ["airing", "bypopularity", "upcoming", "favorite", "random"]),
    new BotClass("news",
        "https://newsapi.org/images/n-logo-border.png",
        "https://newsapi.org/v2/",
        ["news"],
        ["top-headlines", "everything"]),
    new BotClass("error bot",
        "https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_640.png",
        "",
        [],
        []),
    new BotClass("help",
        "https://img.icons8.com/ios/50/000000/help.png",
        "",
        [],
        [])
];

export const getBotFromName = (name) => {
    return listBot.find(bot => bot.name == name);
}

export const fetchMovieDB = async (query) => {
    const bot = getBotFromName("The Movie DB");
    const action = query.split(" ")[0];
    const subAction = query.split(" ")[1];
    if (!bot.action.includes(action) || !bot.subAction.includes(subAction)) {
        // return the list of action and subAction user friendly
        return [];
    }
    // movie query top_rated, popular, upcoming, now_playing
    // tv query top_rated, popular, on_the_air, airing_today
    const url = bot.api + action + '/' + subAction + '?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDNjYmQ3YTI5NDZkNzg2ZjNhMTE0NzdhNTgwOTNhYyIsInN1YiI6IjY2NTg0MGZkZGQyOGEyMjI0ZTkzZTY2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G6zvgfW7rgaXDaIkXGMgXnzdRnS51Xc1rn-aF-9wv_c'
        }
    };

    return fetch(url, options)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(data => {
            return data.results;
        })
}

export const fetchNewApi = async (query) => {

    const bot = getBotFromName("news");
    const action = query.split(" ")[0];
    const subAction = query.split(" ")[1];
    const queryParam = query.split(" ")[2] ? "&q=" + query.split(" ")[2] : "";
    if (!bot.action.includes(action) || !bot.subAction.includes(subAction)) {
        // return the list of action and subAction user friendly
        return [];
    }
    const url = bot.api + subAction
        + '?pageSize=5' + (subAction == 'top-headlines' ? '&country=fr' : '')
        + queryParam + '&apiKey=b44390914b854357bf275557c80c51ab';
    const options = {
        method: 'GET'
    };

    return fetch(url, options)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(data => {
            return data.articles;
        })
}

export const fetchAnimeList = async (query) => {
    const bot = getBotFromName("jikan.moe");
    const action = query.split(" ")[0];
    const subAction = query.split(" ")[1];
    if (!bot.action.includes(action)) {
        return [];
    }
    let url = "";

    switch (subAction) {
        case "top":
            url = bot.api + 'top/' + action + '?limit=8&sfw=true';
            break;
        case "random":
            url = bot.api + 'random/' + action + '?sfw=true';
            break;
        default:
            url = bot.api + action + '?q=' + subAction + '&limit=8&sfw=true';
            break;
    }

    return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (subAction == "random") {
                return [data.data];
            }
            return data.data;
        })
}


export const filterBotAction = async (message) => {
    if (listBot[0].action.some(a => message.includes(a))) {
        await fetchMovieDB(message).then((response) => {
            addMessage(cardsMovieDB(response), "The Movie DB");
            renderChat();
        });
    } else if (message.includes("news")) {
        await fetchNewApi(message).then((response) => {
            addMessage(CardsNews(response), "news");
            renderChat();
        });
    } else if (listBot[1].action.some(a => message.includes(a))) {
        await fetchAnimeList(message).then((response) => {
            addMessage(cardsAnimes(response), "jikan.moe");
            renderChat();
        });
    } else {
        addMessage(Help(), "help");
        renderChat();
    }
    return `<div>oui</div>`;
}