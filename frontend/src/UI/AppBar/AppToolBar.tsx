import {AppBar, Grid, IconButton, styled, Toolbar, Typography} from '@mui/material';
import {Link, NavLink} from 'react-router-dom';
import {AccountCircle, Login, MusicNote} from '@mui/icons-material';
import {selectUser} from '../../features/users/usersSlice';
import {useAppSelector} from '../../app/hooks';

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: '#FFFFFF',
  '&:hover': {
    color: '#BDBDBD',
  },
});

const AppToolBar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar
      position="sticky"
      sx={{
        mb: 2,
        backgroundColor: '#000000',
        boxShadow: 'none',
        borderBottom: '2px solid #1E1E1E',
      }}
    >
      <Toolbar sx={{justifyContent: 'space-between', padding: '0 16px'}}>
        <Grid container alignItems="center">
          <Grid item>
            <MusicNote fontSize="large" sx={{color: '#FFFFFF', mr: 1}}/>
            <Typography variant="h5" sx={{color: '#FFFFFF', fontWeight: 700}}>
              <StyledLink to="/">Spotihy</StyledLink>
            </Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end" alignItems="center" sx={{gap: 2}}>
          {user ? (
            <Grid item>
              <IconButton component={NavLink} to="/login" sx={{color: '#FFFFFF'}}>
                <Login/>
              </IconButton>
            </Grid>
          ) : (
            <>
              <Grid item>
                <IconButton component={NavLink} to="/login" sx={{color: '#FFFFFF'}}>
                  <Login/>
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton component={NavLink} to="/register" sx={{color: '#FFFFFF'}}>
                  <AccountCircle/>
                </IconButton>
              </Grid>
            </>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolBar;
