import gamesradarLastArticlesTitlesModule from "./modules/gamesradar/index";

const gamesradarArticles = await gamesradarLastArticlesTitlesModule.getGamesradarLastArticlesTitles();

console.log(gamesradarArticles);
