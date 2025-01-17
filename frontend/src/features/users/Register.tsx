import React, {useState} from 'react';
import {RegisterMutation} from '../../types';
import {Avatar, Box, Button, Grid, TextField, Typography, Link} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectRegisterError} from './usersSlice';
import {register} from './usersThunks';


const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();
  const [state, setState] = useState<RegisterMutation>({
    username: '',
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({...prevState, [name]: value}));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(register(state)).unwrap();
      navigate('/');
    } catch (error) {

    }
  };
  return (
    <Box sx={{
      mt: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
        <LockOutlinedIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">Sign Up</Typography>
      <Box component="form" onSubmit={submitFormHandler} sx={{mt: 2}}>
        <Grid direction="column" container spacing={2}>
          <Grid item>
            <TextField
              required
              label="Username"
              name="username"
              autoComplete="new-username"
              value={state.username}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              type="password"
              label="Password"
              name="password"
              autoComplete="new-password"
              value={state.password}
              onChange={inputChangeHandler}
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>Sign Up</Button>
        <Link component={RouterLink} to="/login" variant="body2" >
          Already have an account? Sign in
        </Link>
      </Box>
    </Box>
  )
};

export default Register;