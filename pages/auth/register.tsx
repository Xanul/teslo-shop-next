import { tesloApi } from "@/api";
import { AuthLayout } from "@/components/layout";
import { AuthContext } from "@/context";
import { validations } from "@/utils";
import { ErrorOutline } from "@mui/icons-material";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Chip,
} from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  type formData = {
    name: string;
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { registerUser } = useContext(AuthContext);

  const onRegisterForm = async ({ name, email, password }: formData) => {
    
    setShowError(false);
    const { hasError, message } = await registerUser(name, email, password);

    if ( hasError ) {
      setShowError(true);
      setErrorMessage( message! );
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }

    router.replace('/');

  };

  return (
    <AuthLayout title="Register" fullHeight={true}>
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Register
              </Typography>
              <Chip
                label="Invalid username or password"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ mt: 1, display: showError ? "flex" : "none" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="filled"
                fullWidth
                {...register("name", {
                  required: "This field is necessary",
                  minLength: { value: 2, message: "Min 2 characters" },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField 
                label='Phone Number' 
                variant='filled' 
                fullWidth
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="filled"
                fullWidth
                type="email"
                {...register("email", {
                  required: "This field is necessary",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="filled"
                type="password"
                fullWidth
                {...register("password", {
                  required: "This field is necessary",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField label='Confirm Password' variant='filled' type='password' fullWidth/>
            </Grid> */}
            <Grid item xs={12}>
              <Button
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                type="submit"
              >
                {" "}
                Create Account
              </Button>
            </Grid>
            <Grid item xs={12}>
              <NextLink href="/auth/login" passHref legacyBehavior>
                <Link>
                  <Button
                    color="secondary"
                    className="circular-btn"
                    variant="outlined"
                    size="large"
                    fullWidth
                  >
                    Already have account?
                  </Button>
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
