import {AppBar, Grid2, styled, Toolbar, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {MusicNote} from '@mui/icons-material';
import {selectUser} from '../../features/users/usersSlice';
import {useAppSelector} from '../../app/hooks';
import AnonymousMenu from './AnonymousMenu';
import UserMenu from './UserMenu';

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
        <Grid2 container alignItems="center">
          <Grid2>
            <MusicNote fontSize="large" sx={{color: '#FFFFFF', mr: 1}}/>
            <Typography variant="h5" sx={{color: '#FFFFFF', fontWeight: 700}}>
              <StyledLink to="/">Spotihy</StyledLink>
            </Typography>
          </Grid2>
        </Grid2>
        <Grid2 container justifyContent="flex-end" alignItems="center" sx={{gap: 2}}>
          {user ? (
            <Grid2>
              <UserMenu/>
            </Grid2>
          ) : (
            <AnonymousMenu/>
          )}
        </Grid2>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolBar;
