import { ShopLayout } from "@/components/layout"
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

const AddressPage = () => {
  return (
    <ShopLayout title="Address Page" pageDescription="Confirmation of address">
      <Typography variant="h1" component="h1">Address</Typography>
      <Grid container spacing={2} sx={{mt:2}}>
        <Grid item xs={12} sm={6}>
          <TextField label="Name" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Last Name" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Address" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Address 2" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Zip Code" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="City" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select variant="filled" label="Country" value={1}>
              <MenuItem value={1}>Costa Rica</MenuItem>
              <MenuItem value={2}>Mexico</MenuItem>
              <MenuItem value={3}>Estados Unidos</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Phone" variant="filled" fullWidth />
        </Grid>
      </Grid>

      <Box sx={{mt:5}} display="flex" justifyContent="center">
        <Button color="secondary" className="circular-btn">
          Place Order
        </Button>
      </Box>
    </ShopLayout>
  )
}

export default AddressPage