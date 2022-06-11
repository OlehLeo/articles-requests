import axios from "axios";
import jsdom from "jsdom";

const getLastArticlesHeadlines = async () => {
  const link = "https://www.gamesradar.com/uk/play/";
  const {data} = await axios.get(link);
  const dom = new jsdom.JSDOM(data);
  const articlesHTMLs = dom.window.document.getElementsByClassName("article-link");

  let articles = [];
  for (let i = 0; i < 20; i++) {
    const link = articlesHTMLs[i].href;

    const title = (() => {
      const fullString = articlesHTMLs[i].text;
      const splittedByNewLine = fullString.split("\n");
      const titleInString = splittedByNewLine.find((string) => string.length > 3);
      return titleInString;
    })();

    articles.push({title, link});
  }
  return articles;
};

const getArticle = async (link) => {
  const {data} = await axios.get(link);
  const dom = new jsdom.JSDOM(data);
  const articleHTML = dom.window.document.getElementById("article-body");

  let imageBlocks = articleHTML.getElementsByClassName("vanilla-image-block");
  for (let i = 0; i < imageBlocks.length; i++) {
    imageBlocks[i].setAttribute("style", "padding: 0 !important");
  }

  let imagesHTML = articleHTML.getElementsByTagName("img");
  let images = [];
  for (let j = 0; j < imagesHTML.length; j++) {
    imagesHTML[j].setAttribute("style", "width: 0");

    const source = imagesHTML[j].dataset.srcset;
    const splitedSource = source.split(" ");
    const largestImageLink = splitedSource[6];
    images.push(largestImageLink);
  }
  const paragraph = articleHTML.innerHTML;

  console.log(paragraph);
  console.log(images);
  return {paragraph, images};
  //  bot.sendMessage(chatId, "<b>TEST</b>", {parse_mode: "HTML"});
};

export default {getLastArticlesHeadlines, getArticle};
