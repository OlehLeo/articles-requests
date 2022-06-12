import axios from "axios";
import jsdom from "jsdom";

const getLastArticlesHeadlines = async (options) => {
  const mainPagelink = "https://www.pravda.com.ua/";
  let newsEndpoint = "news/";
  if (options && options.language) newsEndpoint = `${options.language}/${newsEndpoint}`;
  const newsLink = mainPagelink + newsEndpoint;
  const {data} = await axios.get(newsLink);
  const dom = new jsdom.JSDOM(data);
  const articlesHTML = dom.window.document.getElementsByClassName("article_news_list article_news_bold");

  let articlesHeadlines = [];
  for (let i = 0; i < 100; i++) {
    if (!articlesHTML[i]) break;

    const aHTML = articlesHTML[i].getElementsByTagName("a");
    const articleLink = mainPagelink + aHTML[0].href;
    const articleTitle = aHTML[0].text;

    articlesHeadlines.push({title: articleTitle, link: articleLink});
  }

  return articlesHeadlines;
};

const getArticle = async (link) => {
  const {data} = await axios.get(link);
  const dom = new jsdom.JSDOM(data);
  const articleHTML = dom.window.document.getElementsByClassName("post_text");

  const paragraph = articleHTML[0].innerHTML;

  return paragraph;
};

export default {getLastArticlesHeadlines, getArticle};
