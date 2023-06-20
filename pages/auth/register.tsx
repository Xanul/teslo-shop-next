import { AuthLayout } from "@/components/layout"
import { Box, Grid, Typography, TextField, Button, Link } from "@mui/material"
import NextLink from 'next/link';

const RegisterPage = () => {
  return (
    <AuthLayout title="Register" fullHeight={true}>
      <Box sx={{width: 350, padding:'10px 20px'}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h1' component='h1'>Register</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label='Name' variant='filled' fullWidth/>
          </Grid>
          <Grid item xs={12}>
            <TextField label='Phone Number' variant='filled' fullWidth/>
          </Grid>
          <Grid item xs={12}>
            <TextField label='Email' variant='filled' fullWidth/>
          </Grid>
          <Grid item xs={12}>
            <TextField label='Password' variant='filled' type='password' fullWidth/>
          </Grid>
          <Grid item xs={12}>
            <TextField label='Confirm Password' variant='filled' type='password' fullWidth/>
          </Grid>
          <Grid item xs={12}>
            <Button color='secondary' className='circular-btn' size='large' fullWidth>Create Account</Button>
          </Grid>
          <Grid item xs={12}>
            <NextLink href='/auth/login' passHref legacyBehavior>
              <Link>
                <Button color='secondary' className='circular-btn' variant='outlined' size='large' fullWidth>Already have account?</Button>
              </Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  )
}

export default RegisterPage