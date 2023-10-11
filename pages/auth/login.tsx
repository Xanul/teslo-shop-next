import { AuthLayout } from '@/components/layout'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { validations } from '@/utils';
import { tesloApi } from '@/api';

const LoginPage = () => {

  type formData = {
    email: string
    password: string
  }

  const { register, handleSubmit, formState: { errors }} = useForm<formData>()

  const onLoginUser = async ( {email, password}: formData ) => {

    try {
      
      const { data } = await tesloApi.post('/user/login', {email, password});
      console.log(data)

    } catch (error) {
      console.log('Error in credentials')
    }

  }

  return (
    <AuthLayout title={'Login'}>
      <form onSubmit={ handleSubmit(onLoginUser) } noValidate >
        <Box sx={{width: 350, padding:'10px 20px'}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>Login</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='Email' 
                variant='filled' 
                fullWidth
                type='email'
                { 
                  ...register('email', {
                    required: 'This field is necessary',
                    validate: validations.isEmail
                  }) 
                }
                error={ !!errors.email }
                helperText={ errors.email?.message }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='Password' 
                variant='filled' 
                type='password' 
                fullWidth
                { ...register('password', {
                  required: 'This field is necessary',
                  minLength: { value: 6, message: 'Min 6 characters' }
                })}
                error={ !!errors.password }
                helperText={ errors.password?.message }
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                color='secondary' 
                className='circular-btn' 
                size='large'
                type='submit' 
                fullWidth
              > 
              Login</Button>
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
      </form>
    </AuthLayout>
  )
}

export default LoginPage  