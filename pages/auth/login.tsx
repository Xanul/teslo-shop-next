import { AuthLayout } from '@/components/layout'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import NextLink from 'next/link';

const LoginPage = () => {
  return (
    <AuthLayout title={'Login'}>
      <Box sx={{width: 350, padding:'10px 20px'}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h1' component='h1'>Login</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label='Email' variant='filled' fullWidth/>
          </Grid>
          <Grid item xs={12}>
            <TextField label='Password' variant='filled' type='password' fullWidth/>
          </Grid>
          <Grid item xs={12}>
            <Button color='secondary' className='circular-btn' size='large' fullWidth>Login</Button>
          </Grid>
          <Grid item xs={12}>
            <NextLink href='/auth/register' passHref legacyBehavior>
              <Link>
                <Button color='secondary' className='circular-btn' variant='outlined' size='large' fullWidth>Create an account</Button>
              </Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  )
}

export default LoginPage  