import { AddCircleOutlineOutlined, RemoveCircleOutlineOutlined } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import { FC, useState } from "react"

interface Props {
  currentValue: number
  maxValue: number
  onUpdateQuantity: (quantity: number) => void
}

export const ItemCounter:FC<Props> = ({currentValue, maxValue, onUpdateQuantity}) => {
  
  const [quantity, setQuantity] = useState(currentValue);

  const onAddQuantity = () => {
    (quantity < maxValue)
      ? setQuantity(quantity + 1)
      : console.log('Maximo valor alcanzado')
  }

  const onMinusQuantity = () => {
    (quantity > 1)
      ? setQuantity(quantity - 1)
      : console.log('No se puede reducir de 1')
  }



  return (
    <Box display='flex' alignItems='center'>
      <IconButton
        onClick={() => {
          onMinusQuantity()
          onUpdateQuantity(quantity)
        }}
      >
        <RemoveCircleOutlineOutlined />
      </IconButton>
      <Typography sx={{width: 40, textAlign: 'center'}}>{quantity}</Typography>
      <IconButton
        onClick={() => {
          onAddQuantity()
          onUpdateQuantity(quantity)
        }}
      >
        <AddCircleOutlineOutlined />
      </IconButton>
    </Box>
  )
}
