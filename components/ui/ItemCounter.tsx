import { AddCircleOutlineOutlined, RemoveCircleOutlineOutlined } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import { FC, useState } from "react"

interface Props {
  currentValue: number
  maxValue: number
  onUpdateQuantity: (quantity: number) => void
}

export const ItemCounter:FC<Props> = ({currentValue, maxValue, onUpdateQuantity}) => {

  const addOrRemove = (value: number) => {
    
    switch (value) {
      case -1:
        if (currentValue > 1) onUpdateQuantity(currentValue - 1)
        break;
      case +1:
        if (currentValue < maxValue) onUpdateQuantity(currentValue + 1)
        break
      default:
        break;
    }

  }
  

  return (
    <Box display='flex' alignItems='center'>
      <IconButton
        onClick={() => {
          addOrRemove(-1)
        }}
      >
        <RemoveCircleOutlineOutlined />
      </IconButton>
      <Typography sx={{width: 40, textAlign: 'center'}}>{currentValue}</Typography>
      <IconButton
        onClick={() => {
          addOrRemove(+1)
        }}
      >
        <AddCircleOutlineOutlined />
      </IconButton>
    </Box>
  )
}
