import gamesradarLastArticlesTitlesModule from "./modules/gamesradar/index";

//  bot.sendMessage(chatId, "<b>TEST</b>", {parse_mode: "HTML"});

const gamesradarArticles = await gamesradarLastArticlesTitlesModule.getLastArticlesHeadlines(); //{page:2}
// console.log(gamesradarArticles);

const fullArticle = await gamesradarLastArticlesTitlesModule.getArticle(gamesradarArticles[0].link);

console.log(fullArticle);
