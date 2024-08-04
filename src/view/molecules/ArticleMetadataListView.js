import { Stack } from "@mui/material";
//
import ArticleMetadataView from "./ArticleMetadataView";
//
export default function ArticleMetadataListView({ articleMetadataList }) {
  let prevDateStr = undefined;
  return (
    <Stack direction="column" gap={1}>
      {articleMetadataList.map(function (articleMetadata, i) {
        const dateStr = articleMetadata.dateStr;
        const hasNewDate = dateStr !== prevDateStr;
        prevDateStr = dateStr;

        return (
          <ArticleMetadataView
            key={i}
            articleMetadata={articleMetadata}
            hasNewDate={hasNewDate}
          />
        );
      })}
    </Stack>
  );
}
