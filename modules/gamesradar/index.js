import axios from "axios";
import jsdom from "jsdom";

const getGamesradarLastArticlesTitles = async () => {
  const link = "https://www.gamesradar.com/uk/play/";
  const {data} = await axios.get(link);
  const dom = new jsdom.JSDOM(data);
  const collection = dom.window.document.getElementsByClassName("article-link");

  let articles = [];
  for (let i = 0; i < 20; i++) {
    const link = collection[i].href;

    const title = (() => {
      const fullString = collection[i].text;
      const splittedByNewLine = fullString.split("\n");
      const titleInString = splittedByNewLine.find((string) => string.length > 3);
      return titleInString;
    })();

    articles.push({title, link});
  }
  return articles;
};

export default {getGamesradarLastArticlesTitles};
