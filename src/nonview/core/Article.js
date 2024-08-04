// https://raw.githubusercontent.com/nuuuwan/news_long_lk/main/data/articles/6-ways-to-bring-strategy.2a60a5ae/article.json

import { JSONWWW } from "../base/WWW";

// {
//     "url": "https://hbr.org/2024/07/6-ways-to-bring-strategy-into-your-work-every-day",
//     "title": "6 Ways to Bring Strategy into Your Work Every Day",
//     "ut": 1720766118.0,
//     "body_paragraphs": [
//       "Illustration by Alanah Sarginson",
//       "Business leaders are expected to be strategic, and while organizational
//       ...
//     ]
// }

export default class Article {
  static URL_PREFIX =
    "https://raw.githubusercontent.com/nuuuwan/news_long_lk/main/";

  constructor(articleMetadata, bodyParagraphs) {
    this.articleMetadata = articleMetadata;
    this.bodyParagraphs = bodyParagraphs;
  }

  get wordCount() {
    return this.bodyParagraphs.reduce(
      (acc, paragraph) => acc + paragraph.split(" ").length,
      0
    );
  }

  get readingTime() {
    const WORDS_PER_MINUTE = 200;
    return Math.ceil(this.wordCount / WORDS_PER_MINUTE);
  }

  //

  static async fromMetadata(articleMetadata) {
    const d = await Article.getDFromMetadata(articleMetadata);
    return new Article(articleMetadata, d["body_paragraphs"]);
  }

  static async getDFromMetadata(articleMetadata) {
    const url =
      Article.URL_PREFIX + articleMetadata.dirPathUnix + "/article.json";
    console.debug(url);
    return await new JSONWWW(url).read();
  }
}
