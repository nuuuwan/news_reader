import { Component } from "react";
//
import { Link, Stack, Typography } from "@mui/material";
//
import { Article } from "../../nonview/core";

export default class ArticleView extends Component {
  constructor(props) {
    super(props);
    this.state = { article: undefined };
  }

  async componentDidMount() {
    const { articleMetadata } = this.props;
    const article = await Article.fromMetadata(articleMetadata);
    this.setState({ article });
  }

  renderArticle(article) {
    return (
      <Stack direction="column" gap={1}>
        <Stack direction="row" gap={1}>
          <Typography variant="caption">
            {article.readingTime} min read
          </Typography>
          <Typography variant="caption" color="#aaa">
            {article.articleMetadata.dateStr}
          </Typography>{" "}
          <Typography variant="caption" color="#ccc">
            {article.articleMetadata.source}
          </Typography>
        </Stack>
        <Typography variant="h5">{article.articleMetadata.title}</Typography>
        <Link href={article.articleMetadata.url} target="_blank">
          <Typography variant="caption" color={article.articleMetadata.color}>
            {article.articleMetadata.url}
          </Typography>
        </Link>
        {article.bodyParagraphs.map(function (paragraph, index) {
          return (
            <Typography key={index} variant="body1">
              {paragraph}
            </Typography>
          );
        })}
      </Stack>
    );
  }

  render() {
    const { article } = this.state;
    if (!article) {
      return "Loading...";
    }
    return this.renderArticle(article);
  }
}
