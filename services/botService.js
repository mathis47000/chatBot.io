import { renderChat } from "../main";
import { BotClass } from "../models/bot";
import { addMessage } from "./messageService";

const tokenTMDB = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDNjYmQ3YTI5NDZkNzg2ZjNhMTE0NzdhNTgwOTNhYyIsInN1YiI6IjY2NTg0MGZkZGQyOGEyMjI0ZTkzZTY2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G6zvgfW7rgaXDaIkXGMgXnzdRnS51Xc1rn-aF-9wv_c";
const tokenNewApi = "b44390914b854357bf275557c80c51ab";
const tokenAnimeList = "533a755db3f0e796dd32a2bb4b37720c1f1922a2a80c912d5415608b11bb6662"

export const listBot = [
    new BotClass("The Movie DB", "https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg", ""),
    new BotClass("facebook", "https://www.facebook.com/images/fb_icon_325x325.png", "https://animeschedule.net/api/v3"),
    new BotClass("news", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAAAAABXZoBIAAAAm0lEQVR4AcXSERACQRSA4c8hjqOckhyaiXKnKMohzmdyDrIoX0jOs+Ak3Zmt66Dqeuk92X/2gydP+TP94Ro2z5wD3+jyG6s9TJtMR2yqj51g3yaNvTADuUXnDk5YhljhHOFtxyjCaxmxC7FCHWFZsQgxIw0CLAfGIZYZvrGgbt5rF3PC6dLktoMz0PaQGBPSO97q57Rfj8j9neYdKUxgGle+C2sAAAAASUVORK5CYII=", ""),
];

export const getBotFromName = (name) => {
    return listBot.find(bot => bot.name == name);
}

export const fetchMovieDB = async (query) => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDNjYmQ3YTI5NDZkNzg2ZjNhMTE0NzdhNTgwOTNhYyIsInN1YiI6IjY2NTg0MGZkZGQyOGEyMjI0ZTkzZTY2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G6zvgfW7rgaXDaIkXGMgXnzdRnS51Xc1rn-aF-9wv_c'
        }
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data.results;
        })
}

export const fetchNewApi = async (query) => {
    const url = 'https://newsapi.org/v2/top-headlines?country=fr&apiKey=b44390914b854357bf275557c80c51ab';
    const options = {
        method: 'GET'
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data.articles;
        })
}

export const fetchAnimeList = async (query) => {
    const url = 'https://api.myanimelist.net/v2/anime/season/2017/summer?limit=4'

    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${tokenAnimeList}`
        }
    }

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data.data;
        })
}


export const filterBotAction = async (message) => {
    if (message.includes("movie")) {
        await fetchMovieDB(message).then((response) => {
            addMessage(response, "The Movie DB");
            renderChat();
        });
    } else if (message.includes("news")) {
        await fetchNewApi(message).then((response) => {
            addMessage(response, "news");
            renderChat();
        });
    } else if (message.includes("anime")) {
        await fetchAnimeList(message).then((response) => {
            console.log(response);
            addMessage(response, "news");
            renderChat();
        });
    } else {
        addMessage("Sorry, I don't understand", "facebook");
        renderChat();
    }
}