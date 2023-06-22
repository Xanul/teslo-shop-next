import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

export const FullScreenLoading = () => {
  return (
    <Box 
        display='flex' 
        justifyContent='center' 
        alignItems='center'
        flexDirection="column" 
        height='calc(100vh - 200px)'
      >
        <Typography 
          variant='h2'
          sx={{mb: 3}}
          fontWeight={300}
          fontSize={40}
        >
          Loading...
        </Typography>
        <CircularProgress thickness={2}/>
      </Box>
  )
}
