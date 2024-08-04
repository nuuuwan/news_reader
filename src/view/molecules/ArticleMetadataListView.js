import { Stack, Typography } from "@mui/material";
//
import ArticleMetadataView from "./ArticleMetadataView";
//
export default function ArticleMetadataListView({
  articleMetadataList,
  setActiveArticleIndex,
}) {
  if (!articleMetadataList) {
    return <Typography variant="body1">Loading Index...</Typography>;
  }
  return (
    <Stack direction="column" gap={1}>
      {articleMetadataList.map(function (articleMetadata, index) {
        return (
          <ArticleMetadataView
            key={index}
            articleMetadata={articleMetadata}
            setActiveArticleIndex={setActiveArticleIndex}
            index={index}
          />
        );
      })}
    </Stack>
  );
}
