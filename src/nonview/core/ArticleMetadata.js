import { JSONWWW } from "../../nonview/base/WWW.js";

// {
//     "title": "Prelates loosen condemned provocateur",
//     "url": "https://www.ft.lk/columns/Prelates-loosen-condemned-provocateur/4-765095",
//     "ut": 1722622587.0,
//     "dir_path_unix": "data/articles/prelates-loosen-condemne.fe3c5fed",
//     "time_str_formatted": "11:46 PM, Friday, August 02, 2024"
// },

export default class ArticleMetadata {
  static URL_METADATA =
    "https://raw.githubusercontent.com/nuuuwan/news_long_lk/main/data/articles_metadata.json";

  constructor(title, url, ut, dirPathUnix) {
    this.title = title;
    this.url = url;
    this.ut = ut;
    this.dirPathUnix = dirPathUnix;
  }

  static fromDict(d) {
    return new ArticleMetadata(d.title, d.url, d.ut, d.dir_path_unix);
  }

  static async listAll() {
    const dList = await new JSONWWW(this.URL_METADATA).read();
    return dList.map((d) => ArticleMetadata.fromDict(d));
  }
}
