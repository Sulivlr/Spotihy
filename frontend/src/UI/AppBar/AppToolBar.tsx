import { AppBar, Grid2, styled, Toolbar, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { MusicNote, AccountCircle } from '@mui/icons-material';

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: '#FFFFFF',
  '&:hover': {
    color: '#BDBDBD',
  },
});

const AppToolBar = () => {
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
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0 16px' }}>
        <Grid2 container alignItems="center">
          <MusicNote fontSize="large" sx={{ color: '#FFFFFF', mr: 1 }} />
          <Typography variant="h5" sx={{ color: '#FFFFFF', fontWeight: 700 }}>
            <StyledLink to="/">Spotihy</StyledLink>
          </Typography>
        </Grid2>
        <Grid2 container justifyContent="flex-end" alignItems="center" sx={{ gap: 2 }}>
          <IconButton sx={{ color: '#FFFFFF' }}>
            <AccountCircle />
          </IconButton>
        </Grid2>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolBar;
