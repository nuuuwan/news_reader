import { Box, Stack, Typography } from "@mui/material";

export default function ArticleMetadataView({ articleMetadata, hasNewDate }) {
  return (
    <Box>
      {hasNewDate ? (
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="caption" color="#ccc">
            {articleMetadata.dateStr}
          </Typography>
        </Box>
      ) : null}
      <Box sx={{ backgroundColor: "#f8f8f8", p: 1 }}>
        <Stack direction="column" gap={0} sx={{ alignItems: "top" }}>
          <Typography variant="caption" color="#888">
            {articleMetadata.source}
          </Typography>
          <Typography variant="h6" color={articleMetadata.color}>
            {articleMetadata.title}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
