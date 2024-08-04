import { Stack } from "@mui/material";
//
import ArticleMetadataView from "./ArticleMetadataView";
//
export default function ArticleMetadataListView({
  articleMetadataList,
  setActiveArticleIndex,
}) {
  if (!articleMetadataList) {
    return "Loading Index...";
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
