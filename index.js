import gamesradarLastArticlesTitlesModule from "./modules/gamesradar/index";

const gamesradarArticles = await gamesradarLastArticlesTitlesModule.getLastArticlesHeadlines();

const fullArticle = await gamesradarLastArticlesTitlesModule.getArticle(gamesradarArticles[1].link);

// console.log(fullArticle);
