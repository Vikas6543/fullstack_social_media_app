import * as React from 'react';
import {
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  Grid,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGIN_SUCCESS } from '../../redux/types';
import { toast } from 'react-toastify';
import Axios from 'axios';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isPasswordShown, setIsPasswordShown] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!email || !password) {
        return toast.error('Please enter all the fields');
      }
      setIsLoading(true);

      const data = { email, password };

      const response = await Axios.post(
        'https://mern-stack-app-api-pc1h.onrender.com/user/login',
        data
      );

      const responseData = await response.data;

      if (responseData.user) {
        setIsLoading(false);
        dispatch({ type: LOGIN_SUCCESS, payload: responseData });
        navigate('/');
      } else {
        setIsLoading(false);
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      {/* random image */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            'url(https://source.unsplash.com/random/?nature,water,mountains)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* login form */}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 17,
          }}
        >
          <Typography
            component='h1'
            variant='h5'
            className='flex items-center gap-3 pb-2'
          >
            {/* font awesome icon login */}
            <div>
              <i className='fas fa-user-circle text-3xl'></i>
            </div>
            <div className='font-bold text-gray-800 text-3xl'>Login</div>
          </Typography>

          <Box
            component='form'
            onSubmit={handleFormSubmit}
            sx={{ mt: 1, position: 'relative' }}
          >
            <TextField
              margin='normal'
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              margin='normal'
              fullWidth
              name='password'
              label='Password'
              type={isPasswordShown ? 'text' : 'password'}
              id='password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 115,
                right: 16,
                cursor: 'pointer',
              }}
              onClick={() => setIsPasswordShown(!isPasswordShown)}
            >
              {isPasswordShown ? (
                <i className='fas fa-eye'></i>
              ) : (
                <i className='fas fa-eye-slash'></i>
              )}
            </div>
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
              className='py-2'
            />
            <div className='my-3'>
              <button className='custom-button'>
                {isLoading ? (
                  <div className='flex items-center justify-center '>
                    <div className='w-6 h-6 border-b-2 border-gray-100 rounded-full animate-spin'></div>
                  </div>
                ) : (
                  <span>Login</span>
                )}
              </button>
            </div>
            <Grid
              container
              className='pt-4 cursor-pointer flex justify-between'
            >
              <Grid item>
                <Link to='/register' variant='body2'>
                  {"Don't have an account? Register"}
                </Link>
              </Grid>

              <Grid item className='pt-3 md:pt-0'>
                <Link to='/forgotPassword' variant='body2'>
                  {'Forgot Password?'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
