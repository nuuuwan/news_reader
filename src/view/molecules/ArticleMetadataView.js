import { Box, Stack, Typography } from '@mui/material';

export default function ArticleMetadataView({
  articleMetadata,

  setActiveArticleIndex,
  index,
}) {
  const onClick = function () {
    setActiveArticleIndex(index);
  };
  return (
    <Box onClick={onClick} sx={{ cursor: 'pointer' }}>
      <Box sx={{ p: 1 }}>
        <Stack direction="column" gap={0} sx={{ alignItems: 'top' }}>
          <Stack direction="row" gap={1}>
            <Typography variant="caption" color="#888">
              {articleMetadata.source}
            </Typography>
            <Typography variant="caption" color="#ccc">
              {articleMetadata.dateStr}
            </Typography>
          </Stack>
          <Typography variant="h6" color={articleMetadata.color}>
            {articleMetadata.title}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
