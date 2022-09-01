import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate({sx}) {
  return (
    <Box sx={{ display: 'flex', ...sx }}>
      <CircularProgress />
    </Box>
  );
}
