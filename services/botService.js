import { cardsAnimes } from "../components/messages/cardsAnimes";
import { cardsMovieDB } from "../components/messages/cardsMovieDB";
import { CardsNews } from "../components/messages/cardsNews";
import { Help } from "../components/messages/help";
import { renderChat } from "../main";
import { BotClass } from "../models/bot";
import { getSynonyms } from "../utils/synonym";
import { addMessage } from "./messageService";

export let loader = false;

export const getBotFromName = (name) => {
  return listBot.find((bot) => bot.name == name);
};

export const getAction = (bot, messsage) => {
  const action = bot.action.find((a) => messsage.includes(a));
  const subAction = bot.subAction.find((a) => messsage.includes(a));
  const query = messsage.replace(action, "").replace(subAction, "").trim();
  return [action, subAction, query];
}

export const fetchMovieDB = async (query) => {
  const bot = getBotFromName("The Movie DB");
  let [action, subAction, queryParam] = getAction(bot, query);
  const url =
    bot.api +
    action +
    "/" +
    (subAction ? subAction : "popular") +
    "?include_adult=false&language=en-US&page=1&sort_by=popularity.desc";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDNjYmQ3YTI5NDZkNzg2ZjNhMTE0NzdhNTgwOTNhYyIsInN1YiI6IjY2NTg0MGZkZGQyOGEyMjI0ZTkzZTY2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G6zvgfW7rgaXDaIkXGMgXnzdRnS51Xc1rn-aF-9wv_c",
    },
  };

  return fetch(url, options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.results;
    });
};

export const fetchNewApi = async (query) => {
  const bot = getBotFromName("news");
  let [action, subAction, queryParam] = getAction(bot, query);
  queryParam = queryParam ? "&q=" + queryParam : "";
  if (queryParam) {
    subAction = "everything";
  }
  const url =
    bot.api +
    (subAction ? subAction : "top-headlines") +
    "?pageSize=5" +
    (queryParam == "" ? "&country=fr" : "") +
    queryParam +
    "&apiKey=b44390914b854357bf275557c80c51ab";
  const options = {
    method: "GET",
  };

  return fetch(url, options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.articles;
    });
};

export const fetchAnimeList = async (query) => {
  const bot = getBotFromName("jikan.moe");
  const [action, subAction, queryParam] = getAction(bot, query);
  let url = "";

  switch (subAction) {
    case undefined:
      url = bot.api + action + "?q=" + queryParam + "&limit=8&sfw=true";
      break;
    case "random":
      url = bot.api + "random/" + action + "?sfw=true";
      break;
    default:
      url = bot.api + subAction + "/" + action + "?limit=8&sfw=true";
      break;
  }

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (subAction == "random") {
        return [data.data];
      }
      return data.data;
    });
};

export const listBot = [
  new BotClass(
    "The Movie DB",
    "https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg",
    "https://api.themoviedb.org/3/",
    ["movie", "tv"],
    [
      "popular",
      "top_rated",
      "upcoming",
      "now_playing",
    ],
    fetchMovieDB,
    cardsMovieDB,
  ),
  new BotClass(
    "jikan.moe",
    "https://avatars.githubusercontent.com/u/30051078?s=280&v=4",
    "https://api.jikan.moe/v4/",
    ["anime", "manga"],
    ["top", "random"],
    fetchAnimeList,
    cardsAnimes,
    true,
  ),
  new BotClass(
    "news",
    "https://newsapi.org/images/n-logo-border.png",
    "https://newsapi.org/v2/",
    ["news"],
    [],
    fetchNewApi,
    CardsNews,
    true,
  ),
  new BotClass(
    "help",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/OOjs_UI_icon_help.svg/1200px-OOjs_UI_icon_help.svg.png",
    "",
    ["help"],
    [],
    async () => { return null; },
    Help,
  ),
  new BotClass(
    "all",
    "https://cdn-icons-png.flaticon.com/512/5110/5110770.png",
    "",
    ["all"],
    [],
    async (data) => {
      const responses = [];

      const movieData = await fetchMovieDB("movie popular");
      responses.push({ data: movieData, source: "The Movie DB", formatter: cardsMovieDB });

      const animeData = await fetchAnimeList("anime top");
      responses.push({ data: animeData, source: "jikan.moe", formatter: cardsAnimes });

      const newsData = await fetchNewApi("news");
      responses.push({ data: newsData, source: "news", formatter: CardsNews });

      return responses;
    },
    (res) => {
      return res.map((r) => r.formatter(r.data));
    }
  ),
];

export const filterBotAction = async (message) => {
  loader = true;
  listBot.forEach(async (bot) => {
    getSynonyms.forEach((synonyms) => {
      synonyms.forEach((synonym) => {
        if (message.includes(synonym)) {
          message = message.replace(synonym, synonyms[0]);
        }
      });
    });
    console.log("message", message);
    if (bot.action.some((a) => message.includes(a))) {
      await bot.fetchAction(message).then((response) => {
        loader = false;
        renderChat();
        addMessage(bot.displayAction(response), bot.name);
        renderChat();
        return;
      });
    }
  });
};
