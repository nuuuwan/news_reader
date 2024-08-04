import { Component } from "react";
//
import { Box, IconButton, Link, Stack, Typography } from "@mui/material";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
//
import { Article } from "../../nonview/core";

function SpeechCustom({ text }) {
  const onClick = function () {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.rate = 1.2;
    speechSynthesis.speak(utterance);
  };

  return (
    <Box sx={{ textAlign: "right" }}>
      <IconButton onClick={onClick}>
        <RecordVoiceOverIcon />
      </IconButton>
    </Box>
  );
}

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
        <SpeechCustom text={article.articleMetadata.title} />

        <Link href={article.articleMetadata.url} target="_blank">
          <Typography variant="caption" color={article.articleMetadata.color}>
            {article.articleMetadata.url}
          </Typography>
        </Link>
        {article.bodyParagraphs.map(function (paragraph, index) {
          return (
            <Box key={index}>
              <Typography variant="body1">{paragraph}</Typography>
              <SpeechCustom text={paragraph} />
            </Box>
          );
        })}
      </Stack>
    );
  }

  render() {
    const { articleMetadata } = this.props;
    const { article } = this.state;
    if (!article) {
      return (
        <Typography variant="body1">{`Loading "${articleMetadata.title}"...`}</Typography>
      );
    }
    return this.renderArticle(article);
  }
}
