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

  get dateStr() {
    const date = new Date(this.ut * 1000);
    return date.toDateString();
  }

  get source() {
    return this.url.split("/")[2].replaceAll("www.", "");
  }

  get color() {
    if (this.source.includes(".lk")) {
      return "#800";
    }
    if (this.source.includes(".com")) {
      return "#f80";
    }
    return "#080";
  }

  static fromDict(d) {
    return new ArticleMetadata(d.title, d.url, d.ut, d.dir_path_unix);
  }

  static async listAll() {
    const dList = await new JSONWWW(this.URL_METADATA).read();
    return dList.map((d) => ArticleMetadata.fromDict(d));
  }
}
